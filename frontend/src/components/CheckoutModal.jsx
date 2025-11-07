import React from "react";

function CheckoutModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
        <h3 className="text-xl font-semibold mb-2">Checkout Successful 🎉</h3>
        <p>Your order has been placed successfully!</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CheckoutModal;
