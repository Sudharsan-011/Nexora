const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  checkout,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", removeFromCart);
router.post("/checkout", checkout);

module.exports = router;
