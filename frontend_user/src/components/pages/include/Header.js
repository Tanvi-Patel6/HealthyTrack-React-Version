import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';


function Header() {

  const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));
const username = user ? user.username : "Guest";

 const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokenStore");
    navigate("/");
  };
  

  return (
     <nav className="header">
      {/* Top Row */}
      <div className="navbar-top">
        <div className="brand">🥗 HealthyTrack - <small>Diet & Nutrition Tracker</small></div>
        <div className="user">
         👤 Welcome,   <strong>{username}!</strong>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="navbar-bottom">
        <div className="header-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/body_type">BodyType Form</Link>
          <Link to="/mealplans">Meals</Link>
          <Link to="/tipspage">Tips</Link>
          <Link to="/profilepage">Profile</Link>
        </div>
        <div className="logout">
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
