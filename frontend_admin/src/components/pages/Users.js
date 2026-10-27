import React, { useEffect, useState } from "react";
import axios from "axios";
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // search input
  const [filteredUsers, setFilteredUsers] = useState([]); // filtered result
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchUsers();
     document.title = "HealthyTrack | Users ";
  }, []);

  

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/all-users", {
        headers: { Authorization: token || "" },
      });
      setUsers(res.data || []);
      setFilteredUsers(res.data || []); // initially show all users
    } catch (err) {
      console.error(err);
    }
  };

  // Filter users when button is clicked
  const handleSearch = () => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/delete-user/${id}`, {
        headers: { Authorization: token || "" },
      });
      alert("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  return (
    <div className="main-content">
    <div className="user-management-container">
      <h2>User Management</h2>

      {/* Search Bar with Button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button onClick={handleSearch} className="btn-search">Search</button>
      </div>

      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Users;
