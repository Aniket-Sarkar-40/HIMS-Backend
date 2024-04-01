const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    createdBy: String,
    lastUpdatedDate: {
      type: Date,
      default: Date.now(),
    },
    lastUpdatedBy: String,
    itemName: {
      type: String,
      required: true,
    },
    itemCode: {
      type: String,
      required: true,
    },
    itemCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "itemCategory",
      required: true,
    },
    unit: {
      type: mongoose.Schema.ObjectId,
      ref: "unit",
      required: true,
    },
    isBatchNoRequired: {
      type: Boolean,
      default: false,
    },
    isExpiryDateRequired: {
      type: Boolean,
      default: false,
    },
    isReturnable: {
      type: Boolean,
      default: false,
    },
    description: String,
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("item", itemSchema);
