import jwt from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import User from "../Models/user.model.js";
import HandleError from "../Utils/handleError.js";
import ProductVariant from "../Models/productVariant.model.js";

export const addToCart = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const user = await User.findById(id);
  const {
    productId = null,
    productVariantId = null,
    categoryId = null,
  } = req.body;

  if (!productId || !productVariantId || !categoryId) {
    return next(
      new HandleError(
        {
          en: "ProductId , categoryId and productVariant Id is required",
          fa: "ایدی محصول, ایدی دسته بندی و ایدی ورینت محصول الزامی می باشد",
        },
        400
      )
    );
  }
  const productVariant = await ProductVariant.findById(productVariantId);
  let finalPrice = productVariant.finalPrice;
  let add = false;
  let newItems = user?.cart?.items?.map((e) => {
    if (productVariantId == e.productVariantId) {
      add = true;
      e.quantity = e.quantity + 1;
    }
    return e;
  });

  if (!add) {
    newItems.push({ productId, productVariantId, categoryId, quantity: 1 });
  }

  user.cart.totalPrice += finalPrice;
  user.cart.items = newItems;
  await user.save();
  return res.status(200).json({
    success: true,
    message: {
      en: "added to cart",
      fa: "به سبد خرید اضافه شد",
    },
    data: user.cart,
  });
});

export const removeFromCart = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  const user = await User.findById(id);
  const { productVariantId = null } = req.body;

  if (!productVariantId) {
    return next(
      new HandleError(
        {
          en: "ProductVariant is required",
          fa: "ورینت محصول الزامی می باشد",
        },
        400
      )
    );
  }

  const productVariant = await ProductVariant.findById(productVariantId);
  let finalPrice = productVariant.finalPrice;
  let newItems = user?.cart?.items?.filter((e) => {
    if (productVariantId == e.productVariantId) {
      user.cart.totalPrice -= finalPrice;
      e.quantity = e.quantity - 1;
      if (e.quantity == 0) {
        return false;
      }
    }
    return e;
  });
  
  user.cart.items = newItems;
  await user.save();

  return res.status(200).json({
    success: true,
    message: {
      en: "Item removed from cart",
      fa: "محصول از سبد خرید حذف شد",
    },
    data: user.cart,
  });
});

export const clearCart = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  const user = await User.findByIdAndUpdate(
    id,
    { cart: { totalPrice: 0, items: [] } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: {
      en: "cart cleared",
      fa: "سبد خرید خالی شد",
    },
    data: user.cart,
  });
});
