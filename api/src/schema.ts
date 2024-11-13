import { buildSchema } from "type-graphql";
import RepoResolver from "./repo/repo.resolver";
import StatusResolver from "./status/status.resolver";
import LangResolver from "./lang/lang.resolver";
import CommentResolver from "./comment/comment.resolver";
import UserResolver from "./user/user.resolver";

const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      StatusResolver,
      RepoResolver,
      LangResolver,
      CommentResolver,
      UserResolver,
    ],
    authChecker: ({ context }, roles): boolean => {
      console.log(context.cookie);
      console.log("roles", roles);

      // admin user (with the @Authorized() decorator in the resolver)
      if (roles.length > 0)
        return roles.some((role) => context.cookie.role === role);

      // other connected users
      if (context.cookie) return true;

      return false;
    },
  });
};

export default getSchema;
