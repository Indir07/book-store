import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Password reset successful. You can now login.");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMessage(data.message || "Error resetting password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="input w-full mb-2"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">Reset</button>
      </form>
      {message && <div className="mt-2 text-center text-red-500">{message}</div>}
    </div>
  );
};

export default ResetPassword;
