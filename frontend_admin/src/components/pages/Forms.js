import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forms.css";

function Forms() {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    document.title = "HealthyTrack | Forms";
  }, []);

  const fetchForms = () => {
    axios
      .get("/admin/bodyforms")
      .then((res) => setForms(res.data))
      .catch((err) => console.error(err));
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setSelectedUser(null); //  Reset if search is empty
      return;
    }

    const user = forms.find(
      (f) => f.username.toLowerCase() === search.toLowerCase()
    );

    if (user) {
      setSelectedUser(user);
    } else {
      alert("User not found!");
      setSelectedUser(null);
    }
  };

  return (
    <div className="main-content">
      <div className="forms-container">
        <h1>User Body Types Forms</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Show only searched user if selectedUser exists */}
        {selectedUser ? (
          <div className="selected-user">
            <h2>{selectedUser.username}</h2>
            <p>
              <strong>Height:</strong> {selectedUser.height}
            </p>
            <p>
              <strong>Weight:</strong> {selectedUser.weight}
            </p>
            <p>
              <strong>Age:</strong> {selectedUser.age}
            </p>
            <p>
              <strong>Gender:</strong> {selectedUser.gender}
            </p>
            <p>
              <strong>Goal:</strong> {selectedUser.goal}
            </p>
            <p>
              <strong>Blood Group:</strong> {selectedUser.blood_group}
            </p>
            <p>
              <strong>Diet Type:</strong> {selectedUser.diet_type}
            </p>
            <p>
              <strong>Created At:</strong> {selectedUser.createdAt}
            </p>
          </div>
        ) : (
          // Show all forms only when no search is done
          <div className="forms-list">
            {forms.map((form, index) => (
              <div key={index} className="form-card">
                <h3>{form.username}</h3>
                <p>
                  <strong>Height:</strong> {form.height}
                </p>
                <p>
                  <strong>Weight:</strong> {form.weight}
                </p>
                <p>
                  <strong>Age:</strong> {form.age}
                </p>
                <p>
                  <strong>Gender:</strong> {form.gender}
                </p>
                <p>
                  <strong>Goal:</strong> {form.goal}
                </p>
                <p>
                  <strong>Blood Group:</strong> {form.blood_group}
                </p>
                <p>
                  <strong>Diet Type:</strong> {form.diet_type}
                </p>
                <p>
                  <strong>Created At:</strong> {form.createdAt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Forms;
