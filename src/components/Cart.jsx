import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div id="cart" className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty.</p>
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
      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold">Total: ${cart.reduce((sum, b) => sum + (b.price || 0), 0).toFixed(2)}</span>
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
