import React, { useState, useContext } from "react";
import { useCart } from "../context/CartContext";
import BookModal from "./BookModal";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border transition-transform cursor-pointer" onClick={() => navigate(`/book/${item._id}`)}>
        <figure className="bg-gray-100 rounded-t-lg p-2 flex justify-center items-center min-h-[250px]">
          <img
            src={item.image}
            alt={item.title}
            className="h-60 object-contain rounded"
          />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title text-xl font-bold mb-3">{item.title}</h2>
          <div className="flex justify-between items-center mb-3">
            <span className="badge badge-primary text-lg font-extrabold px-4 py-2">
              ${item.price}
            </span>
            <button
              className="btn btn-pink rounded-full shadow-md transition-transform transform hover:scale-105"
              onClick={e => { e.stopPropagation(); addToCart(item); }}
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
