import express from "express";
import isAdmin from "../Middleware/isAdmin.js";
import upload from "../Utils/uploadFile.js";
import { deleteFile, uploadFile } from "../Controllers/upload.controller.js";

const router = express.Router();

router
  .route("/")
  .post(isAdmin, upload.single("file"), uploadFile)
  .delete(isAdmin, deleteFile);

export default router;
