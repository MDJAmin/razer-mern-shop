import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0,
  },
  items: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
        productVariantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    password: {
      type: String,
    },
    idCard: {
      type: String,
      unique: [
        true,
        JSON.stringify({
          en: "idCard is already exist",
          fa: "کد ملی قبلا ثبت شده است",
        }),
      ],
      match: [
        /^[0-9]{10}$/g,
        JSON.stringify({
          en: "idCard is not valid",
          fa: "کد ملی معتبر نمیباشد",
        }),
      ],
    },
    phone: {
      type: String,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
        JSON.stringify({
          en: "phone number is not valid",
          fa: "شماره همراه معتبر نمیباشد",
        }),
      ],
      required: [
        true,
        JSON.stringify({
          en: "phone number is required",
          fa: "شماره همراه الزامی میباشد",
        }),
      ],
      unique: [
        true,
        JSON.stringify({
          en: "phone number is already exist",
          fa: "شماره همراه قبلا ثبت شده است",
        }),
      ],
    },
    email: {
      type: String,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        JSON.stringify({
          en: "email is not valid",
          fa: "ایمیل معتبر نمیباشد",
        }),
      ],
      unique: [
        true,
        JSON.stringify({
          en: "email is already exist",
          fa: "ایمیل قبلا ثبت شده است",
        }),
      ],
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
    useDiscountCode: {
      type: Array,
      default: [],
    },
    favoriteProductIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
    recentlyProductIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: cartSchema,
      default: {
        totalPrice: 0,
        items: [],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
