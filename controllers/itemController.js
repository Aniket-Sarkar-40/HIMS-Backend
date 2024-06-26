const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");
const Unit = require("../models/unit");

exports.createItem = catchAsyncError(async (req, res, next) => {
  const { itemCategory, unit } = req.body;
  const category = await Category.findOne({ id: parseInt(itemCategory) });
  const unitDetails = await Unit.findOne({ id: parseInt(unit) });
  req.body.itemCategory = category._id;
  req.body.unit = unitDetails._id;

  const item = await Item.create(req.body);

  res.status(200).json({
    result: "S",
    responseCode: "F0007",
    apiResponseMessage: "Data Saved Successfully",
    portalResponseMessage: "Data Saved Successfully",
    response: {
      items: item,
    },
    status: "OK",
  });
});

//*Get All Item
exports.getAllItem = catchAsyncError(async (req, res) => {
  const Items = await Item.find()
    .populate({
      path: "itemCategory",
      model: Category,
    })
    .populate({
      path: "unit",
      model: Unit,
    });

  res.status(200).json({
    result: "S",
    responseCode: "F0006",
    apiResponseMessage: "Data Found",
    portalResponseMessage: "Data Found",
    response: {
      currentPageNumber: 1,
      lastPageNumber: 2,
      pageSize: 10,
      totalRecords: Items.length,
      data: Items,
    },
    status: "OK",
  });
});

//*Get a Item
exports.getItemById = catchAsyncError(async (req, res) => {
  const Items = await Item.findOne({ id: req.params.id })
    .populate({
      path: "itemCategory",
      model: Category,
    })
    .populate({
      path: "unit",
      model: Unit,
    });

  res.status(200).json({
    result: "S",
    responseCode: "F0006",
    apiResponseMessage: "Data Found",
    portalResponseMessage: "Data Found",
    response: Items,
    status: "OK",
  });
});
