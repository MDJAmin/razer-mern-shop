import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Public"));


export default app;
