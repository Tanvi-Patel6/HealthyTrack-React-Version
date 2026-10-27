import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./ProfilePage.css";

function ProfilePage() {

   useEffect(() => {
    document.title = "HealthyTrack | Profile Page";
   });

  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        username: parsedUser.username || "",
        email: parsedUser.email || "",
        password: ""
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Update user info
  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("tokenStore");
    if (!storedUser || !token) return alert("User not logged in!");

    const { id } = JSON.parse(storedUser);

    try {
      const updateData = {
        username: user.username,
        email: user.email
      };

      if (user.password) {
        updateData.password = user.password;
      }

      await axios.put(`http://localhost:5000/user/update/${id}`, updateData, {
        headers: { Authorization: token }
      });

      // Update localStorage user info
      localStorage.setItem(
        "user",
        JSON.stringify({ id, username: user.username, email: user.email })
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
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("tokenStore");

    if (!storedUser || !token) return alert("User not logged in!");

    const { id } = JSON.parse(storedUser);

    if (window.confirm("⚠️ Are you sure you want to delete your account? This cannot be undone!")) {
      try {
        await axios.delete(`http://localhost:5000/user/delete/${id}`, {
          headers: { Authorization: token }
        });

        localStorage.removeItem("tokenStore");
        localStorage.removeItem("user");
        alert("🗑️ Account deleted successfully!");
        navigate("/login");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to delete account");
      }
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">👤 Your Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
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
            value={user.password}
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
  );
}

export default ProfilePage;
