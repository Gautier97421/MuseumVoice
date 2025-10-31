import React, { useState } from "react";
import "./TimeRegulator.css";

export default function TimeRegulator() {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    setValue(val);
    e.target.style.setProperty("--value", val);
  };

  const formatTime = (val) => {
    const hours = Math.floor(val);
    const minutes = (val - hours) * 60;
    return `${hours}H${minutes === 0 ? "00" : minutes}`;
  };

  const ticks = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  return (
    <div className="time-page">
      <div className="time-container">
        <div className="title-row">
          <h3>Combien de temps avez vous?</h3>
          <div className="time-display">{formatTime(value)}</div>
        </div>

        <div className="slider-wrapper">
          <div className="labels">
            {[0, 1, 2, 3, 4, 5].map((val) => (
              <span
                key={val}
                style={{ visibility: val === 0 ? "hidden" : "visible" }}
              >
                {val}H
              </span>
            ))}
          </div>

          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={value}
            onChange={handleChange}
            className="slider"
          />

          <div className="ticks">
            {ticks.map((val, i) => {
              const percent = (val / 5) * 100; // min=0, max=5
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
