import HandleError from "../Utils/handleError.js";
import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";

const isSuperAdmin = catchAsync(async (req, res, next) => {
  try {
    const { role } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (role !== "superAdmin")
      return next(
        new HandleError(
          {
            en: "you don't have a permission",
            fa: "دسترسی انجام این کار را ندارید",
          },
          401
        )
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

export default isSuperAdmin;
