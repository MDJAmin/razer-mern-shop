import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";
import ApiFeatures from "../Utils/apiFeatures.js";
import Category from "../Models/category.model.js";

export const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  return res.status(201).json({
    success: true,
    data: category,
    message: {
      en: "Category created",
      fa: "دسته بندی ساخته شد",
    },
  });
});

export const getAllCategory = catchAsync(async (req, res, next) => {
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

  const features = new ApiFeatures(Category, queryString)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const category = await features.model;
  const count = await Category.countDocuments(req?.query?.filters);

  return res.status(200).json({
    success: true,
    data: category,
    count,
  });
});

export const getCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  return res.status(200).json({
    success: true,
    data: category,
  });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const newCategory = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: newCategory,
    message: {
      en: "Category updated",
      fa: "دسته بندی بروز رسانی شد",
    },
  });
});
