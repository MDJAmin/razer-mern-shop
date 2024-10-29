import express from "express";
import isLogin from "../Middleware/isLogin.js";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "../Controllers/cart.controller.js";

const router = express.Router();

router.route("/").post(isLogin, addToCart).delete(isLogin, removeFromCart);
router.route("/clear").delete(isLogin, clearCart);

export default router;
