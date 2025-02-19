import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: Map,
      of: String,
      required: [
        true,
        JSON.stringify({
          en: "name is required",
          fa: "اسم الزامی می باشد",
        }),
      ],
    },
    description: {
      type: Map,
      of: String,
      required: [
        true,
        JSON.stringify({
          en: "description is required",
          fa: "توضیحات الزامی می باشد",
        }),
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
    quantity: {
      type: Number,
      required: [
        true,
        JSON.stringify({
          en: "quantity is required",
          fa: "تعداد الزامی می باشد",
        }),
      ],
      min: 0,
    },
    price: {
      type: Number,
      required: [
        true,
        JSON.stringify({
          en: "price is required",
          fa: "مبلغ الزامی می باشد",
        }),
      ],
    },
    discount: {
      type: Number,
      required: [
        true,
        JSON.stringify({
          en: "discount is required",
          fa: "تخفیف الزامی می باشد",
        }),
      ],
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
