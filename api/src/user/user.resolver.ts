import { Arg, Ctx, Query, Resolver } from "type-graphql";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import argon2 from "argon2";

dotenv.config();
const { AUTH_SECRET_KEY } = process.env;

// Only for learning/dev, this would be in DB
const hashMe = async (password: string) => await argon2.hash(password);

const me = {
  email: "f@feub.net",
  passwordHash: hashMe("argon2hash"),
};

@Resolver()
export default class UserResolver {
  @Query(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } },
  ) {
    console.log(email, password);

    if (me.email === email) {
      try {
        if (await argon2.verify(await me.passwordHash, password)) {
          const token = jwt.sign(
            {
              email: me.email,
              name: "fabien",
              role: "admin",
            },
            AUTH_SECRET_KEY as string,
          );
          console.log("true");
          context.res.setHeader(
            "Set-Cookie",
            `repo_token=${token};httpOnly;secure;SameSite=Strict;expires=${new Date(
              new Date().getTime() + 1000 * 60 * 60 * 48,
            ).toUTCString()}`,
          );

          return true;
        }
      } catch (error) {
        console.error(error);
      }
    }
    console.log("false");

    return false;
  }
}
