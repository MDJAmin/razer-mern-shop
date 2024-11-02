import express from "express";
import isLogin from "../Middleware/isLogin.js";
import isAdmin from "../Middleware/isAdmin.js";
import {
  getAll,
  getOne,
  payment,
  update,
  verify,
} from "../Controllers/orderHistory.controller.js";

const router = express.Router();
router.route("/").post(isLogin, payment).get(isLogin, getAll);
router.route("/:id").patch(isAdmin, update).get(isLogin, getOne);
router.route("/verify").post(isLogin, verify);

export default router;
