const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Category = require("../models/categoryModel");

exports.createCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(200).json({
    success: true,
    category,
    message: "Category created successfully.",
  });
});

//*Get All Category
exports.getAllCategory = catchAsyncError(async (req, res) => {
  const allCategory = await Category.find();

  res.status(200).json({
    success: true,
    category: allCategory,
  });
});
