import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import {AlbumMutation} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  let comment_id = req.query.artist
  try {
    if (comment_id) {
      const comments = await Album.find({comment: comment_id}).populate('comment').sort({year: -1});
      return res.send(comments);
    }

    const comments = await Album.find();
    return res.send(comments);
  } catch (e) {
    return next(e);
  }
});

commentsRouter.get('/:id', async (req, res, next) => {
  try {
    const albums = await Album.findById(req.params.id).populate('artist');
    return res.send(albums);
  } catch (e) {
    return next(e);
  }
});

commentsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  const albumData: AlbumMutation = {
    artist: req.body.artist,
    name: req.body.name,
    image: req.file ? req.file.filename : null,
    year: req.body.year,
  };

  const album = new Album(albumData);

  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default commentsRouter;