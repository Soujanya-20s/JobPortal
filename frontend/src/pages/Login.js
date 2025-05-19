import React, { useState } from "react";
import axios from "axios";
import "./StylePage.css"; 

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9090/auth/login", formData);
      setMessage("✅ Login successful!");

      // Simulate fetching user ID after login
      const userRes = await axios.get(`http://localhost:9090/users/name/${formData.name}`);
      onLogin(userRes.data.userId);
    } catch (err) {
      setMessage("❌ Login failed: " + (err.response?.data || ""));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 className="auth-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Username"
            required
            className="form-control mb-3"
          />

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="form-control mb-3"
          />

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {message && (
          <p className={message.startsWith("✅") ? "text-success mt-3" : "text-danger mt-3"}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
