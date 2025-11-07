// import React, { useEffect } from "react";
// import { useCartStore } from "../store/useCartStore";

// function CartModal({ onClose }) {
//   const { cart, removeFromCart, checkout } = useCartStore();
//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   // prevent background scroll
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const handleCheckout = async () => {
//     const success = await checkout();
//     if (success) {
//       alert("Checkout successful!");
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl font-bold mb-4 text-center">Your Cart 🛒</h2>

//         {cart.length === 0 ? (
//           <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
//         ) : (
//           <>
//             <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
//               {cart.map((item) => (
//                 <li key={item._id || item.id} className="flex justify-between py-2">
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       ₹{item.price} × {item.qty}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-4 flex justify-between font-semibold">
//               <span>Total:</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>

//             <button
//               onClick={handleCheckout}
//               className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
//             >
//               Checkout
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CartModal;

import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";

function CartModal({ onClose }) {
  const { cart, removeFromCart, checkout } = useCartStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [step, setStep] = useState("cart"); // 'cart' | 'checkout' | 'receipt'
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please fill out all fields");
      return;
    }

    const success = await checkout();
    if (success) {
      const receiptData = JSON.parse(localStorage.getItem("lastReceipt"));
      setReceipt(receiptData);
      setStep("receipt");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        {step === "cart" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Your Cart 🛒</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
            ) : (
              <>
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <li key={item._id || item.id} className="flex justify-between py-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ₹{item.price} × {item.qty}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setStep("checkout")}
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </>
        )}

        {step === "checkout" && (
          <form onSubmit={handleCheckout} className="space-y-4">
            <h2 className="text-2xl font-bold mb-2 text-center">Checkout 🧾</h2>

            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border p-2 rounded w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Confirm & Checkout
            </button>

            <button
              type="button"
              onClick={() => setStep("cart")}
              className="w-full border py-2 rounded mt-2 hover:bg-gray-100"
            >
              Back to Cart
            </button>
          </form>
        )}

        {step === "receipt" && receipt && (
          <div>
            <h2 className="text-2xl font-bold mb-3 text-center">Receipt ✅</h2>
            <p className="text-sm text-gray-600 text-center mb-3">
              {new Date(receipt.timestamp).toLocaleString()}
            </p>
            <ul className="divide-y divide-gray-200 max-h-40 overflow-y-auto">
              {receipt.items.map((i) => (
                <li key={i._id} className="flex justify-between py-1 text-sm">
                  <span>{i.name}</span>
                  <span>x{i.qty}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg font-semibold text-center">
              Total: ₹{receipt.total.toFixed(2)}
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
