import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import Variant from "../Models/variant.model.js";

export const createVariant = catchAsync(async (req, res, next) => {
  const variant = await Variant.create(req.body);
  return res.status(201).json({
    success: true,
    data: variant,
    message: {
      en: "Variant created",
      fa: "ورینت ساخته شد",
    },
  });
});

export const getVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findById(id);
  return res.status(200).json({
    success: true,
    data: variant,
  });
});

export const getAllVariant = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Variant, req.query)
    .filters()
    .sort()
    .paginate()
    .limitFields()
    .populate();
  const variant = await features.model;
  return res.status(200).json({
    success: true,
    data: variant,
  });
});

export const updateVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const variant = await Variant.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: variant,
    message: {
      en: "Variant updated",
      fa: "ورینت بروز رسانی شد",
    },
  });
});

export const removeVariant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Variant.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: {
      en: "Variant deleted",
      fa: "ورینت حذف شد",
    },
  });
});
