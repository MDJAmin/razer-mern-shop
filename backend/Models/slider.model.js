import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  title: {
    type: Map,
    of: String,
    required: [
      true,
      {
        en: "title is required",
        fa: "عنوان الزامی می باشد",
      },
    ],
  },
  image: {
    type: String,
    required: [
      true,
      {
        en: "image is required",
        fa: "تصویر الزامی می باشد",
      },
    ],
  },
  href: {
    type: String,
  },
  position: {
    type: String,
    default: "home",
  },
});

const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
