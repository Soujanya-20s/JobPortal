
import React, { useState } from "react";
import axios from "axios";
import "./StylePage.css";  

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9090/auth/register", formData);
      setMessage("✅ Registration successful! Please login.");
    } catch (err) {
      setMessage("❌ Registration failed: " + (err.response?.data || ""));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 className="auth-heading">Register</h2>
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
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select mb-3"
          >
            <option value="USER">User</option>
      
          </select>
          

          <button type="submit" className="btn btn-primary w-100">
            Register
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

export default RegisterPage;
