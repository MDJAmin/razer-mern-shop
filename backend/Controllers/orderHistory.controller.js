import jwt from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import ProductVariant from "../Models/productVariant.model.js";
import OrderHistory from "../Models/orderHistory.model.js";
import Discount from "../Models/discount.model.js";
import User from "../Models/user.model.js";

export const validateCode = async (code, userId) => {
  if (!code) {
    return {
      success: true,
      discount: 0,
      freeShipping: false,
    };
  }
  const discount = await Discount.findOne({ code });
  const now = new Date().getTime();
  const userCountUseCode = discount?.userIdUsed?.filter(
    (e) => e == userId
  )?.length;
  if (!discount) {
    return {
      success: false,
      message: {
        en: "Discount code is incorrect",
        fa: "کد تخفیف صحیح نمی باشد",
      },
    };
  } else if (now < discount.startTime || now > discount.endTime) {
    return {
      success: false,
      message: {
        en: "Discount code is invalid at this time",
        fa: "کد تخفیف در این زمان معتبر نمی باشد",
      },
    };
  } else if (userCountUseCode >= discount.useableNumber) {
    return {
      success: false,
      message: {
        en: "You already used this code",
        fa: "قبلا از این کد استفاده کردید ",
      },
    };
  } else if (!discount.isActive) {
    return {
      success: false,
      message: {
        en: "Not active",
        fa: "فعال نمی باشد",
      },
    };
  }
  return {
    success: true,
    discount: discount.percent,
    freeShipping: discount.freeShipping,
    discountId: discount?._id,
  };
};

export const payment = catchAsync(async (req, res, next) => {
  const { id: userId } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const { addressId = null, discountCode = null } = req.body;
  if (!addressId) {
    return next(
      new HandleError(
        {
          en: "Address is required",
          fa: "آدرس الزامی می باشد",
        },
        400
      )
    );
  }
  const user = await User.findById(userId);
  if (!user?.cart?.items?.length >= 0 || user?.cart?.totalPrice <= 0) {
    return next(
      new HandleError(
        {
          en: "Cart is invalid",
          fa: "سبد خرید معتبر نمی باشد",
        },
        400
      )
    );
  }
  const resultDiscount = await validateCode(discountCode, userId);
  if (!resultDiscount.success) {
    return next(new HandleError(resultDiscount.message, 400));
  }

  let change = false;
  let items = user?.cart?.items;
  let totalPrice = user?.cart?.totalPrice;
  let newTotalPrice = 0;
  let newItems = [];

  for (let item of items) {
    const pr = await ProductVariant.findById(item.productVariantId);
    if (pr.quantity == 0) {
      change = true;
      break;
    } else if (pr.quantity < item.quantity) {
      item.quantity = pr.quantity;
      change = true;
    }
    newTotalPrice += pr.finalPrice * item.quantity;
    newItems.push(item);
  }
  if (totalPrice != newTotalPrice) {
    change = true;
  }
  if (change) {
    user.cart.items = newItems;
    user.cart.totalPrice = newTotalPrice;
    await user.save();
    return res.status(400).json({
      message: {
        en: "Cart updated",
        fa: "سبد خرید بروز رسانی شد",
      },
      success: false,
      data: {
        cart: {
          items: newItems,
          totalPrice: newTotalPrice,
        },
      },
    });
  }

  for (let item of newItems) {
    await ProductVariant.findByIdAndUpdate(item.productVariantId, {
      $inc: { quantity: -item?.quantity },
    });
  }
  // payment return link and authority
  let authority = "A" + Math.trunc(Math.random() * 10 ** 10);
  let link = "http://localhost:8080/callback";
  const orderData =
    resultDiscount.discount > 0
      ? {
          userId,
          addressId,
          status: "pending",
          totalPrice: newTotalPrice,
          discount: resultDiscount?.discountId,
          authority,
          freeShipping: resultDiscount?.freeShipping,
          items: newItems,
          totalAfterDiscount:
            newTotalPrice * (1 - resultDiscount.discount / 100),
        }
      : {
          userId,
          addressId,
          status: "pending",
          totalPrice: newTotalPrice,
          authority,
          freeShipping: resultDiscount?.freeShipping,
          items: newItems,
          totalAfterDiscount: newTotalPrice,
        };

  const order = await OrderHistory.create(orderData);
  user.cart = { totalPrice: 0, items: [] };
  await user.save();
  return res.status(201).json({
    message: "Moving to payment page",
    data: {
      link,
    },
    success: true,
  });
});

export const verify = catchAsync(async (req, res, next) => {
  const { authority = null } = req.body;
  if (!authority) {
    return next(new HandleError("Authority code not found", 400));
  }
  const order = await OrderHistory.findOne({ authority });
  if (!order) {
    return next(new HandleError("Authority code is incorrect", 400));
  }
  //
  // const verifypay = await zarinpal.verify({authority ,amount: order.totalAfterDiscount});
  // if(verifypay.data.code==100 || verifypay.data.code==101){
  //     order.status='success'
  //     await order.save()

  // }else{
  //     order.status='failed'
  //     await order.save()
  // }
  // return res.status(200).json({
  //     data:verifypay.data
  // })
});

export const getAll = catchAsync(async (req, res, next) => {
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  let queryString;
  if (role == "admin" || role == "superAdmin") {
    queryString = req?.query;
  } else {
    queryString = { ...req.query, filters: { ...req?.query?.filters, userId } };
  }
  const features = new ApiFeatures(OrderHistory, queryString)
    .filters()
    .sort()
    .paginate()
    .limitFields();

  const order = await features.model;
  const count = await OrderHistory.countDocuments(queryString?.filters);
  return res.status(200).json({
    success: true,
    data: order,
    count,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const { id } = req.params;
  let findQuery;
  if (role == "admin" || role == "superAdmin") {
    findQuery = { _id: id };
  } else {
    findQuery = { _id: id, userId };
  }
  const order = await OrderHistory.findOne(findQuery)
    .populate({
      path: "items.productId",
    })
    .populate({
      path: "items.productVariantId",
    })
    .populate({
      path: "items.categoryId",
    })
    .populate({ path: "addressId" });

  return res.status(200).json({
    success: true,
    data: order,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await OrderHistory.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: true,
    data: order,
    count,
  });
});

export const checkOut = async () => {
  const passTime = new Date(Date.now() - 20 * 60 * 1000);
  const orders = await OrderHistory.find({
    status: "pending",
    createdAt: { $lt: passTime },
  });
  if (orders?.length == 0) {
    return;
  }
  for (let order of orders) {
    for (let item of order.items) {
      await ProductVariant.findByIdAndUpdate(item.productVariantId, {
        quantity: { $inc: item?.quantity },
      });
    }
    order.status = "failed";
    await order.save();
  }
};
