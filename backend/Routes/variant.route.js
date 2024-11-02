import express from "express";

import isAdmin from "../Middleware/isAdmin.js";

import {
  createVariant,
  getAllVariant,
  getVariant,
  removeVariant,
  updateVariant,
} from "../Controllers/variant.controller.js";

const router = express.Router();

router.route("/").post(isAdmin, createVariant).get(isAdmin, getAllVariant);
router
  .route("/:id")
  .get(isAdmin, getVariant)
  .patch(isAdmin, updateVariant)
  .delete(isAdmin, removeVariant);

export default router;
