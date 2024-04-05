const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Category = require("../models/categoryModel");
const { client, dbName } = require("../config/dbDriver");
const { Short_Code_To_Collection } = require("../utils/shortCodeToCollection");
const { ObjectId } = require("mongodb");

const db = client.db(dbName);

const configJson = {
  formName: "Inventory Common",
  formCol: "3",
  shortCode: "INV-ITM",
  uri: "",
  service: "",
  controls: [
    {
      divLabel: "Item List",
      divOrder: 1,
      divBootstrap: "",
      fields: [
        {
          type: "text",
          order: 1,
          uniqueFieldName: "itemName",
          label: { name: "Item" },
          validators: { required: true },
          value: { multiValue: [] },
          masterData: { tableName: "", key: "", value: "" },
        },
        {
          type: "text",
          order: 2,
          uniqueFieldName: "itemCode",
          label: { name: "Item Code" },
          validators: { required: true },
          value: { multiValue: [] },
          masterData: { tableName: "", key: "", value: "" },
        },
        {
          type: "masterdropdown",
          order: 3,
          uniqueFieldName: "itemCategoryId",
          label: { name: "Item Category" },
          validators: { required: true },
          value: {
            multiValue: [
              { key: "31", value: "Instrument" },
              { key: "32", value: "Liquid" },
              { key: "37", value: "Test Gopit" },
              { key: "39", value: "Surgical 2" },
              { key: "30", value: "Stationary" },
              { key: "41", value: "REAGENT" },
              { key: "42", value: "test 1" },
              { key: "40", value: "Mu new Category" },
              { key: "29", value: "Surgical" },
            ],
          },
          masterData: {
            tableName: "category",
            key: "_id",
            value: "itemCategory",
          },
        },
        {
          type: "masterdropdown",
          order: 4,
          uniqueFieldName: "unitId",
          label: { name: "Unit" },
          validators: { required: true },
          value: {
            multiValue: [
              { key: "13", value: "Test001Update" },
              { key: "17", value: "UNIT007" },
              { key: "20", value: "ITEM 007" },
              { key: "21", value: "cms" },
              { key: "22", value: "Piece" },
              { key: "24", value: "NUd2" },
              { key: "25", value: "NUd3" },
              { key: "26", value: "TEST008" },
            ],
          },
          masterData: {
            tableName: "unit",
            key: "_id",
            value: "unit",
          },
        },
        {
          type: "number",
          order: 5,
          uniqueFieldName: "price",
          label: { name: "BasePrice" },
          validators: { required: true },
          value: { multiValue: [] },
          masterData: { tableName: "", key: "", value: "" },
        },
        {
          type: "number",
          order: 6,
          uniqueFieldName: "sellingPrice",
          label: { name: "Selling Price" },
          validators: { required: true },
          value: { multiValue: [] },
          masterData: { tableName: "", key: "", value: "" },
        },
        {
          type: "textarea",
          order: 10,
          uniqueFieldName: "description",
          label: { name: "item Description" },
          validators: { required: false },
          value: { multiValue: [] },
          masterData: { tableName: "", key: "", value: "" },
        },
        {
          type: "radio",
          order: 11,
          uniqueFieldName: "isBatchNoRequired",
          label: { name: "Batch No" },
          validators: { required: true },
          value: {
            multiValue: [
              { key: "Yes", value: "true" },
              { key: "No", value: "false" },
            ],
          },
          masterData: { tableName: "", key: "", value: "" },
        },
        {
          type: "radio",
          order: 12,
          uniqueFieldName: "isExpiryDateRequired",
          label: { name: "Expiry Date" },
          validators: { required: true },
          value: {
            multiValue: [
              { key: "Yes", value: "true" },
              { key: "No", value: "false" },
            ],
          },
          masterData: { tableName: "", key: "", value: "" },
        },
        {
          type: "radio",
          order: 13,
          uniqueFieldName: "isReturnable",
          label: { name: "Returnable" },
          validators: { required: true },
          value: {
            multiValue: [
              { key: "Yes", value: "true" },
              { key: "No", value: "false" },
            ],
          },
          masterData: { tableName: "", key: "", value: "" },
        },
      ],
    },
  ],
};

