import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
    },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
    totalAfterDiscount: {
      type: Number,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    authority: {
      type: String,
    },
    items: {
      type: Array,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);
export default OrderHistory;
