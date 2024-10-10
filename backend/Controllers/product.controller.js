import jwt from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import Product from "../Models/product.model.js";
import User from "../Models/user.model.js";

export const getAllProduct = catchAsync(async (req, res, next) => {
  let role;

  if (req?.headers?.authorization) {
    role = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    ).role;
  }

  let queryString = {
    ...req.query,
    populate: {
      path: "productVariantIds",
      populate: {
        path: "variantId",
        model: "Variant",
      },
    },
  };

  if (role == "user" || !role) {
    queryString = {
      ...queryString,
      filters: { ...queryString?.filters, isActive: true },
    };
  }

  const features = new ApiFeatures(Product, queryString)
    .filters()
    .sort()
    .paginate()
    .limitFields()
    .secondPopulate(req?.query?.populate || "");

  const products = await features.model;
  const count = await Product.countDocuments(queryString?.filters);

  return res.status(200).json({
    success: true,
    data: products,
    count,
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let isFavorite = false;
  let isCustomer = false;
  let userId;

  if (req?.headers?.authorization) {
    userId = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    ).id;

    const user = await User.findById(userId);

    if (user.favoriteProductIds.includes(id)) {
      isFavorite = true;
    }

    if (user.boughtProduct.includes(id)) {
      isCustomer = true;
    }

    let recentlyProductIds = user?.recentlyProductIds;

    if (recentlyProductIds?.length == 10) {
      recentlyProductIds.shift();
      recentlyProductIds.push(id);
    } else {
      recentlyProductIds.push(id);
    }

    user.recentlyProductIds = recentlyProductIds;
    await user.save();
  }

  const product = await Product.findById(id).populate({
    path: "productVariantIds",
    populate: {
      path: "variantId",
      model: "Variant",
    },
  });

  return res.status(200).json({
    success: true,
    data: product,
    isFavorite,
    isCustomer,
  });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  return res.status(201).json({
    success: true,
    message: {
      en: "product created",
      fa: "محصول ساخته شد",
    },
    data: product,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: {
      en: "product updated",
      fa: "محصول بروز رسانی شد",
    },
    data: product,
  });
});

export const favoriteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { id: userId } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  const { isFavorite = false } = req.body;
  let newFav;

  if (isFavorite) {
    await User.findByIdAndUpdate(userId, { $pull: { favoriteProductIds: id } });
    newFav = false;
  } else {
    await User.findByIdAndUpdate(userId, { $push: { favoriteProductIds: id } });
    newFav = true;
  }

  return res.status(200).json({
    isFavorite: newFav,
    message: newFav
      ? {
          en: "add product to favorite list",
          fa: "محصول به لیست علاقه مندی ها اضافه شد",
        }
      : {
          en: "remove product from favorite list",
          fa: "محصول از لیست علاقه مندی ها حذف شد",
        },
  });
});
