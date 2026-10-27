import React from "react";
import "./TipsPage.css";
import { useEffect } from "react";


const tipsData = [
  {
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily to maintain optimal body functions and energy levels.",
    icon: "💧"
  },
  {
    title: "Balanced Diet",
    description: "Include fruits, vegetables, proteins, and healthy fats in your diet for overall wellness.",
    icon: "🥗"
  },
  {
    title: "Regular Exercise",
    description: "Engage in at least 30 minutes of moderate exercise like walking, jogging, or yoga daily.",
    icon: "🏃‍♀️"
  },
  {
    title: "Adequate Sleep",
    description: "Sleep 7-9 hours per night to improve recovery, mood, and overall health.",
    icon: "🛌"
  },
  {
    title: "Mindful Eating",
    description: "Avoid overeating and focus on eating slowly to improve digestion and prevent weight gain.",
    icon: "🍽️"
  },
  {
    title: "Stress Management",
    description: "Practice meditation, deep breathing, or hobbies to reduce stress and boost immunity.",
    icon: "🧘‍♀️"
  }
];

function TipsPage() {

   useEffect(() => {
    document.title = "HealthyTrack | Tips";
   });
  return (
    <div className="tips-container">
      <h1 className="tips-heading">Healthy Lifestyle Tips</h1>
      <div className="tips-grid">
        {tipsData.map((tip, index) => (
          <div key={index} className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <h2 className="tip-title">{tip.title}</h2>
            <p className="tip-description">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TipsPage;
