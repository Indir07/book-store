import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";


function UserInfoPopover({ authUser, show, anchorRef, onClose }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!show) return;
    function handleClick(e) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [show, onClose, anchorRef]);

  if (!show) return null;
  return (
    <div
      ref={popoverRef}
      className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50 p-4 text-left"
    >
      <div className="mb-2 font-semibold">User Info</div>
      <div className="text-sm text-gray-700">Name: {authUser.fullname || authUser.name || authUser.username}</div>
      <div className="text-sm text-gray-700">Email: {authUser.email}</div>
    </div>
  );
}

function Navbar() {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const userIconRef = useRef(null);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleUserIconClick = () => {
    setShowUserInfo((prev) => !prev);
  };

  const handleClosePopover = () => {
    setShowUserInfo(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 shadow">
      <div>
        <Link to="/" className="text-xl font-bold text-pink-500">
          BookStore
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Dark/Light mode toggle */}
        <button
          className="focus:outline-none flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? (
            // Moon icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          ) : (
            // Sun icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.05 6.05L4.64 4.64m12.02 0l-1.41 1.41M6.05 17.95l-1.41 1.41" />
            </svg>
          )}
        </button>
        <Link to="/" className="hover:text-pink-500">
          Home
        </Link>
        <Link to="/cart" className="relative hover:text-pink-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0l1.7 6.385m-.383-7.822L6.75 7.5m0 0h10.5m-10.5 0l1.7 6.385m8.8-6.385l1.7 6.385m-1.7-6.385l.383-1.437A1.125 1.125 0 0 1 20.364 3h1.386m-2.25 4.5h-13.5m13.5 0l-1.7 6.385m-8.8-6.385l-1.7 6.385m0 0A2.25 2.25 0 0 0 6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25v-7.365a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v7.365A2.25 2.25 0 0 0 6.75 19.5z" />
          </svg>
          <span className="ml-1 inline-block bg-pink-500 text-white text-xs rounded-full px-2">
            {cart.length}
          </span>
        </Link>
        {authUser ? (
          <>
            <div className="relative flex items-center">
              <button
                ref={userIconRef}
                className="flex items-center text-gray-700 focus:outline-none"
                onClick={handleUserIconClick}
                aria-label="Show user info"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                </svg>
                <span className="hidden md:inline">{authUser.fullname || authUser.name || authUser.username}</span>
              </button>
              <UserInfoPopover
                authUser={authUser}
                show={showUserInfo}
                anchorRef={userIconRef}
                onClose={handleClosePopover}
              />
            </div>
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
