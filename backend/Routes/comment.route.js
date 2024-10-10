import express from "express";
import isLogin from "../Middleware/isLogin.js";
import isAdmin from "../Middleware/isAdmin.js";
import {
  createComment,
  getAllComment,
  getProductComment,
  isPublish,
  removeComment,
  replyComment,
} from "../Controllers/comment.controller.js";

const router = express.Router();

router.route("/").post(isLogin, createComment).get(isAdmin, getAllComment);
router
  .route("/:id")
  .get(getProductComment)
  .patch(isAdmin, isPublish)
  .delete(isAdmin, removeComment);
router.route("/reply/:id").patch(isAdmin, replyComment);

export default router;
