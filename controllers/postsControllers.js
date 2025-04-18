import Post from "../models/postsModel.js";

// Route handler to create a post.
export const createPostController = async (req, res) => {
  // Destructure the values from request body.
  const { title, body, tags, reactions, views, isValid } = req.body;

  // console.log({ body: req.body });

  try {
    // Create a document inside Post collection using mongoose schema validation.
    const result = await Post.create({
      title,
      body,
      tags,
      reactions,
      views,
      isValid,
    });

    // return response to the user after creating document inside Post collection.
    res.status(201).json({
      success: true,
      message: "Post created successfully.",
      data: result,
    });
  } catch (error) {
    // Check error name? name === 'ValidationError' the show error message in response.
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        error: errors,
      });
    }

    console.error(error);

    // If error is from server then show server error in response.
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: ["Something went wrong on the server."],
    });
  }
};

// Route hnandler to get all posts.
export const getAllPostsController = async (req, res) => {
  try {
    const result = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Posts",
      data: result,
    });
  } catch (error) {
    // If error is from server then show server error in response.
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: ["Something went wrong on the server."],
    });
  }
};
