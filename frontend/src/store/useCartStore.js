import { create } from "zustand";
import API from "../api";
import { toast } from "react-toastify";
export const useCartStore = create((set, get) => ({
  products: [],
  cart: [],
  total: 0,
  userId: "mockUser2",

  // 🛍 Fetch products
  fetchProducts: async () => {
    try {
      const res = await API.get("/products");
      set({ products: res.data });
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  },

  fetchCart: async () => {
    const userId = get().userId;
    try {
      const res = await API.get(`/cart?userId=${userId}`);
      set({ cart: res.data.items, total: res.data.total });
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  },

  // ➕ Add to cart
  addToCart: async (product) => {
    const userId = get().userId;
    try {
      // product.id is a number from Fake Store API
      await API.post("/cart", { userId, productId: product.id, qty: 1 });
      toast.success("✅ Item added to cart!");
      await get().fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  },

  // ➖ Remove from cart
  removeFromCart: async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      await get().fetchCart();
    } catch (err) {
      console.error(
        "Error removing from cart:",
        err.response?.data || err.message
      );
    }
  },

  // 💳 Checkout (mock)
  checkout: async () => {
    const userId = get().userId;
    try {
      const res = await API.post("/cart/checkout", { userId });
      const receipt = res.data.receipt;
      localStorage.setItem("lastReceipt", JSON.stringify(receipt));

      set({ cart: [], total: 0 });
      return true;
    } catch (err) {
      console.error(
        "Error during checkout:",
        err.response?.data || err.message
      );
      return false;
    }
  },
}));
