import React from "react";
import { useCart } from "../context/CartContext";

import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [authUser] = useAuth();
  const [buying, setBuying] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    setBuying(true);
    setMessage("");
    try {
      const res = await fetch("/api/cart/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": authUser?.email,
        },
      });
      if (res.ok) {
        setMessage("Purchase successful! Thank you for your order.");
        clearCart();
      } else {
        setMessage("Purchase failed. Try again.");
      }
    } catch {
      setMessage("Purchase failed. Try again.");
    }
    setBuying(false);
  };

  if (cart.length === 0) {
    return (
      <div id="cart" className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty.</p>
        {message && <div className="mt-2 text-green-600">{message}</div>}
      </div>
    );
  }

  return (
    <div id="cart" className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="divide-y divide-gray-200">
        {cart.map((item) => (
          <li key={item._id || item.title} className="py-2 flex items-center justify-between">
            <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded mr-3" />
            <span className="flex-1">{item.title}</span>
            <span>${item.price}</span>
            <button
              className="ml-4 text-red-500 hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <span className="font-bold">Total: ${cart.reduce((sum, b) => sum + (b.price || 0), 0).toFixed(2)}</span>
        <div className="flex gap-2">
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleBuy}
            disabled={buying}
          >
            {buying ? "Processing..." : "Buy"}
          </button>
        </div>
      </div>
      {message && <div className="mt-2 text-green-600">{message}</div>}
    </div>
  );
}

export default Cart;
