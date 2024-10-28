import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import Slider from "../Models/slider.model.js";
import { __dirname } from "../app.js";
import fs from "fs";

export const createSlider = catchAsync(async (req, res, next) => {
  const slider = await Slider.create(req.body);
  return res.status(201).json({
    success: true,
    data: slider,
    message: {
      en: "Slider created",
      fa: "اسلایدر ساخته شد",
    },
  });
});

export const getAllSlider = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Slider, req?.query)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const slider = await features.model;
  return res.status(200).json({
    success: true,
    data: slider,
  });
});

export const getSlider = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slider = await Slider.findById(id);
  return res.status(200).json({
    success: true,
    data: slider,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slider = await Slider.findByIdAndDelete(id);
  fs.unlinkSync(`${__dirname}/..Public/${slider.image}`);
  return res.status(200).json({
    success: true,
    message: {
        en: "Slider removed",
        fa: "اسلایدر حذف شد",
    },
  });
});
