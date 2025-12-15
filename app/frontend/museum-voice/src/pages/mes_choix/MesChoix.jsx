// MesChoix.jsx
import React, { useState, useCallback } from 'react';
import TimeRegulator from '../../components/time_regulator/TimeRegulator';
import VisitStyleSelector from '../../components/visit_style/VisitStyleSelector';
import ResumeTypeSelector from '../../components/resume_type_style/ResumeTypeSelector';
import ArtMovementSelector from '../../components/art_movement_selector/ArtMovementSelector';
import ThemeAndSeasonsSelector from '../../components/theme_and_seasons/ThemeAndSeasons';
import InterestSelector from '../../components/interest/Interest';
import Header from '../../components/header/Header';
import InterestNotice from '../../components/interest_notice/InterestNotice';
import GenParcours from '../../components/gen_parcours/GenParcours';
import './MesChoix.css';

const MesChoix = () => {
  const [timeValue, setTimeValue] = useState(0);
  const [visitStyle, setVisitStyle] = useState('');
  const [interests, setInterests] = useState([]);
  const [resumeType, setResumeType] = useState('');
  const [artMovements, setArtMovements] = useState([]);
  const [themes, setThemes] = useState([]);

  //  From TimeRegulator
  const handleTimeValueChange = useCallback((newValue) => {
    setTimeValue(newValue);
  }, []);

  //  From VisitStyleSelector
  const handleVisitStyleChange = useCallback((style) => {
    setVisitStyle(style);
  }, []);

  // From InterestSelector
  const handleInterestChange = useCallback((selectedInterests) => {
    setInterests(selectedInterests);
  }, []);

  //  From ResumeTypeSelector
  const handleResumeTypeChange = useCallback((type) => {
    setResumeType(type);
  }, []);

  //  From ArtMovementSelector
  const handleArtMovementChange = useCallback((selectedMovements) => {
    setArtMovements(selectedMovements);
  }, []);

  //  From ThemeAndSeasonsSelector
  const handleThemeChange = useCallback((selectedThemes) => {
    setThemes(selectedThemes);
  }, []);

  //  Send data to FastAPI when button is clicked
  const handleSendData = async () => {
    const payload = {
      timeValue,
      visitStyle,
      interests,
      resumeType,
      artMovements,
      themes,
    };

    console.log(" Sending payload to API:", payload);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/meschoix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("❌ Failed to send data");

      const data = await response.json();
      console.log("✅Response from FastAPI:", data);
      alert(" Vos choix ont été envoyés avec succès !");
    } catch (error) {
      console.error(" Error sending data:", error);
      alert("❌Erreur lors de l'envoi des données !");
    }
  };

  return (
    <div className="mes-choix-container">
      <Header />

      {/*  Temps */}
      <TimeRegulator onValueChange={handleTimeValueChange} />
      <p style={{ textAlign: "center" }}>
        Temps sélectionné : {timeValue} heures
      </p>

      {/*  Style de visite */}
      <VisitStyleSelector onStyleChange={handleVisitStyleChange} />
      <p style={{ textAlign: "center" }}>
        Style de visite : {visitStyle || "Aucun sélectionné"}
      </p>

      {/*  Intérêts */}
      <InterestSelector onSelectionChange={handleInterestChange} />
      <p style={{ textAlign: "center" }}>
        Intérêts : {interests.join(', ') || "Aucun"}
      </p>

      {/*  Type de résumé */}
      <ResumeTypeSelector onTypeChange={handleResumeTypeChange} />
      <p style={{ textAlign: "center" }}>
        Type de résumé : {resumeType || "Aucun sélectionné"}
      </p>

      {/*  Mouvements artistiques */}
      <ArtMovementSelector onSelectionChange={handleArtMovementChange} />
      <p style={{ textAlign: "center" }}>
        Mouvements : {artMovements.join(', ') || "Aucun"}
      </p>

      {/*  Thèmes & Saisons */}
      <ThemeAndSeasonsSelector onSelectionChange={handleThemeChange} />
      <p style={{ textAlign: "center" }}>
        Thèmes & Saisons : {themes.join(', ') || "Aucun"}
      </p>

      {/*  Send button */}
      <GenParcours onClick={handleSendData} />

      <InterestNotice />
    </div>
  );
};

export default MesChoix;
