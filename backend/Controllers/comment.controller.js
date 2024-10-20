import jwt from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import Product from "../Models/product.model.js";
import User from "../Models/user.model.js";
import Comment from "../Models/comment.model.js";

export const getProductComment = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;
  const comments = await Comment.find({ productId, isPublish: true }).populate({
    path: "userId",
    select: "fullName _id",
  });
  return res.status(200).json({
    success: true,
    data: comments,
  });
});

export const getAllComment = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req.query)
    .filters()
    .sort()
    .populate()
    .limitFields()
    .paginate();
  const comments = await features.model;
  return res.status(200).json({
    success: true,
    data: comments,
  });
});

export const isPublish = catchAsync(async (req, res, next) => {
  const { id: commentId } = req.params;
  const comments = await Comment.findByIdAndUpdate(
    commentId,
    { isPublish: true },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: {
      en: "Comment published",
      fa: "کامنت تایید شد",
    },
    data: comments,
  });
});

export const replyComment = catchAsync(async (req, res, next) => {
  const { id: commentId } = req.params;
  const { content = "" } = req.body;
  const comments = await Comment.findByIdAndUpdate(
    commentId,
    { $push: { reply: { content, fullName: "Admin" } } },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    data: comments,
  });
});

export const removeComment = catchAsync(async (req, res, next) => {
  const { id: commentId } = req.params;
  await Comment.findByIdAndDelete(commentId);
  return res.status(200).json({
    success: true,
    message: {
      en: "Comment deleted",
      fa: "کامنت حذف شد",
    },
  });
});

export const createComment = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;
  let comments;
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  const user = await User.findById(id);

  if (req.body?.rating && user.boughtProduct.includes(productId)) {
    comments = await Comment.create({ productId, userId: id, ...req.body });

    const product = await Product.findById(productId);
    let count = product.ratingCount;
    let totalRate = count * product.rating;
    totalRate += req.body?.rating;
    product.ratingCount += 1;
    product.rating = +(totalRate / product.ratingCount).toFixed(2);
    product.save();
  } else {
    comments = await Comment.create({
      productId,
      userId: id,
      content: req.body.content,
    });
  }
  return res.status(200).json({
    success: true,
    message: {
      en: "Comment sent",
      fa: "کامنت ارسال شد",
    },
    data: comments,
  });
});
