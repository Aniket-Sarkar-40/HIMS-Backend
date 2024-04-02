const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Unit = require("../models/unit");

exports.createUnit = catchAsyncError(async (req, res, next) => {
  const unit = await Unit.create(req.body);

  res.status(200).json({
    success: true,
    unit,
    message: "Unit created successfully.",
  });
});

//*Get All Unit
exports.getAllUnit = catchAsyncError(async (req, res) => {
  const allUnit = await Unit.find();

  res.status(200).json({
    success: true,
    unit: allUnit,
  });
});
