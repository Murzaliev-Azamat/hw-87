import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import {AlbumMutation, CommentMutation} from "../types";
import auth, {RequestWithUser} from "../middleware/auth";
import Comment from "../models/Comment";

const commentsRouter = express.Router();

commentsRouter.get('/:id', async (req, res, next) => {
  // let oneNews_id = req.query.artist
  try {
    // if (req.params.id) {
    //   const comments = await Comment.find({oneNews: req.params.id});
    //   return res.send(comments);
    // }

    const comments = await Comment.find({oneNews: req.params.id}).populate('author', 'username');
    return res.send(comments);
  } catch (e) {
    return next(e);
  }
});

commentsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const commentData: CommentMutation = {
    author: user._id,
    oneNews: req.body.oneNews,
    message: req.body.message,
  };

  const comment = new Comment(commentData);

  try {
    await comment.save();
    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default commentsRouter;