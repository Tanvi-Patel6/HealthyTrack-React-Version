import React, { useState } from "react";
import axios from "axios";
import './Dashboard.css';
import { useEffect } from "react";
import StateCard from "../pages/StateCard";
import khichdiImg from "../../Assets/img/Khichdi.avif";


function Dashboard() {

   useEffect(() => {
      document.title = "HealthyTrack | Dashboard";
   });

     const stats = [
    { title: "Weight", value: "68 kg", icon: "⚖️", bg: "#FFCDD2" },
    { title: "BMI", value: "22.5", icon: "📏", bg: "#C8E6C9" },
    { title: "Calories", value: "2200 kcal", icon: "🔥", bg: "#BBDEFB" },
    { title: "Steps", value: "7500", icon: "👟", bg: "#FFF9C4" },
    { title: "Sleep", value: "7.5 hrs", icon: "😴", bg: "#D1C4E9" },
    { title: "Water Intake", value: "8 glasses", icon: "💧", bg: "#B3E5FC" },
  ];

  const meals = ["Breakfast: Oats & Fruits", "Lunch: Grilled Chicken & Veggies", "Snack: Nuts", "Dinner: Salmon & Salad"];

  const activities = ["Morning Jog - 30 mins", "Yoga - 20 mins", "Cycling - 15 mins"];

  

  const notifications = ["You missed your step goal today!", "Time to drink water!", "Weekly summary available."];


  // Example healthy Indian veg recipe
const healthyVegRecipe = {
  title: "Vegetable Khichdi",
  description: "Vegetable Khichdi is a wholesome, comforting Indian dish made with rice, lentils, and assorted vegetables. It's rich in protein, fiber, and easy to digest—perfect for a healthy meal any time of the day.",
  ingredients: [
    "1/2 cup rice",
    "1/4 cup moong dal (yellow lentils)",
    "1 cup mixed vegetables (carrot, peas, beans)",
    "1 tsp cumin seeds",
    "1/2 tsp turmeric powder",
    "1/2 tsp ginger paste",
    "2 tbsp ghee or oil",
    "4 cups water",
    "Salt to taste",
    "Fresh coriander for garnish"
  ],
  steps: [
    "Wash rice and dal together and soak for 10 minutes.",
    "Heat ghee in a pressure cooker, add cumin seeds and ginger paste. Sauté for a minute.",
    "Add chopped vegetables, turmeric powder, and sauté for 2 minutes.",
    "Add rice, dal, salt, and water. Mix well.",
    "Pressure cook for 2-3 whistles on medium heat.",
    "Once pressure releases, open and mix gently.",
    "Garnish with fresh coriander and serve hot with yogurt or pickle."
  ]
};


    
    return(
        <div className="dashboard-full">
      {/* Health Stats */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StateCard key={index} title={stat.title} value={stat.value} icon={stat.icon} bg={stat.bg} />
        ))}
      </div>

      {/* Meal Suggestions */}
      <div className="meal-section">
        <h2>Today's Meal Suggestions</h2>
        <ul>
          {meals.map((meal, idx) => (
            <li key={idx}>{meal}</li>
          ))}
        </ul>
      </div>

      {/* Activity Summary */}
      <div className="activity-section">
        <h2>Activity Summary</h2>
        <ul>
          {activities.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ul>
       
      </div>

           {/* Recipe Section */}
      <div className="recipe-section">
        <h2>Healthy Vegetarian Recipe</h2>
        <div className="recipe-card">
          <img src={khichdiImg} alt={healthyVegRecipe.title} className="recipe-image" />
          <div className="recipe-content">
            <h2>{healthyVegRecipe.title}</h2>
            <p className="recipe-description">{healthyVegRecipe.description}</p>
            <h4>Ingredients:</h4>
            <ul>
              {healthyVegRecipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
            </ul>
            <h4>Steps:</h4>
            <ol>
              {healthyVegRecipe.steps.map((step, idx) => <li key={idx}>{step}</li>)}
            </ol>
          </div>
        </div>
      </div>

     

      {/* Notifications */}
      <div className="notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
    );
}

export default Dashboard;