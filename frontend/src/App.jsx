import React, { useEffect, useState } from "react";
import { useCartStore } from "./store/useCartStore";
import ProductList from "./components/ProductList";
import CartModal from "./components/CartModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { fetchProducts, fetchCart } = useCartStore();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [fetchProducts, fetchCart]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold tracking-tight">🛍️ Mock E-Com</h1>
        <button
          onClick={() => setShowCart(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Cart
        </button>
      </header>

      {/* Product Grid */}
      <main className="p-8">
        <ProductList />
      </main>

      {/* Cart Modal */}
      {showCart && <CartModal onClose={() => setShowCart(false)} />}

             <ToastContainer position="top-right" autoClose={2000} />
 
    </div>
  );
}

export default App;
