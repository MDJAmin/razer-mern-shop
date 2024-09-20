import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";
import ApiFeatures from "../Utils/apiFeatures.js";
import Brand from "../Models/brand.model.js";

export const createBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.create(req.body);
  return res.status(201).json({
    success: true,
    data: brand,
    message: {
      en: "Brand created",
      fa: "برند ساخته شد",
    },
  });
});

export const getAllBrand = catchAsync(async (req, res, next) => {
  let client = true;

  try {
    const { role } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (role !== "user") {
      client = false;
    }
  } catch (err) {
    client = true;
  }

  let queryString;

  if (client) {
    queryString = {
      ...req.query,
      filters: { ...req?.query?.filters, isActive: true },
    };
  } else {
    queryString = req.query;
  }

  const features = new ApiFeatures(Brand, queryString)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const brand = await features.model;
  const count = await Brand.countDocuments(queryString?.filters);

  return res.status(200).json({
    success: true,
    data: brand,
    count,
  });
});

export const getBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  return res.status(200).json({
    success: true,
    data: brand,
  });
});

export const updateBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const newBrand = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: newBrand,
    message: {
        en: "Brand updated",
        fa: "برند بروز رسانی شد"
    },
  });
});
