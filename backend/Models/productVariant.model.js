import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
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
    finalPrice: {
      type: Number,
      required: [
        true,
        JSON.stringify({
          en: "final price is required",
          fa: "قیمت نهایی الزامی می باشد",
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
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const productVariant = mongoose.model("productVariant", productVariantSchema);
export default productVariant;
