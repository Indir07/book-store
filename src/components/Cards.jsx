import React from "react";
import { useCart } from "../context/CartContext";

function Cards({ item }) {
  const { addToCart } = useCart();
  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={item.image} alt={item.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.title}
            {item.category && (
              <div className="badge badge-secondary">{item.category}</div>
            )}
          </h2>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <button
              className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
