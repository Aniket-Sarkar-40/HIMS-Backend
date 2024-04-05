const express = require("express");
const {
  createItem,
  getAllItem,
  getItemById,
} = require("../controllers/itemController");

const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItem);
router.get("/:id", getItemById);

module.exports = router;
