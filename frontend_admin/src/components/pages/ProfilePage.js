import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: ""
  });

  // Load user info from localStorage
  useEffect(() => {

    document.title = "HealthyTrack | Profile Page ";

    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin({
        username: parsedAdmin.username || "",
        email: parsedAdmin.email || "",
        password: ""
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Update admin info
  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedAdmin = localStorage.getItem("admin");
    const token = localStorage.getItem("tokenStore");
    if (!storedAdmin || !token) return alert("Admin not logged in!");

    const { id } = JSON.parse(storedAdmin);

    try {
      const updateData = {
        username: admin.username,
        email: admin.email
      };

      if (admin.password) {
        updateData.password = admin.password;
      }

      await axios.put(`http://localhost:5000/admin/update/${id}`, updateData, {
        headers: { Authorization: token }
      });

      // Update localStorage user info
      localStorage.setItem(
        "admin",
        JSON.stringify({ id, username: admin.username, email: admin.email })
      );

      alert("✅ Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  // Delete user account
  const handleDelete = async () => {
    const storedAdmin = localStorage.getItem("admin");
    const token = localStorage.getItem("tokenStore");

    if (!storedAdmin || !token) return alert("Admin not logged in!");

    const { id } = JSON.parse(storedAdmin);

    if (window.confirm("⚠️ Are you sure you want to delete your account? This cannot be undone!")) {
      try {
        await axios.delete(`http://localhost:5000/admin/delete/${id}`, {
          headers: { Authorization: token }
        });

        localStorage.removeItem("tokenStore");
        localStorage.removeItem("admin");
        alert("🗑️ Account deleted successfully!");
        navigate("/login");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to delete account");
      }
    }
  };

  return (
    <div className="main-content">
    <div className="profile-container">
      <h1 className="profile-heading">👤 Your Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={admin.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={admin.password}
            onChange={handleChange}
          />
        </div>

        <div className="btn-group">
          <button type="submit" className="update-btn">Update Profile</button>
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default ProfilePage;
