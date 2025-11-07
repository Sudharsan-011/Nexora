const Product = require("../models/Product");

const axios = require("axios");

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    // Fetch products from Fake Store API
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    // Optional: map the fields to match your frontend structure
    const formattedProducts = products.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      image: p.image,
      description: p.description,
      category: p.category,
    }));

    res.json(formattedProducts);
  } catch (err) {
    console.error("Error fetching from Fake Store API:", err.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
