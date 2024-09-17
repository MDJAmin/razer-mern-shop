import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import HandleError from "./Utils/handleError.js";
import catchError from "./Utils/catchError.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Public"));

app.use("*", (req, res, next) => {
  return next(new HandleError("Route not found", 404));
});
app.use(catchError);

export default app;
