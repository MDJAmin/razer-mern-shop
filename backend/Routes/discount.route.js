import express from "express";

import isAdmin from "../Middleware/isAdmin.js";
import isLogin from "../Middleware/isLogin.js";

import {
  checkDiscount,
  createDiscount,
  getAllDiscount,
  getDiscount,
  removeDiscount,
  updateDiscount,
} from "../Controllers/discount.controller.js";

const router = express.Router();
router.route("/").post(isAdmin, createDiscount).get(isAdmin, getAllDiscount);
router
  .route("/:id")
  .get(isAdmin, getDiscount)
  .patch(isAdmin, updateDiscount)
  .delete(isAdmin, removeDiscount);
router.route("/check").post(isLogin, checkDiscount);

export default router;
