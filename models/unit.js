const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
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
    unitName: {
      type: String,
      required: true,
    },
    unitCode: {
      type: String,
      required: true,
    },
    defaultValue: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("unit", unitSchema);
