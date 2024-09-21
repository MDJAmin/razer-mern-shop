import express from "express";

import isAdmin from "../Middleware/isAdmin.js";

import {
  createBrand,
  getAllBrand,
  getBrand,
  updateBrand,
} from "../Controllers/brand.controller.js";

const router = express.Router();

router.route("/").post(isAdmin, createBrand).get(getAllBrand);
router.route("/:id").get(getBrand).patch(isAdmin, updateBrand);

export default router;
