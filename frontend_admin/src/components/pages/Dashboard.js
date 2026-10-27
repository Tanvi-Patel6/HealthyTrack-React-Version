import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
    const [counts, setCounts] = useState({});
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentAdmins, setRecentAdmins] = useState([]);
    const [recentBodyForms, setRecentBodyForms] = useState([]);

       useEffect(() => {
            document.title = "HealthyTrack | Dashboard ";
          }, []);

    useEffect(() => {
    // Fetch counts
    axios.get("http://localhost:5000/admin/dashboard-counts")
      .then(res => setCounts(res.data))
      .catch(err => console.log(err));

    // Fetch recent users
    axios.get("http://localhost:5000/admin/recent-users")
      .then(res => setRecentUsers(res.data))
      .catch(err => console.log(err));

    // Fetch recent admins
    axios.get("http://localhost:5000/admin/recent-admins")
      .then(res => setRecentAdmins(res.data))
      .catch(err => console.log(err));

    // Fetch recent body forms
    axios.get("http://localhost:5000/admin/recent-bodyforms")
      .then(res => setRecentBodyForms(res.data))
      .catch(err => console.log(err));
  }, []);

    return(
      <div className="main-content">
         <div className="dashboard-container">
      {/* Top Cards */}
      <div className="cards-grid">
        <div className="card">
          <h3>Total Users</h3>
          <p>{counts.totalUsers || 0}</p>
        </div>
        <div className="card">
          <h3>Total Admins</h3>
          <p>{counts.totalAdmins || 0}</p>
        </div>
        <div className="card">
          <h3>Total Meal Plans</h3>
          <p>{counts.totalMealPlans || 0}</p>
        </div>
        <div className="card">
          <h3>Total Body Forms</h3>
          <p>{counts.totalBodyForms || 0}</p>
        </div>
      </div>

      {/* Bottom Tables */}
      <div className="tables-section">
        {/* Recent Users */}
        <div className="table-card">
          <h3>Recent Users</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Admins */}
        <div className="table-card">
          <h3>Recent Admins</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {recentAdmins.map(admin => (
                <tr key={admin._id}>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Body Forms */}
        <div className="table-card">
          <h3>Recent Body Forms</h3>
          <table>
            <thead>
              <tr>
                <th>USERNAME</th>
                <th>HEIGHT</th>
                <th>WEIGHT</th>
                <th>AGE</th>
                <th>GENDER</th>
                <th>GOAL</th>
                <th>BLOOD GROUP</th>
                <th>TYPE</th>
              </tr>
            </thead>
            <tbody>
              {recentBodyForms.map(form => (
                <tr key={form._id}>
                  <td>{form.username}</td>
                  <td>{form.height}</td>
                  <td>{form.weight}</td>
                  <td>{form.age}</td>
                  <td>{form.gender}</td>
                  <td>{form.goal}</td>
                  <td>{form.blood_group}</td>
                  <td>{form.diet_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    );
}

export default Dashboard;