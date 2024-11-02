// 6143a92d-42b3-4f3d-90d9-a7c5f8b10fd0

import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cors from "cors";  
import path from "path";

import HandleError from "./Utils/handleError.js";
import catchError from "./Utils/catchError.js";

import userRouter from "./Routes/user.route.js";
import uploadRouter from "./Routes/upload.route.js";
import addressRouter from "./Routes/address.route.js";
import authRouter from "./Routes/auth.route.js";
import categoryRouter from "./Routes/category.route.js";
import brandRouter from "./Routes/brand.route.js";
import sliderRouter from "./Routes/slider.router.js";
import discountRouter from "./Routes/discount.route.js";
import variantRouter from "./Routes/variant.route.js";
import commentRouter from "./Routes/comment.route.js";
import cartRouter from "./Routes/cart.route.js";
import productRouter from "./Routes/product.route.js";
import productVariantRouter from "./Routes/productVariant.route.js";
import searchRouter from "./Routes/search.route.js";
import orderHistoryRouter from "./Routes/orderHistory.route.js";

import { checkOut } from "./Controllers/orderHistory.controller.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

setInterval(checkOut, 20 * 60 * 1000);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Public"));

// Routes
app.use("/api/upload", uploadRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/address", addressRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/slider", sliderRouter);
app.use("/api/discount", discountRouter);
app.use("/api/variant", variantRouter);
app.use("/api/comment", commentRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/product-variant", productVariantRouter);
app.use("/api/search", searchRouter);
app.use("/api/order-history", orderHistoryRouter);

// Error Handling
app.use("*", (req, res, next) => {
  return next(new HandleError("Route not found", 404));
});
app.use(catchError);

export default app;
