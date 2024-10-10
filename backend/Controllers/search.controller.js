import catchAsync from "../Utils/catchAsync.js";
import Product from "../Models/product.model.js";
import Category from "../Models/category.model.js";
import Brand from "../Models/brand.model.js";

export const search = catchAsync(async (req, res, next) => {
  const { query } = req.body;
  const product = await Product.find({ name: { $regex: query, option: "i" } });
  const category = await Category.find({ title: { $regex: query, option: "i" } });
  const brand = await Brand.find({ title: { $regex: query, option: "i" } });
  let success = true;
  if (product.length == 0 && category.length == 0 && brand.length == 0) {
    success = false;
  }
  return res.status(200).json({
    success,
    data: { product, category, brand },
  });
});
