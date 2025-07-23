import React, { useState } from "react";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message || "Check your email for reset link (see backend console in demo)");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-md w-full">
        <button className="absolute top-2 right-2" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-2">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input w-full mb-2"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">Send Reset Link</button>
        </form>
        {message && <div className="mt-2 text-center text-green-500">{message}</div>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
