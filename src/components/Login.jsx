import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("Users"));

    if (storedUser?.email === email && storedUser?.password === password) {
      setAuthUser(storedUser);
      navigate("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-10 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl mb-5 text-center dark:text-white">Login</h1>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-700 dark:text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-600 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-slate-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 transition"
        >
          Login
        </button>
        <p className="text-center mt-4 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
