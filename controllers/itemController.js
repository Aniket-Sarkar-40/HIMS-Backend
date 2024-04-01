const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Item = require("../models/itemModel");

exports.createItem = catchAsyncError(async (req, res, next) => {
  const item = await Item.create(req.body);

  res.status(200).json({
    success: true,
    Item: item,
    message: "Item created successfully.",
  });
});

//*Get All Item
exports.getAllItem = catchAsyncError(async (req, res) => {
  const Items = await Item.find();

  res.status(200).json({
    success: true,
    Items: Items,
  });
});

//*Get a Item
exports.getItemById = catchAsyncError(async (req, res) => {
  const Items = await Item.findOne({ id: req.body.id });

  res.status(200).json({
    result: "S",
    responseCode: "F0006",
    apiResponseMessage: "Data Found",
    portalResponseMessage: "Data Found",
    response: Items,
    status: "OK",
  });
});
