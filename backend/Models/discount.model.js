import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [
        true,
        JSON.stringify({
          en: "code name is required",
          fa: "اسم کد الزامی می باشد",
        }),
      ],
      unique: [
        true,
        JSON.stringify({
          en: "code already exists",
          fa: "کد وجود دارد",
        }),
      ],
    },
    percent: {
      type: Number,
      required: [
        true,
        JSON.stringify({
          en: "code percent is required",
          fa: "درصد کد الزامی می باشد",
        }),
      ],
      min: 0,
      max: 100,
    },
    startTime: {
      type: String,
      required: [
        true,
        JSON.stringify({
          en: "start time is required",
          fa: "زمان شروع الزامی می باشد",
        }),
      ],
    },
    endTime: {
      type: String,
      required: [
        true,
        JSON.stringify({
          en: "end time is required",
          fa: "زمان پایان الزامی می باشد",
        }),
      ],
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    useableNumber: {
      type: Number,
      default: 1,
    },
    userIdUsed: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
