import fs from "fs";
import { __dirname } from "../app.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";

export const uploadFile = catchAsync(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(
      new HandleError(
        {
          en: "File is required",
          fa: "ارسال فایل الزامی است",
        },
        400
      )
    );
  }
  return res.status(200).json({
    success: true,
    message: {
      en: "File uploaded",
      fa: "فایل با موفقیت بارگذاری شد",
    },
    data: {
      name: file,
    },
  });
});

export const deleteFile = catchAsync(async (req, res, next) => {
  const { fileName } = req.body;
  const deleteFileName = fileName.split("/").at(-1);

  if (deleteFileName == "*") {
    return next(
      new HandleError(
        {
          en: "File not found",
          fa: "فایل مورد نظر یافت نشد",
        },
        400
      )
    );
  }
  if (!fileName) {
    return next(
      new HandleError(
        {
          en: "File not found",
          fa: "فایل مورد نظر یافت نشد",
        },
        400
      )
    );
  }
  fs.unlinkSync(`${__dirname}/../Public/${deleteFileName}`);

  return res.status(200).json({
    success: true,
    message: {
      en: "File removed",
      fa: "فایل با موفقیت حذف شد",
    },
  });
});
