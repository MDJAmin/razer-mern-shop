import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [
      true,
      {
        en: "title is required",
        fa: "عنوان لزامی می باشد",
      },
    ],
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
