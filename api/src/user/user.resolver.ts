import { Arg, Ctx, Query, Resolver } from "type-graphql";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import argon2 from "argon2";
import { User } from "./user.entity";

dotenv.config();
const { AUTH_SECRET_KEY } = process.env;

@Resolver()
export default class UserResolver {
  @Query(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } },
  ) {
    const userDb = await User.findOneOrFail({
      where: {
        email: email,
      },
    });

    if (userDb) {
      if (userDb.email === email) {
        try {
          if (await argon2.verify(userDb.password, password)) {
            const token = jwt.sign(
              {
                email: userDb.email,
                name: userDb.fullname,
                role: userDb.role,
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
    }

    return false;
  }
}
