import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [
      true,
      JSON.stringify({
        en: "type is required",
        fa: "نوع الزامی می باشد",
      }),
    ],
    enum: ["size", "color"],
  },
  value: {
    type: String,
    required: [
      true,
      JSON.stringify({
        en: "value is required",
        fa: "مقدار الزامی می باشد",
      }),
    ],
    unique: [
      true,
      JSON.stringify({
        en: "variant is already exist",
        fa: " ورینت قبلا ثبت شده است",
      }),
    ],
  },
});

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
