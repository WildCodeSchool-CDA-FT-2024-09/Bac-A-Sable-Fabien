import { Request, Response } from "express";
import { Router } from "express";
import { Comment } from "./comment.entity";
import { CommentType } from "./comments.types";
// import { validate } from "class-validator";

const commentsControllers = Router();

commentsControllers.get("/", async (req: Request, res: Response) => {
  const repoId: string = req.params.repoId;

  try {
    const comments: CommentType[] = await Comment.find({
      where: {
        repoId,
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.sendStatus(500);
  }
});

commentsControllers.post("/", async (req: Request, res: Response) => {
  try {
    const comment = new Comment();
    comment.repoId = req.body.repoId;
    comment.name = req.body.name;
    comment.comment = req.body.comment;

    // const error = await validate(comment);
    // if (error.length > 0) {
    // res.status(422).json(error);
    // } else {
    await comment.save();
    res.status(201).json(req.body); // created
    // }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default commentsControllers;
