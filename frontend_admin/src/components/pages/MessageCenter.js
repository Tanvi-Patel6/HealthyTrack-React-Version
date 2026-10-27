import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MessageCenter.css";

function MessageCenter() {
  const [contacts, setContacts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure to delete this contact?")) {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      fetchContacts();
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure to delete this feedback?")) {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      fetchFeedbacks();
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchFeedbacks();
  }, []);

  return (
    <div className="main-content">
    <div className="admin-dashboard">
      <h1>👨‍💻 Message Center</h1>

      {/* Contact Messages */}
      <section>
        <h2>📩 Contact Messages</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.message}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td>
                  <button className="Message-Center" onClick={() => deleteContact(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Feedback Messages */}
      <section>
        <h2>💬 Feedback Messages</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f._id}>
                <td>{f.name}</td>
                <td>{f.email}</td>
                <td>{f.feedback}</td>
                <td>{new Date(f.createdAt).toLocaleString()}</td>
                <td>
                  <button className="Message-Center" onClick={() => deleteFeedback(f._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
    </div>
  );
}

export default MessageCenter;
