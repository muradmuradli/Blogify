import express from "express";
const router = express.Router();
import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import authenticateUser from "../middleware/auth.js";
import uploadProductImage from "../controllers/uploadsController.js";

router.route("/").post(authenticateUser, createPost).get(getAllPosts);
router.route("/uploads").post(uploadProductImage);
router
  .route("/:id")
  .get(getSinglePost)
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, deletePost);

export default router;
