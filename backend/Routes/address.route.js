import express from "express";

import isAdmin from "../Middleware/isAdmin.js";
import isLogin from "../Middleware/isLogin.js";

import {
  createAddress,
  getAddress,
  getAllAddress,
  removeAddress,
  updateAddress,
} from "../Controllers/address.controller.js";

const router = express.Router();

router.route("/").get(isAdmin, getAllAddress).post(isLogin, createAddress);
router
  .route("/:id")
  .get(isLogin, getAddress)
  .patch(isLogin, updateAddress)
  .delete(isLogin, removeAddress);

export default router;
