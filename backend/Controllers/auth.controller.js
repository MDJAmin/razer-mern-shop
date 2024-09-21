import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import User from "../Models/user.model.js";
import { sendAuthCode, verifyCode } from "../Utils/smsHandler.js";

export const auth = catchAsync(async (req, res, next) => {
  const { identifier = null } = req.body;
  if (!identifier) {
    return next(
      new HandleError(
        {
          en: "Phone or email is required",
          fa: "شماره همراه یا ایمیل الزامی می باشد",
        },
        400
      )
    );
  }
  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  if (!user) {
    // user not found ==> sing up
    const regex = new RegExp(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      "g"
    );
    if (regex.test(identifier)) {
      // user sign up with phone number
      const otp = await sendAuthCode(identifier);
      if (otp.success) {
        return res.status(200).json({
          success: true,
          isPass: false,
          isNew: true,
          data: { identifier },
          message: {
            en: "Code has been sent",
            fa: "کد ورود ارسال شد",
          },
        });
      } else {
        return res.status(400).json({
          success: false,
          isPass: false,
          isNew: true,
          data: { identifier },
          message: {
            en: "Please try again",
            fa: "لطفا مجددا تلاش کنید",
          },
        });
      }
    } else {
      // user sign up with email
      return res.status(400).json({
        success: false,
        isPass: false,
        isNew: true,
        data: { identifier },
        message: {
          en: "Please enter phone number",
          fa: "لطفا شماره همراه را وارد کنید",
        },
      });
    }
  } else {
    // user found ==> sign in
    if (user?.password) {
      // user sign in with password
      return res.status(200).json({
        success: true,
        isPass: true,
        isNew: false,
        data: { identifier },
      });
    } else {
      // user sign in with otp
      const otp = await sendAuthCode(user?.phone);
      if (otp.success) {
        return res.status(200).json({
          success: true,
          isPass: false,
          isNew: false,
          data: { identifier },
          message: {
            en: "Code has been sent",
            fa: "کد ورود ارسال شد",
          },
        });
      } else {
        return res.status(400).json({
          success: false,
          isPass: false,
          isNew: false,
          data: { identifier },
          message: {
            en: "Please try again",
            fa: "لطفا مجددا تلاش کنید",
          },
        });
      }
    }
  }
});

export const checkPassword = catchAsync(async (req, res, next) => {
  const { identifier = null, password = null } = req.body;
  if (!identifier || !password) {
    return next(
      new HandleError(
        {
          en: "Phone or email and password is required",
          fa: "ایمیل یا شمراه همراه و گذرواژه الزامی می باشد",
        },
        400
      )
    );
  }
  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  const regex = new RegExp(
    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
    "g"
  );

  if (!user) {
    if (regex.test(identifier)) {
      return next(
        new HandleError(
          {
            en: "Phone number or password is incorrect",
            fa: "شماره همراه یا گذرواژه اشتباه می باشد",
          },
          400
        )
      );
    }
    return next(
      new HandleError(
        {
          en: "Email or password is incorrect",
          fa: "ایمیل یا گذرواژه اشتباه می باشد",
        },
        400
      )
    );
  }

  const checkPassword = bcryptjs.compareSync(password, user?.password);

  if (!checkPassword) {
    if (regex.test(identifier)) {
      return next(
        new HandleError(
          {
            en: "Phone number or password is incorrect",
            fa: "شماره همراه یا گذرواژه اشتباه می باشد",
          },
          400
        )
      );
    }
    return next(
      new HandleError(
        {
          en: "Email or password is incorrect",
          fa: "ایمیل یا گذرواژه اشتباه می باشد",
        },
        400
      )
    );
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    success: true,
    message: {
      en: "Login successfully",
      fa: "با موفقیت وارد شدید",
    },
    data: {
      token,
      user: {
        role: user.role,
        id: user._id,
        phone: user.phone,
        email: user?.email,
        fullName: user?.fullName,
      },
    },
  });
});

export const checkCode = catchAsync(async (req, res, next) => {
  const { phone = null, code = null } = req.body;
  if (!phone || !code) {
    return next(
      new HandleError(
        {
          en: "Phone and code is required",
          fa: "شماره همراه و کد ورود الزامی می باشد",
        },
        400
      )
    );
  }

  const otp = verifyCode(phone, code);
  if (!otp.success) {
    return next(
      new HandleError(
        {
          en: "Code is incorrect",
          fa: "کد وارد شده صحیح نمی باشد",
        },
        400
      )
    );
  }

  const user = await User.findOne({ phone });
  if (user) {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      message: {
        en: "Login successfully",
        fa: "با موفقیت وارد شدید",
      },
      data: {
        token,
        user: {
          role: user.role,
          id: user._id,
          phone: user.phone,
          email: user?.email,
          fullName: user?.fullName,
        },
      },
    });
  } else {
    const newUser = await User.create({ phone });
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      success: true,
      message: {
        en: "Login successfully",
        fa: "با موفقیت وارد شدید",
      },
      data: {
        token,
        user: {
          role: newUser.role,
          id: newUser._id,
          phone: newUser.phone,
          email: newUser?.email,
          fullName: newUser?.fullName,
        },
      },
    });
  }
});

export const setPassword = catchAsync(async (req, res, next) => {
  const { password = null } = req.body;
  if (!password) {
    return next(
      new HandleError(
        {
          en: "Password is required",
          fa: " گذرواژه الزامی است",
        },
        400
      )
    );
  }
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  const user = await User.findByIdAndUpdate(
    id,
    { password },
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: {
      en: "password change successfully",
      fa: "تغییر گذرواژه با موفقیت انجام شد",
    },
  });
});

export const sendCode = catchAsync(async (req, res, next) => {
  const { phone = null } = req.body;
  if (!phone) {
    return next(
      new HandleError(
        {
          en: "Phone number is required",
          fa: "شماره همراه الزامی است",
        },
        400
      )
    );
  }
  const otp = await sendAuthCode(phone);
  if (!otp.success) {
    return next(
      new HandleError(
        {
          en: "Failed to send OTP, try again later",
          fa: "ارسال کد ورود انجام نشد، دوباره تلاش کنید",
        },
        400
      )
    );
  }
  return res.status(200).json({
    success: true,
    message: {
      en: "Code has been sent",
      fa: "کد ورود ارسال شد",
    },
  });
});
