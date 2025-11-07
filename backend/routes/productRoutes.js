const express = require("express");
const {
  getProducts,
  seedProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
module.exports = router;
