import HandleError from "../Utils/handleError.js";
import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";

const isLogin = catchAsync(async (req, res, next) => {
  try {
    const token = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    return next();
  } catch (err) {
    return next(
      new HandleError(
        {
          en: "you don't have a permission",
          fa: "دسترسی انجام این کار را ندارید",
        },
        401
      )
    );
  }
});

export default isLogin;
