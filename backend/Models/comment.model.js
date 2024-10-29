import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: [
        true,
        JSON.stringify({
          en: "comment content is required",
          fa: "متن کامنت الزامی می باشد",
        }),
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [
        true,
        JSON.stringify({
          en: "productId is required",
          fa: "ایدی محصول الزامی می باشد",
        }),
      ],
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    reply: {
      type: Array,
      default: [],
    },
    isCustomer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
