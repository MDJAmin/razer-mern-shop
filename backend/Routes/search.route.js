import express from "express";
import { search } from "../Controllers/search.controller.js";

const router = express.Router();

router.route("/").post(search);

export default router;