exports.dynamicCreate = catchAsyncError(async (req, res, next) => {
  // const category = await Category.create(req.body);

  const allFields = configJson?.controls?.map((c) => {
    return c.fields;
  });
  const flatFields = allFields.flat(1);

  const data = flatFields.filter((f) => f.type === "masterdropdown");
  const shortCode = req.body.short_code;
  const collection = Short_Code_To_Collection[shortCode];
  const categoryCollection = db.collection(collection);
  data.forEach((doc) => {
    req.body.data[doc.uniqueFieldName] = new ObjectId(
      req.body.data[doc.uniqueFieldName]
    );
  });
  const response = await categoryCollection.insertOne(req.body.data);

  res.status(200).json({
    success: true,
    response,
    message: "Category created successfully.",
  });
});

//*Get All Category
exports.dynamicFetch = catchAsyncError(async (req, res, next) => {
  // const category = await Category.create(req.body);
  const allFields = configJson?.controls?.map((c) => {
    return c.fields;
  });
  const flatFields = allFields.flat(1);

  const data = flatFields.filter((f) => f.type === "masterdropdown");

  let queryArray = [];
  const shortCode = req.body.short_code;

  if (shortCode === "ITM") {
    data.forEach((field) => {
      queryArray.push({
        $lookup: {
          from: field.masterData.tableName,
          localField: field.uniqueFieldName,
          foreignField: field.masterData.key,
          as: field.masterData.value,
        },
      });
      queryArray.push({
        $set: {
          [`${field.masterData.value}`]: {
            $arrayElemAt: [`$${field.masterData.value}`, 0],
          },
        },
      });
    });
  }

  const collection = Short_Code_To_Collection[shortCode];
  const categoryCollection = db.collection(collection);
  const response = await categoryCollection
    .aggregate(
      // [
      // {
      //   $lookup: {
      //     from: "category",
      //     localField: "itemCategoryId",
      //     foreignField: "_id",
      //     as: "itemCategory",
      //   },
      // },
      // {
      //   $lookup: {
      //     from: "unit",
      //     localField: "unitId",
      //     foreignField: "_id",
      //     as: "unit",
      //   },
      // },
      // {
      //   $set: {
      //     itemCategory: { $arrayElemAt: ["$itemCategory", 0] },
      //   },
      // },
      // {
      //   $set: {
      //     unit: { $arrayElemAt: ["$unit", 0] },
      //   },
      // },
      // ]
      queryArray
    )
    .toArray();

  let isError = false;
  let id;
  if (shortCode === "ITM") {
    response.forEach((elem) => {
      data.forEach((item) => {
        if (elem[item.masterData.value] === undefined) {
          isError = true;
          id = item.masterData.value;
        }
      });
    });
  }
  if (isError) {
    return next(new ErrorHandler(`Invalid ${id} id provided`, 404));
  } else {
    res.status(200).json({
      success: true,
      response,
    });
  }
});

exports.dynamicFetchById = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const shortCode = req.body.short_code;

  const allFields = configJson?.controls?.map((c) => {
    return c.fields;
  });
  const flatFields = allFields.flat(1);

  const data = flatFields.filter((f) => f.type === "masterdropdown");

  let queryArray = [
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
  ];

  if (shortCode === "ITM") {
    data.forEach((field) => {
      queryArray.push({
        $lookup: {
          from: field.masterData.tableName,
          localField: field.uniqueFieldName,
          foreignField: field.masterData.key,
          as: field.masterData.value,
        },
      });
      queryArray.push({
        $set: {
          [`${field.masterData.value}`]: {
            $arrayElemAt: [`$${field.masterData.value}`, 0],
          },
        },
      });
    });
  }

  const collection = Short_Code_To_Collection[shortCode];
  const categoryCollection = db.collection(collection);

  const response = await categoryCollection.aggregate(queryArray).toArray();

  let isError = false;
  let Id = id;
  if (shortCode === "ITM") {
    response.forEach((elem) => {
      data.forEach((item) => {
        if (elem[item.masterData.value] === undefined) {
          isError = true;
          Id = item.masterData.value;
        }
      });
    });
  }
  if (isError || response.length === 0) {
    return next(new ErrorHandler(`Invalid ${Id} id provided`, 404));
  } else {
    res.status(200).json({
      success: true,
      response: response[0],
    });
  }
});
