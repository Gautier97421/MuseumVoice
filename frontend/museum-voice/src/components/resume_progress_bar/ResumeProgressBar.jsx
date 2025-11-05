import React from "react";
import "./ResumeProgressBar.css";

const ResumeProgressBar = ({ completed, total, timeLeft }) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="resume-progress-container">
      <div className="resume-progress-bar">
        <div
          className="resume-progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="resume-progress-info">
        <span className="resume-progress-text">
          Œuvre {completed} sur {total}
        </span>
        <div className="resume-time-box">{timeLeft}</div>
      </div>
    </div>
  );
};

export default ResumeProgressBar;
