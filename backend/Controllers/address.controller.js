import HandleError from "../Utils/handleError.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import Address from "../Models/address.model.js";
import jwt from "jsonwebtoken";

export const createAddress = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const address = await Address.create({ ...req.body, userId: id });
  return res.status(201).json({
    success: true,
    data: address,
    message: {
      en: "Address created",
      fa: "آدرس اضافه شد",
    },
  });
});

export const getAllAddress = catchAsync(async (req, res, next) => {
  const { id, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  let queryString;

  if (role !== "user") {
    queryString = req.query;
  } else {
    queryString = {
      ...req.query,
      filters: { ...req.query.filters, userId: id },
    };
  }
  const features = new ApiFeatures(Address, queryString)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const address = await features.model();

  return res.status(200).json({
    success: true,
    data: address,
  });
});

export const getAddress = catchAsync(async (req, res, next) => {
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const { id } = req.params;

  const address = await Address.findById(id);

  if (userId != address.userId && role == "user") {
    return next(
      new HandleError(
        {
          en: "you don't have permission",
          fa: "دسترسی انجام این کار را ندارید",
        },
        401
      )
    );
  }
  return res.status(200).json({
    success: true,
    data: address,
  });
});

export const updateAddress = catchAsync(async (req, res, next) => {
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const { id } = req.params;

  const address = await Address.findById(id);

  if (userId != address.userId && role == "user") {
    return next(
      new HandleError(
        {
          en: "you don't have permission",
          fa: "دسترسی انجام این کار را ندارید",
        },
        401
      )
    );
  }
  const { userId: x = null, ...others } = req.body;
  const newAddress = await Address.findByIdAndUpdate(
    id,
    { ...others },
    { new: true, runValidators: true }
  );
  return res.status(200).json({
    success: true,
    data: newAddress,
    message: {
      en: "Address updated",
      fa: "آدرس ویرایش شد",
    },
  });
});

export const removeAddress = catchAsync(async (req, res, next) => {
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const { id } = req.params;

  const address = await Address.findById(id);

  if (userId != address.userId && role == "user") {
    return next(
      new HandleError(
        {
          en: "you don't have permission",
          fa: "دسترسی انجام این کار را ندارید",
        },
        401
      )
    );
  }
  await Address.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: {
      en: "Address deleted",
      fa: "آدرس حذف شد",
    },
  });
});
