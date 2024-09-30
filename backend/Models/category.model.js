import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: Map,
    of: String,
    required: [
      true,
      {
        en: "title is required",
        fa: "عنوان لزامی می باشد",
      },
    ],
  },
  images: {
    type: [String],
    default: [],
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  brandIds: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
