const axios = require("axios");
const CartItem = require("../models/CartItem");

// ➕ POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, qty = 1 } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId required" });
    }

    // ✅ Fetch product details directly from Fake Store API
    const { data: product } = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ✅ Check if item already in cart
    let existingItem = await CartItem.findOne({ userId, productId });

    if (existingItem) {
      existingItem.qty += qty;
      await existingItem.save();
      return res.json(existingItem);
    }

    // ✅ Create new cart item
    const newItem = await CartItem.create({
      userId,
      productId,
      name: product.title, // note: Fake Store uses 'title'
      price: product.price,
      image: product.image,
      qty,
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error("❌ addToCart error:", err.message);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

// 🛒 GET /api/cart?userId=mockUser1
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const items = await CartItem.find({ userId });
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    res.json({ items, total });
  } catch (err) {
    console.error("❌ getCart error:", err);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

// ❌ DELETE /api/cart/:id
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CartItem.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Item not found in cart" });

    res.json({ message: "Item removed successfully" });
  } catch (err) {
    console.error("❌ removeFromCart error:", err);
    res.status(500).json({ message: "Server error while removing item" });
  }
};

// 💳 POST /api/checkout
exports.checkout = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const items = await CartItem.find({ userId });
    if (!items.length)
      return res.status(400).json({ message: "Cart is empty" });

    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const receipt = { total, timestamp: new Date(), items };

    await CartItem.deleteMany({ userId });

    res.json({ message: "Checkout successful", receipt });
  } catch (err) {
    console.error("❌ checkout error:", err);
    res.status(500).json({ message: "Server error during checkout" });
  }
};
