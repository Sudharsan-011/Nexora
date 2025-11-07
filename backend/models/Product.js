const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // friendly product id like 'p1'
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
