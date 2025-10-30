import React, { useState } from "react";
import "./TimeRegulator.css";

export default function TimeRegulator() {
  const [value, setValue] = useState(3.5);

  const handleChange = (e) => {
    setValue(parseFloat(e.target.value));
  };

  const formatTime = (val) => {
    const hours = Math.floor(val);
    const minutes = (val - hours) * 60;
    return `${hours}H${minutes === 0 ? "00" : minutes}`;
  };

  return (
    <div className="time-page">
      <div className="time-container">
        <h3>Combien de temps avez-vous ?</h3>
        <div className="time-display">{formatTime(value)}</div>

        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={value}
          onChange={handleChange}
          className="slider"
        />

        <div className="labels">
          <span>1H</span>
          <span>2H</span>
          <span>3H</span>
          <span>4H</span>
          <span>5H</span>
        </div>
      </div>
    </div>
  );
}
