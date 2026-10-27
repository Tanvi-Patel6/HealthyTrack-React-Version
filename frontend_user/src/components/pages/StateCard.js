import React from "react";
import './StateCard.css';

function StatsCard({ title, value, icon, bg }) {
  return (
    <div className="stats-card" style={{ backgroundColor: bg }}>
      <div className="icon">{icon}</div>
      <div className="details">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default StatsCard;
