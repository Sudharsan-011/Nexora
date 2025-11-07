const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // mock user
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CartItem", CartItemSchema);
