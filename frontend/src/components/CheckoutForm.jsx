import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";

export default function CheckoutForm({ onReceipt }) {
  const checkout = useCartStore((state) => state.checkout);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    const success = await checkout();
    setLoading(false);

    if (success) {
      // mock frontend receipt
      const receipt = JSON.parse(localStorage.getItem("lastReceipt")) || null;
      onReceipt(receipt);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-xl space-y-3 max-w-sm mx-auto"
    >
      <h2 className="text-lg font-semibold text-center mb-2">Checkout</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border rounded w-full p-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border rounded w-full p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
    </form>
  );
}
