const express = require("express");
const {
  createCategory,
  getAllCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/", createCategory);
router.post("/get", getAllCategory);

module.exports = router;
