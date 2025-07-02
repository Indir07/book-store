import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [authUser] = useAuth();

  return (
    <div className="navbar bg-base-100 dark:bg-slate-800 dark:text-white">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-pink-500">
          DevBookStore
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {authUser ? (
            <>
              <li className="flex items-center">
                <span>{authUser.name}</span>
              </li>
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-pink-500">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-pink-500">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
