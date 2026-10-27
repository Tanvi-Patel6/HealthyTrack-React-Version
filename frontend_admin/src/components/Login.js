import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { useEffect } from "react";

function Login() {

  useEffect(() => {
        document.title = "HealthyTrack | Admin-Login ";
      }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/admin/login", formData);
      alert("Login successful!");
    

      localStorage.setItem("tokenStore", res.data.token);
      localStorage.setItem("admin", JSON.stringify({
      id: res.data.admin._id,
      username: res.data.admin.username,
      email: res.data.admin.email
    }));
      
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
   <div className="login-container">
          <div className="form-box-login">
             <h1>Admin (Login)</h1>
             <form onSubmit={handleSubmit}>
               <div className="input-box-login">
                 <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={formData.email} 
                    onChange={handleChange} required 
                 />
               </div>
               <div className="input-box-login">
                 <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    value={formData.password} 
                    onChange={handleChange} required 
                 />
               </div>
               <div className="option">
                   <a href="#">Forogot Password?</a>
               </div>
               <button type="submit" className="btn">Login</button><br/><br/>
               <p className="below">Not Register then click here ? <Link to="/">Register</Link></p>
             </form>
          </div>
       </div>
  );
}

export default Login;
    