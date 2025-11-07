import React from "react";
import { useCartStore } from "../store/useCartStore";

function ProductList() {
  const { products, addToCart } = useCartStore();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl shadow hover:shadow-lg p-4 transition duration-200"
        >
          <img
            src={p.image}
            alt={p.name}
            className="h-48 w-full object-contain mb-4"
          />
          <h3 className="font-semibold text-lg">{p.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{p.category}</p>
          <p className="font-bold mb-3">₹{p.price}</p>
          <button
            onClick={() => addToCart(p)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
