// MesChoix.jsx
import React, { useState } from 'react';
import TimeRegulator from '../../components/time_regulator/TimeRegulator';
import VisitStyleSelector from '../../components/visit_style/VisitStyleSelector';
import ResumeTypeSelector from '../../components/resume_type_style/ResumeTypeSelector';
import ArtMovementSelector from '../../components/art_movement_selector/ArtMovementSelector';
import ThemeAndSeasonsSelector from '../../components/theme_and_seasons/ThemeAndSeasons';
import InterestSelector from '../../components/interest/Interest';
import Header from '../../components/header/Header';
import InterestNotice from '../../components/interest_notice/InterestNotice';
import './MesChoix.css'; 

const MesChoix = () => {
  const [timeValue, setTimeValue] = useState(0);
  const [visitStyle, setVisitStyle] = useState('');
  const [interests, setInterests] = useState([]);
  const [resumeType, setResumeType] = useState('');
  const [artMovements, setArtMovements] = useState([]);
  const [themes, setThemes] = useState([]);

  // 🕒 From TimeRegulator
  const handleTimeValueChange = (newValue) => {
    console.log("⏱ TimeRegulator value:", newValue);
    setTimeValue(newValue);
  };

  // 🎨 From VisitStyleSelector
  const handleVisitStyleChange = (style) => {
    console.log("🎨 VisitStyleSelector value:", style);
    setVisitStyle(style);
  };

  // 💡 From InterestSelector
  const handleInterestChange = (selectedInterests) => {
    console.log("💡 Interests updated:", selectedInterests);
    setInterests(selectedInterests);
  };

  // 📝 From ResumeTypeSelector
  const handleResumeTypeChange = (type) => {
    console.log("📝 ResumeTypeSelector value:", type);
    setResumeType(type);
  };

  // 🏛️ From ArtMovementSelector
  const handleArtMovementChange = (selectedMovements) => {
    console.log("🏛️ ArtMovements updated:", selectedMovements);
    setArtMovements(selectedMovements);
  };

  // 🌸 From ThemeAndSeasonsSelector
  const handleThemeChange = (selectedThemes) => {
    console.log("🌸 Themes updated:", selectedThemes);
    setThemes(selectedThemes);
  };

  return (
    <div className="mes-choix-container">
      <Header />

      {/* Time Regulator */}
      <TimeRegulator onValueChange={handleTimeValueChange} />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Temps sélectionné : {timeValue} heures
      </p>

      {/* Visit Style */}
      <VisitStyleSelector onStyleChange={handleVisitStyleChange} />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Style de visite : {visitStyle || "Aucun sélectionné"}
      </p>

      {/* Interests */}
      <InterestSelector onSelectionChange={handleInterestChange} />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Intérêts sélectionnés : {interests.join(', ') || "Aucun"}
      </p>

      {/* Resume Type */}
      <ResumeTypeSelector onTypeChange={handleResumeTypeChange} />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Type de résumé : {resumeType || "Aucun sélectionné"}
      </p>

      {/* Art Movements */}
      <ArtMovementSelector onSelectionChange={handleArtMovementChange} />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Mouvements artistiques : {artMovements.join(', ') || "Aucun"}
      </p>

      {/* Themes & Seasons */}
      <ThemeAndSeasonsSelector onSelectionChange={handleThemeChange} />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Thèmes & Saisons : {themes.join(', ') || "Aucun"}
      </p>

      <InterestNotice />
    </div>
  );
};

export default MesChoix;
