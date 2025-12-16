import React, { useState, useEffect } from "react";
import "./TimeRegulator.css";

export default function TimeRegulator({ onValueChange }) {
  const minTime = 0.75; // 45 minutes
  const maxTime = 3;    // 3 hours
  const step = 0.25;    // 15 minutes

  const [value, setValue] = useState(minTime);

  // Load from localStorage once on mount
  useEffect(() => {
    const savedValue = localStorage.getItem("timeSliderValue");
    if (savedValue !== null) {
      let val = parseFloat(savedValue);
      // Ensure value is within new range
      if (val < minTime) val = minTime;
      if (val > maxTime) val = maxTime;

      setValue(val);
      updateCssVariable(val);
    } else {
      // Initialize CSS variable with default
      updateCssVariable(minTime);
    }
  }, []);

  const updateCssVariable = (val) => {
    // Calculate percentage for background gradient
    const percent = ((val - minTime) / (maxTime - minTime)) * 100;
    document.documentElement.style.setProperty("--percent", `${percent}%`);
  };

  // Whenever slider changes
  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    setValue(val);
    updateCssVariable(val);
    localStorage.setItem("timeSliderValue", val);

    if (onValueChange) onValueChange(val);
  };

  const formatTime = (val) => {
    const hours = Math.floor(val);
    const minutes = Math.round((val - hours) * 60);
    return `${hours}H${minutes === 0 ? "00" : minutes}`;
  };

  // Generate ticks for every step (15 mins)
  const ticks = [];
  for (let i = minTime; i <= maxTime; i += step) {
    ticks.push(i);
  }

  // Generate labels (e.g., every hour)
  const labels = [0.75, 1, 2, 3];

  return (
    <div className="time-page">
      <div className="time-container">
        <div className="title-row">
          <h3>Combien de temps avez-vous ?</h3>
          <div className="time-display">{formatTime(value)}</div>
        </div>

        <div className="slider-wrapper">
          <div className="labels">
            {labels.map((val) => {
              const percent = ((val - minTime) / (maxTime - minTime)) * 100;
              return (
                <span
                  key={val}
                  style={{ left: `${percent}%`, position: 'absolute', transform: 'translateX(-50%)' }}
                >
                  {val === 0.75 ? "45min" : `${val}H`}
                </span>
              );
            })}
          </div>

          <input
            type="range"
            min={minTime}
            max={maxTime}
            step={step}
            value={value}
            onChange={handleChange}
            className="slider"
          />

          <div className="ticks">
            {ticks.map((val, i) => {
              const percent = ((val - minTime) / (maxTime - minTime)) * 100;
              return (
                <div
                  key={i}
                  className={`tick ${val % 1 !== 0 ? "half" : ""}`}
                  style={{ left: `${percent}%` }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
