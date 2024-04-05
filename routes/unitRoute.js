const express = require("express");
const { createUnit, getAllUnit } = require("../controllers/unitController");

const router = express.Router();

router.post("/", createUnit);
router.get("/", getAllUnit);

module.exports = router;
