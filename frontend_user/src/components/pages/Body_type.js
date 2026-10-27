import React, { useState, useEffect } from "react";
import axios from "axios";
import './Body_type.css';

function Body_type() {

  const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.id : null;
const usernameFromStorage = user ? user.username : "";

  const [formData, setFormData] = useState({
    username: usernameFromStorage,
    height: "",
    weight: "",
    age: "",
    gender: "",
    goal: "",
    blood_group: "",
    diet_type: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = "HealthyTrack | BodyType-Form";

    // Fetch existing body type data for the user
    const fetchBodyType = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/bodytype/${userId}`);
        if (res.data) {
          setFormData(res.data); // prefill form
          setIsEditing(true); // user can edit
        }
      } catch (err) {
        console.log("No existing data or fetch error:", err);
      }
    };

    if (userId) fetchBodyType();
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate input
  const validateForm = () => {
    const { username, height, weight, age, gender, goal, blood_group, diet_type } = formData;

    if (!username || !height || !weight || !age || !gender || !goal || !blood_group || !diet_type) {
      alert("Please fill all fields.");
      return false;
    }

    if (height <= 0 || weight <= 0 || age <= 0) {
      alert("Height, Weight, and Age must be positive numbers.");
      return false;
    }

    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEditing) {
        // Update existing data
        const res = await axios.put(`http://localhost:5000/bodytype/${userId}`, formData);
        alert(res.data.message || "Data updated successfully!");
      } else {
        // First time submission
        const res = await axios.post("http://localhost:5000/bodytype", { ...formData, userId: userId });
        alert(res.data.message || "Data submitted successfully!");
        setIsEditing(true);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving data. Check backend.");
    }
  };

  return (
    <div className="bt-card">
      <h2 className="bt-title">Body Type Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="input1"
        /><br /><br />
        <input
          name="height"
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          required
        />  
        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="input1"
        /><br /><br />
        
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select><br /><br />

        <select name="goal" value={formData.goal} onChange={handleChange} required>
          <option value="">Select Goal</option>
          <option value="Gain">Gain</option>
          <option value="Lose">Lose</option>
          <option value="Maintain">Maintain</option>
        </select><br /><br />

        <input
          name="blood_group"
          placeholder="Blood Group"
          value={formData.blood_group}
          onChange={handleChange}
          required
        /><br /><br />

        <select name="diet_type" value={formData.diet_type} onChange={handleChange} required>
          <option value="">Select Diet</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Both">Both</option>
        </select><br /><br />

        <button type="submit" className="bt-btn">{isEditing ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default Body_type;
