import { Arg, Query, Resolver, InputType, Field, Mutation } from "type-graphql";
import { Comment } from "./comment.entity";

@InputType()
class CommentInput {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    comment: string;

    @Field()
    repoId: string;
}

@Resolver(Comment)
export default class CommentResolver {
    @Query(() => [Comment])
    async getComments() {
        return await Comment.find();
    }

    @Query(() => Comment)
    async getComment(@Arg("id") id: number) {
        return await Comment.findOneOrFail({
            where: {
                id: parseInt(id.toString())
            }
        });
    }

    @Query(() => [Comment])
    async getCommentOfRepo(@Arg("repoId") repoId: string) {
        return await Comment.find({
            where: {
                repoId: repoId
            }
        });
    }

    @Mutation(() => Comment)
    async createNewComment(@Arg("data") newComment: CommentInput) {
        // TODO: data validation
        const comment = new Comment();
        comment.id = newComment.id;
        comment.name = newComment.name;
        comment.comment = newComment.comment;
        comment.repoId = newComment.repoId;
        await comment.save();
        return comment;
    }
}