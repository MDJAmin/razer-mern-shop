import HandleError from "../Utils/handleError.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const getAllUser = catchAsync(async (req, res, next) => {
  const queryString = {
    ...req.query,
    filters: { ...req.query.filters, role: "user" },
  };
  const features = new ApiFeatures(User, queryString)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const users = await features.model;
  const count = await User.countDocuments(queryString?.filters);

  return res.status(200).json({
    success: true,
    data: users,
    count,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  if (role !== "admin" && role !== "superAdmin" && id !== userId) {
    return next(
      new HandleError(
        {
          en: "you don't have a permission",
          fa: "دسترسی انجام این کار را ندارید",
        },
        401
      )
    );
  }
  const user = await User.findById(id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export const getAllAdmin = catchAsync(async (req, res, next) => {
  const queryString = {
    ...req.query,
    filters: { ...req.query.filters, role: "admin" },
  };
  const features = new ApiFeatures(User, queryString)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const users = await features.model;
  const count = await User.countDocuments(queryString?.filters);

  return res.status(200).json({
    success: true,
    data: users,
    count,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  if (role !== "admin" && role !== "superAdmin" && id !== userId) {
    return next(
      new HandleError(
        {
          en: "you don't have a permission",
          fa: "دسترسی انجام این کار را ندارید",
        },
        401
      )
    );
  }
  const { password = "", role: newRole = "", ...others } = req.body;
  const user = await User.findByIdAndUpdate(id, others, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: {
      en: "User updated",
      fa: "مشخصات کاربر بروز شد",
    },
    data: user,
  });
});

export const changeRole = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { role: newRole } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { role: newRole },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: {
      en: newRole == "user" ? "Admin removed" : "User became admin",
      fa: newRole == "user" ? "ادمین حذف شد" : "کاربر ادمین شد",
    },
    data: user,
  });
});
