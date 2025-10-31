// MesChoix.jsx
import React from 'react';
import TimeRegulator from '../../components/time_regulator/TimeRegulator';
import VisitStyleSelector from '../../components/visit_style/VisitStyleSelector';
import ResumeTypeSelector from '../../components/resume_type_style/ResumeTypeSelector';
import ArtMovementSelector from '../../components/art_movement_selector/ArtMovementSelector';
import ThemeAndSeasonsSelector from '../../components/theme_and_seasons/ThemeAndSeasons';
import InterestSelector from '../../components/interest/Interest';
import './MesChoix.css'; 
import Header from '../../components/header/Header';


const MesChoix = () => {
  return (
    <div className="mes-choix-container">
      <Header />
      <TimeRegulator />
      <VisitStyleSelector />
      <InterestSelector />
      <ResumeTypeSelector />
      <ArtMovementSelector />
      <ThemeAndSeasonsSelector />
    </div>
  );
};

export default MesChoix;
