import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});


export const DummyPost = mongoose.model('DummyPost', postSchema)