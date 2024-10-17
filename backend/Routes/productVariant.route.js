import express from "express";
import isAdmin from "../Middleware/isAdmin.js";
import {
  createProductVariant,
  getAllProductVariant,
  getProductVariant,
  removeProductVariant,
  updateProductVariant,
} from "../Controllers/productVariant.controller.js";

const router = express.Router();

router.route("/").post(isAdmin, createProductVariant);
router
  .route("/:id")
  .get(getAllProductVariant)
  .patch(isAdmin, updateProductVariant)
  .delete(isAdmin, removeProductVariant);
router.route("/variant/:id").get(getProductVariant);

export default router;
