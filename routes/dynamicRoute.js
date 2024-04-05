const express = require("express");
const {
  dynamicCreate,
  dynamicFetch,
  dynamicFetchById,
} = require("../controllers/dynamicController");
const router = express.Router();

router.post("/", dynamicCreate);
router.post("/get", dynamicFetch);
router.post("/get/:id", dynamicFetchById);

module.exports = router;
