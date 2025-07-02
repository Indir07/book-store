import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";

function Navbar() {
  const [authUser] = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div>
        <Link to="/" className="text-xl font-bold text-pink-500">
          BookStore
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-pink-500">
          Home
        </Link>
        <Link to="/course" className="hover:text-pink-500">
          Courses
        </Link>
        {authUser ? (
          <>
            <span className="text-gray-700">
              {authUser.name || authUser.username}
            </span>
            <Logout />
          </>
        ) : (
          <>
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-gray-200 text-pink-500 px-4 py-2 rounded hover:bg-pink-100"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
