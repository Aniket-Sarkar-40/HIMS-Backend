const mongoose = require("mongoose");

const itemCategorySchema = new mongoose.Schema(
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
    itemCategory: {
      type: String,
      required: true,
    },
    description: String,
    isLocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("itemCategory", itemCategorySchema);
