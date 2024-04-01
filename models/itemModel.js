const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    id: Number,
    createdDate: Date,
    createdBy: String,
    lastUpdatedDate: Date,
    lastUpdatedBy: String,
    itemName: String,
    itemCode: String,
    itemCategory: {
      id: Number,
      createdDate: String,
      createdBy: String,
      lastUpdatedDate: String,
      lastUpdatedBy: String,
      itemCategory: String,
      description: String,
      isLocked: Boolean,
      isDeleted: Boolean,
    },
    unit: {
      id: Number,
      createdDate: String,
      createdBy: String,
      lastUpdatedDate: String,
      lastUpdatedBy: String,
      unitName: String,
      unitCode: String,
      defaultValue: String,
      isDeleted: Boolean,
    },
    isBatchNoRequired: Boolean,
    isExpiryDateRequired: Boolean,
    isReturnable: Boolean,
    description: String,
    quantity: {
      type: Number,
      default: 0,
    },
    price: Number,
    sellingPrice: Number,
    isLocked: Boolean,
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("item", itemSchema);
