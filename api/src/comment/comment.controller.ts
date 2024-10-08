import { Request, Response } from "express";
import { Router } from "express";
import { Comment } from "./comment.entity";
import { CommentType } from "./comment.type";

const commentController = Router();

commentController.get("/", async (req: Request, res: Response) => {
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

commentController.post("/", async (req: Request, res: Response) => {
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

commentController.get("/:repoId", async (req: Request, res: Response) => {
  const repoId = req.params.repoId;

  try {
    const comments: Comment[] = await Comment.find({
      where: {
        repoId
      }
    });
    if (comments === null) {
      res.sendStatus(204); // no content
    } else {
      res.status(200).json(comments);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default commentController;
