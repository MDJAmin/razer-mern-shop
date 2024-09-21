import express from "express";

import isAdmin from "../Middleware/isAdmin.js";

import {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../Controllers/category.controller.js";

const router = express.Router();

router.route("/").post(isAdmin, createCategory).get(getAllCategory);
router.route("/:id").get(getCategory).patch(updateCategory);

export default router;
