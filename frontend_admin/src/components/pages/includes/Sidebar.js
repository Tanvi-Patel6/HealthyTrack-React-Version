import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUtensils,
  FaCog,
  FaTachometerAlt,
  FaBars,
   FaHeartbeat,
   FaInbox,
   FaWpforms,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Users", icon: <FaUsers />, path: "/users" },
     { name: "Admins", icon: <FaUsers />, path: "/admins" },
      { name: "Forms", icon: <FaWpforms />, path: "/forms" },
    { name: "Meals", icon: <FaUtensils />, path: "/meals" },
     { name: "List Meals", icon: <FaUtensils />, path: "/listmeals" },
       { name: "Message Center", icon: <FaInbox />, path: "/messagecenter" },
     { name: "Setting", icon: <FaCog />, path: "/setting" },
  ];


   const handleLogout = () => {
    // Example: clear localStorage or auth tokens
    localStorage.clear();
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <FaHeartbeat className="header-icon" />
          {!collapsed && <h2>HealthyTrack</h2>}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
      </div>
     <ul className="sidebar-menu">
  {menuItems.map((item, index) => {
    const isActive = location.pathname === item.path;

    return (
      <li key={index}>
        <div className={`menu-item ${isActive ? "active" : ""}`}>
          <Link to={item.path} className="link">
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="text">{item.name}</span>}
          </Link>
        </div>
      </li>
    );
  })}
</ul>


       {/* Logout Button */}
      <div className="sidebar-logout" onClick={handleLogout}>
        <FaCog className="icon" />
        {!collapsed && <span className="text">Logout</span>}
      </div>
    </div>
  );
}

export default Sidebar;

