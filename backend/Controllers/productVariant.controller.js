import catchAsync from "../Utils/catchAsync.js";
import Product from "../Models/product.model.js";
import ProductVariant from "../Models/productVariant.model.js";

export const createProductVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.create(req.body);
  await Product.findByIdAndUpdate(id, { $push: productVariant._id });
  return res.status(201).json({
    success: true,
    data: productVariant,
    message: {
      en: "product variant created",
      fa: "ورینت محصول ساخته شد",
    },
  });
});

export const getAllProductVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.find({ productId: id });
  return res.status(201).json({
    data: productVariant,
    success: true,
  });
});

export const getProductVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findById(id);
  return res.status(201).json({
    data: productVariant,
    success: true,
  });
});

export const updateProductVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(201).json({
    data: productVariant,
    success: true,
  });
});

export const removeProductVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await ProductVariant.findByIdAndDelete(id);
  Product.findByIdAndUpdate(productVariant.productId, {
    $pull: { productVariantIds: id },
  });
  return res.status(201).json({
    data: productVariant,
    success: true,
  });
});
