const express = require("express");
const { createItem, getAllItem } = require("../controllers/itemController");
const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItem);

module.exports = router;
