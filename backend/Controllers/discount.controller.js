import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import Discount from "../Models/discount.model.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";

export const createDiscount = catchAsync(async (req, res, next) => {
  const discount = await Discount.create(req.body);
  return res.status(201).json({
    success: true,
    data: discount,
    message: {
      en: "Discount code created",
      fa: "کد تخفیف ساخته شد",
    },
  });
});

export const getAllDiscount = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Discount, req.query)
    .filters()
    .sort()
    .paginate()
    .limitFields()
    .populate();
  const discount = await features.model;
  const count = await Discount.countDocuments(req?.query?.filters);
  return res.status(200).json({
    success: true,
    data: discount,
    count,
  });
});

export const getDiscount = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const discount = await Discount.findById(id);
  return res.status(200).json({
    success: true,
    data: discount,
  });
});

export const updateDiscount = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const discount = await Discount.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: discount,
    message: {
      en: "Discount code updated",
      fa: "کد تخفیف بروز رسانی شد",
    },
  });
});

export const removeDiscount = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const discount = await Discount.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: {
      en: "Discount code deleted",
      fa: "کد تخفیف حذف شد",
    },
  });
});

export const checkDiscount = catchAsync(async (req, res, next) => {
  const { code = null } = req.body;
  const discount = await Discount.findOne({ code });

  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  const now = new Date().getTime();

  const userCountUseCode = discount?.userIdUsed?.filter((e) => e == id)?.length;

  if (!code || !discount) {
    return next(
      new HandleError(
        {
          en: "Code is not valid",
          fa: "کد معتبر نیست",
        },
        400
      )
    );
  } else if (now < discount.startTime || now > discount.endTime) {
    return next(
      new HandleError(
        {
          en: "Code not valid at this time",
          fa: "کد در این زمان معتبر نیست",
        },
        400
      )
    );
  } else if (userCountUseCode >= discount.useableNumber) {
    return next(
      new HandleError(
        {
          en: "You already used this code",
          fa: "این کد قبلا استفاده شده است",
        },
        400
      )
    );
  } else if (!discount.isActive) {
    return next(
      new HandleError(
        {
          en: "Code is not active",
          fa: "کد فعال نیست",
        },
        400
      )
    );
  }
  return res.status(200).json({
    success: true,
    message: {
      en: "Code is valid",
      fa: "کد معتبر است",
    },
    data: {
      code: {
        percent: discount.percent,
        code,
      },
    },
  });
});
