import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ListMeal.css";

function ListMeal() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
    document.title = "HealthyTrack | List Meals";
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/meals");
      const mealsArray = Array.isArray(res.data) ? res.data : res.data.meals;
      setMeals(mealsArray || []);
      setFilteredMeals(mealsArray || []);
    } catch (err) {
      console.error(err);
      setMeals([]);
      setFilteredMeals([]);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) {
      // if search empty → reset to all meals
      setFilteredMeals(meals);
      return;
    }

    const result = meals.filter(
      (m) =>
        m.user_id?.username?.toLowerCase() === search.toLowerCase()
    );

    if (result.length > 0) {
      setFilteredMeals(result);
    } else {
      alert("User not found!");
      setFilteredMeals([]);
    }
  };

  const handleEdit = (meal) => {
    navigate("/meals", { state: { mealId: meal._id } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      await axios.delete(`http://localhost:5000/admin/meals/${id}`);
      fetchMeals();
    }
  };

  return (
    <div className="main-content">
      <div className="list-meal-container">
        <h2>All Meals</h2>

        {/* 🔍 Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Meal</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fats</th>
              <th>Day</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeals.map((meal) => (
              <tr key={meal._id}>
                <td>{meal.user_id?.username}</td>
                <td>{meal.meal_name}</td>
                <td>{meal.calories}</td>
                <td>{meal.protein}</td>
                <td>{meal.carbs}</td>
                <td>{meal.fats}</td>
                <td>{meal.meal_day}</td>
                <td>{meal.meal_time}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(meal)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(meal._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMeals.length === 0 && (
          <p className="no-results">No meals found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default ListMeal;
