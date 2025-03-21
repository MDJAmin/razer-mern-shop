import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
  title: {
    type: Map,
    of: String,
    required: [
      true,
      JSON.stringify({
        en: "title is required",
        fa: "عنوان لزامی می باشد",
      }),
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
