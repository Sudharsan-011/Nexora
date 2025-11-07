const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  email: String,
  items: [{ productId: String, name: String, price: Number, qty: Number }],
  total: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Receipt", ReceiptSchema);
