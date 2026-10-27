import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./AssignMeal.css";

function AssignMeal() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingMealId = location.state?.mealId || null;

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    meal_name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    meal_day: "",
    meal_time: "",
  });

  const [recentMeals, setRecentMeals] = useState([]);

  useEffect(() => {
    document.title = "HealthyTrack | Assign Meal";
    fetchUsers();
    fetchRecentMeals();

    if (editingMealId) fetchMealForEdit(editingMealId);
  }, [editingMealId]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/admin/all-users");
    setUsers(res.data);
  };

  const fetchRecentMeals = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/meals?limit=5&page=1"
      );

      // If your backend sends { meals: [...] } instead of array
      const mealsArray = Array.isArray(res.data) ? res.data : res.data.meals;

      setRecentMeals(mealsArray || []); // fallback to empty array
    } catch (err) {
      console.error(err);
      setRecentMeals([]); // fallback to empty array
    }
  };

  // Fetch meal to edit
  const fetchMealForEdit = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/meals?limit=1000&page=1`
      );
      const mealsArray = Array.isArray(res.data)
        ? res.data
        : res.data.meals || [];
      const meal = mealsArray.find((m) => m._id === id);

      if (meal) {
        setFormData({
          user_id: meal.user_id?._id || "",
          meal_name: meal.meal_name || "",
          calories: meal.calories || "",
          protein: meal.protein || "",
          carbs: meal.carbs || "",
          fats: meal.fats || "",
          meal_day: meal.meal_day || "",
          meal_time: meal.meal_time || "",
        });
      }
    } catch (err) {
      console.error("Error fetching meal for edit:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      calories,
      protein,
      carbs,
      fats,
      user_id,
      meal_name,
      meal_day,
      meal_time,
    } = formData;

    // Check required fields
    if (!user_id || !meal_name || !meal_day || !meal_time) {
      alert("Please fill all required fields");
      return;
    }

    // Numeric validation
    if (calories <= 0 || protein <= 0 || carbs <= 0 || fats <= 0) {
      alert("Calories must be > 0 and other values cannot be negative");
      return;
    }

    try {
      if (editingMealId) {
        await axios.put(
          `http://localhost:5000/admin/meals/${editingMealId}`,
          formData
        );
        alert("Meal updated successfully!");
      } else {
        await axios.post("http://localhost:5000/admin/assign-meal", formData);
        alert("Meal assigned successfully!");
      }
      setFormData({
        user_id: "",
        meal_name: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        meal_day: "",
        meal_time: "",
      });
      navigate("/listmeals"); // After add/update go to ListMeal
    } catch (err) {
      console.error(err);
      alert("Error assigning/updating meal");
    }
  };

  return (
    <div className="main-content">
      <div className="assign-meal-container">
        <h3>{editingMealId ? "Edit Meal" : "Assign Meal"}</h3>
        <form onSubmit={handleSubmit} className="meal-form">
          <select
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.username}
              </option>
            ))}
          </select>
          <input
            name="meal_name"
            placeholder="Meal Name"
            value={formData.meal_name}
            onChange={handleChange}
            required
          />
          <input
            name="calories"
            placeholder="Calories"
            type="number"
            value={formData.calories}
            onChange={handleChange}
          />
          <input
            name="protein"
            placeholder="Protein"
            type="number"
            value={formData.protein}
            onChange={handleChange}
          />
          <input
            name="carbs"
            placeholder="Carbs"
            type="number"
            value={formData.carbs}
            onChange={handleChange}
          />
          <input
            name="fats"
            placeholder="Fats"
            type="number"
            value={formData.fats}
            onChange={handleChange}
          />
          <input
            name="meal_day"
            placeholder="Meal Day"
            value={formData.meal_day}
            onChange={handleChange}
            required
          />
          <input
            name="meal_time"
            placeholder="Meal Time"
            value={formData.meal_time}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {editingMealId ? "Update Meal" : "Assign Meal"}
          </button>
        </form>

        <h4>Recent 5 Meals</h4>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Meal</th>
              <th>Day</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentMeals?.map((m) => (
              <tr key={m._id}>
                <td>{m.user_id?.username}</td>
                <td>{m.meal_name}</td>
                <td>{m.meal_day}</td>
                <td>{m.meal_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignMeal;
