import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthUser(undefined);
    localStorage.removeItem("Users");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
    >
      Logout
    </button>
  );
}

export default Logout;
