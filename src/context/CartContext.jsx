import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

export const CartContext = createContext();


export default function CartProvider({ children }) {
  const [authUser] = useAuth();
  const [cart, setCart] = useState([]);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (!authUser?.email) {
        setCart([]);
        return;
      }
      try {
        const res = await fetch("/api/cart", {
          headers: { "x-user-email": authUser.email },
        });
        if (res.ok) {
          const data = await res.json();
          // Each item: { book, quantity }
          setCart(data.map(item => ({ ...item.book, quantity: item.quantity })));
        } else {
          setCart([]);
        }
      } catch {
        setCart([]);
      }
    };
    fetchCart();
  }, [authUser]);

  // Add to cart (backend)
  const addToCart = async (book) => {
    if (!authUser?.email) return;
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": authUser.email,
        },
        body: JSON.stringify({ bookId: book._id, quantity: 1 }),
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data.map(item => ({ ...item.book, quantity: item.quantity })));
      }
    } catch {}
  };

  // Remove from cart (backend)
  const removeFromCart = async (id) => {
    if (!authUser?.email) return;
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": authUser.email,
        },
        body: JSON.stringify({ bookId: id }),
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data.map(item => ({ ...item.book, quantity: item.quantity })));
      }
    } catch {}
  };

  // Clear cart (backend)
  const clearCart = async () => {
    if (!authUser?.email) return;
    try {
      const res = await fetch("/api/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": authUser.email,
        },
      });
      if (res.ok) {
        setCart([]);
      }
    } catch {}
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
