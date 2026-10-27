import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MealPlans.css";

function MealPlans() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "HealthyTrack | Meals";
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("tokenStore");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user ? user.id : null;

      if (!userId) {
        alert("User not logged in!");
        setLoading(false);
        return;
      }

      setUsername(user.username);

      const res = await axios.get(`http://localhost:5000/mealplans/${userId}`, {
        headers: { Authorization: token || "" },
      });

      setMeals(res.data);
      setFilteredMeals(res.data);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]);
      setFilteredMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleFilter = () => {
    if (selectedDay === "") {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter(
        (meal) => meal.meal_day.toLowerCase() === selectedDay.toLowerCase()
      );
      setFilteredMeals(filtered);
    }
  };

  return (
    <div className="meal-page">
      <div className="meal-header">
        <h2>Welcome, <span>{username}</span> 👋</h2>
        <p>Your personalized meal plan for a healthy lifestyle</p>
      </div>

      <div className="filter-container">
        <select value={selectedDay} onChange={handleDayChange}>
          <option value="">All Days</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <button onClick={handleFilter}>Search</button>
      </div>

      {loading ? (
        <p className="loading">Loading your meals...</p>
      ) : filteredMeals.length > 0 ? (
        <div className="meals-grid">
          {filteredMeals.map((meal) => (
            <div key={meal._id} className="meal-card">
              <div className="meal-info">
                <h3>{meal.meal_name}</h3>
                <p className="meal-day">{meal.meal_day} • {meal.meal_time}</p>
              </div>

              <div className="nutrient-grid">
                <div className="nutrient">
                  <span>🔥</span>
                  <p>{meal.calories} kcal</p>
                </div>
                <div className="nutrient">
                  <span>🥩</span>
                  <p>{meal.protein} g Protein</p>
                </div>
                <div className="nutrient">
                  <span>🍞</span>
                  <p>{meal.carbs} g Carbs</p>
                </div>
                <div className="nutrient">
                  <span>🥑</span>
                  <p>{meal.fats} g Fats</p>
                </div>
              </div>

              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-meals">No meals found for this day.</p>
      )}
    </div>
  );
}

export default MealPlans;
