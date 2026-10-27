import React, { useEffect, useState } from "react";
import axios from "axios";
import './Admin.css';

function AdminManagement() {
  const [admins, setAdmins] = useState([]);

 
  
  const storedAdmin = JSON.parse(localStorage.getItem("admin"));
  const loggedInAdminId = storedAdmin?.id;

   const token = localStorage.getItem("tokenStore"); 

  useEffect(() => {
    fetchAdmins();
    document.title = "HealthyTrack | Admins ";
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/all-admins", {
        headers: { Authorization: token || "" },
      });
      setAdmins(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (id === loggedInAdminId) {
      alert("You cannot delete yourself!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`http://localhost:5000/admin/admins/${id}`, {
        headers: { Authorization: token || "" },
      });
      alert("Admin deleted successfully!");
      fetchAdmins(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Error deleting admin");
    }
  };

  return (
    <div className="main-content">
    <div className="admin-management-container">
      <h2>Admin Management</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
      <tbody>
          {admins
            .filter(admin => admin && admin._id) // filter out null entries
            .map(admin => {
              const isCurrentAdmin = admin._id.toString() === loggedInAdminId?.toString();
              return (
                <tr key={admin._id}>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>
                    {isCurrentAdmin ? (
                      <span className="your-account">Your Account</span>
                    ) : (
                      <button onClick={() => handleDelete(admin._id)} className="btn-delete">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>


      </table>
    </div>
    </div>
  );
}

export default AdminManagement;
