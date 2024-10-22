import express from "express";

import isSuperAdmin from "../Middleware/isSuperAdmin.js";
import isAdmin from "../Middleware/isAdmin.js";
import isLogin from "../Middleware/isLogin.js";

import {
  changeRole,
  getAllAdmin,
  getAllUser,
  getUser,
  updateUser,
} from "../Controllers/user.controller.js";

const router = express.Router();

router.route("/").get(isAdmin, getAllUser);
router.route("/admin").get(isSuperAdmin, getAllAdmin);
router.route("/change-role").patch(isSuperAdmin, changeRole);
router.route("/:id").get(isLogin, getUser).patch(isLogin, updateUser);

export default router;
