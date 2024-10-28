import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: [
      true,
      JSON.stringify({
        en: "state is required",
        fa: "استان الزامی می باشد",
      }),
    ],
  },
  city: {
    type: String,
    required: [
      true,
      JSON.stringify({
        en: "city is required",
        fa: "شهر الزامی می باشد",
      }),
    ],
  },
  description: {
    type: String,
    required: [
      true,
      JSON.stringify({
        en: "description is required",
        fa: "توضیحات الزامی می باشد",
      }),
    ],
  },
  postalCode: {
    type: String,
    required: [
      true,
      JSON.stringify({
        en: "postalCode is required",
        fa: "کد پستی الزامی می باشد",
      }),
    ],
  },
  receiverPhone: {
    type: String,
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
      JSON.stringify({
        en: "receiver phone is not valid",
        fa: "شماره تلفن گیرنده معتبر نمی باشد",
      }),
    ],
    required: [
      true,
      JSON.stringify({
        en: "receiver phone is required",
        fa: "شماره تلفن گیرنده الزامی می باشد",
      }),
    ],
  },
  receiverName: {
    type: String,
    required: [
      true,
      JSON.stringify({
        en: "receiver name is required",
        fa: "نام گیرنده الزامی می باشد",
      }),
    ],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
