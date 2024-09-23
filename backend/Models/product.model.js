import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        {
          en: "name is required",
          fa: "اسم الزامی می باشد",
        },
      ],
    },
    description: {
      type: String,
      required: [
        true,
        {
          en: "description is required",
          fa: "توضیحات الزامی می باشد",
        },
      ],
    },
    information: {
      type: [{ name: String, value: String }],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    productVariantIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
        },
      ],
      default: [],
    },
    defaultVariantIndex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
