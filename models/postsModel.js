import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "body is required."],
      trim: true,
    },
    tags: [{ type: String }],
    reactions: {
      likes: { type: Number },
      dislikes: { type: Number },
    },

    views: { type: Number },
    isValid: { type: Boolean, default: false },
    userId: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postsSchema);
export default Post;
