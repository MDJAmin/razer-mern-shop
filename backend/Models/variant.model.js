import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [
      true,
      {
        en: "type is required",
        fa: "نوع الزامی می باشد",
      },
    ],
    enum: ["size", "اندازه", "color", "رنگ"],
  },
  value: {
    type: String,
    required: [
      true,
      {
        en: "value is required",
        fa: "مقدار الزامی می باشد",
      },
    ],
  },
});

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
