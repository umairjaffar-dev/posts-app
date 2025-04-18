import express from "express";
import {
  createPostController,
  getAllPostsController,
} from "../controllers/postsControllers.js";

const router = express.Router();

// Route to handle create a new-post.
router.post("/", createPostController);

// Route to handle get all posts.
router.get("/", getAllPostsController);

export default router;
