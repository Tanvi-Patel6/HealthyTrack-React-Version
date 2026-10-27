import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useEffect } from "react";

function Login() {
  useEffect(() => {
    document.title = "HealthyTrack | Login ";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); //initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        formData
      );
      alert("Login successful!");

      localStorage.setItem("tokenStore", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.userId,
          username: res.data.name,
          email: res.data.email,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h2> Login </h2>

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
          </div>

          <p className="footer">Forgot Password ?</p>
          <button type="submit">Login</button>
          <p className="footer">
            Not Registered? <Link to="/register">Registered</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
