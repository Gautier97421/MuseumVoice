import React, { useState, useEffect } from 'react';
import './VisitStyleSelector.css';
import SelectorItem from '../common/SelectorItem';

const Icons = {
  Rapide: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Equilibre: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20h12M12 4v16M6 10a4 4 0 0112 0" />
      <circle cx="6" cy="10" r="2" />
      <circle cx="18" cy="10" r="2" />
    </svg>
  ),
  Approfondi: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Famille: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Comtemplatif: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Decouverte: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Thematique: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5 10 10 0 0 0-10 10"></path>
      <path d="M14.5 9a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
    </svg>
  ),
};

const initialVisitStyles = [
  { id: 'rapide', title: 'Rapide', description: 'Points essentiels, informations clés', icon: <Icons.Rapide /> },
  { id: 'equilibre', title: 'Équilibré', description: 'Équilibre entre culture et découverte', icon: <Icons.Equilibre /> },
  { id: 'approfondi', title: 'Approfondi', description: 'Analyses expertes, contexte historique', icon: <Icons.Approfondi /> },
  { id: 'famille', title: 'Famille', description: 'Ludique et accessible aux enfants', icon: <Icons.Famille /> },
  { id: 'comtemplatif', title: 'Comtemplatif', description: 'Réflexion et émotion', icon: <Icons.Comtemplatif /> },
  { id: 'decouverte', title: 'Découverte', description: 'À la découverte d’oeuvres surprenantes', icon: <Icons.Decouverte /> },
  { id: 'thematique', title: 'Thématique', description: 'Parcours avec une cohérence narrative', icon: <Icons.Thematique /> },
];

const VisitStyleSelector = ({ onStyleChange }) => {
  const [selectedStyle, setSelectedStyle] = useState('approfondi');

  useEffect(() => {
    if (onStyleChange) onStyleChange(selectedStyle);
  },);

  const handleSelect = (id) => {
    setSelectedStyle(id);
    if (onStyleChange) onStyleChange(id);
  };

  return (
    <div className="visit-selector-container">
      <div className="selector-header">
        Quel style de visite préférez-vous?
      </div>

      <div className="selector-list">
        {initialVisitStyles.map((style) => (
          <SelectorItem
            key={style.id}
            icon={style.icon}
            title={style.title}
            description={style.description}
            isSelected={selectedStyle === style.id}
            onClick={() => handleSelect(style.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VisitStyleSelector;
