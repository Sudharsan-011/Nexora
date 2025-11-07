import React from "react";

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-3 text-center">🧾 Checkout Receipt</h2>
        <p><strong>Total:</strong> ${receipt.total.toFixed(2)}</p>
        <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>

        <ul className="mt-3 border-t pt-2 space-y-1">
          {receipt.items.map((item) => (
            <li key={item._id} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>x{item.qty}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
