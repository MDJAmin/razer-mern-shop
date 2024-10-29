import express from "express";

import isAdmin from "../Middleware/isAdmin.js";

import {
  createSlider,
  getAllSlider,
  getSlider,
  remove,
} from "../Controllers/slider.controller.js";

const router = express.Router();

router.route("/").post(isAdmin, createSlider).get(getAllSlider);
router.route("/:id").get(getSlider).delete(isAdmin,remove);

export default router;
