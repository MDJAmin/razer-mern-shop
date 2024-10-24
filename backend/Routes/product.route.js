import express from "express";
import isAdmin from "../Middleware/isAdmin.js";
import isLogin from "../Middleware/isLogin.js";
import {
  createProduct,
  favoriteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../Controllers/product.controller.js";

const productRouter = express.Router();

productRouter.route("/").post(isAdmin, createProduct).get(getAllProduct);
productRouter.route("/:id").get(getProduct).patch(isAdmin, updateProduct);
productRouter.route("/favorite/:id").post(isLogin, favoriteProduct);

export default productRouter;
