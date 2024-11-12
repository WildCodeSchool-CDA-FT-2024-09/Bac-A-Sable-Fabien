import { Arg, Query, Resolver, InputType, Field, Mutation } from "type-graphql";
import { Comment } from "./comment.entity";
import { validate } from "class-validator";

@InputType()
class CreateCommentInput {
    // @Field()
    // id: number;

    @Field()
    name: string;

    @Field()
    comment: string;

    @Field()
    repoId: string;
}

@InputType()
class UpdateCommentInput {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    comment: string;

    @Field({ nullable: true })
    repoId: string;
}

@Resolver(Comment)
export default class CommentResolver {
    @Query(() => [Comment])
    async getAllComments() {
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
    async getCommentsOfRepo(@Arg("repoId") repoId: string) {
        return await Comment.find({
            where: {
                repoId: repoId
            }
        });
    }

    @Mutation(() => Comment)
    async createNewComment(@Arg("data") newComment: CreateCommentInput) {
        const comment = new Comment();
        comment.name = newComment.name;
        comment.comment = newComment.comment;
        comment.repoId = newComment.repoId;

        const error = await validate(comment);
        if (error.length > 0) throw new Error(`Validation Error: ${error}`);

        await comment.save();
        return comment;
    }

    @Mutation(() => Comment)
    async updateComment(@Arg("id") id: number, @Arg("data") data: UpdateCommentInput) {
        const comment = await Comment.findOneOrFail({ where: { id } });
        if (!comment) throw new Error("Comment not found!");
        const error = await validate(comment);
        if (error.length > 0) throw new Error(`Validation Error: ${error}`);
        Object.assign(comment, data);
        await comment.save();
        return comment;
    }

    @Mutation(() => Boolean)
    async deleteComment(@Arg("id") id: number) {
        const comment = await Comment.findOneBy({ id });
        if (!comment) throw Error("Comment not found!");
        await comment.remove();
        return true;
    }
}