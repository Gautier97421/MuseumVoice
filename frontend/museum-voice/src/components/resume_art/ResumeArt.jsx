import React from "react";
import "./ResumeArt.css";
import ResumeArtImage from "./ResumeArtImage";
import ResumeArtTopIcons from "./ResumeArtTopIcons";
import ResumeArtControls from "./ResumeArtControls";
import ResumeArtProgress from "./ResumeArtProgress";

const ResumeArt = () => {
  return (
    <div className="resume-art">
      <div className="resume-art-image-wrapper">
        <ResumeArtImage />
        <ResumeArtTopIcons />
      </div>

      <div className="resume-art-controls-wrapper">
        <ResumeArtProgress />
        <ResumeArtControls />
      </div>
    </div>
  );
};

export default ResumeArt;
