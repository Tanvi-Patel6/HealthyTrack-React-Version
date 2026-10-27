import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { useEffect } from "react";

function Register() {
  useEffect(() => {
    document.title = "HealthyTrack | Register ";
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      alert(res.data.msg);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg);
      } else {
        alert("Something went wrong!");
      }
    }
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "* Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "* Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "* Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "* Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "* Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "* Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <form onSubmit={handleSubmit} className="registration-form">
          <h2> Registration </h2>
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="UserName"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <i className="bi bi-person"></i>
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <i className="bi bi-envelope"></i>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i className="bi bi-lock"></i>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <p className="footer">Forgot Password ?</p>
          <button type="submit">Register</button>
          <p className="footer">
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
