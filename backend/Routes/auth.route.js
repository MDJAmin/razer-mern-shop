import express from "express";

import {
  auth,
  checkCode,
  checkPassword,
  sendCode,
  setPassword,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.route("/").post(auth);
router.route("/check-password").post(checkPassword);
router.route("/check-code").post(checkCode);
router.route("/set-password").post(setPassword);
router.route("/send-code").post(sendCode);

export default router;
