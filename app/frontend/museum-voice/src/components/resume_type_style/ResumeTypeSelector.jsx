// ResumeTypeSelector.jsx
import React, { useState, useEffect } from 'react';
import './ResumeTypeSelector.css';
import SelectorItem from '../common/SelectorItem';

const Icons = {
  Standard: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      <path d="M12 11l-1 2-2 0 1.5 1.5-.5 2.5 2-1.5 2 1.5-.5-2.5 1.5-1.5-2 0-1-2z" fill="currentColor" stroke="none" />
    </svg>
  ),
  Biographie: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      <path d="M12 6h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M8 6h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M8 14h.01"></path>
      <path d="M17 16l-3-4"></path>
      <path d="M14 12l2 4"></path>
    </svg>
  ),
  Histoire: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Culture: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5 10 10 0 0 0-10 10"></path>
      <circle cx="9" cy="9" r="2"></circle>
      <path d="M15 9h.01"></path>
      <path d="M12 15h.01"></path>
    </svg>
  ),
  Anecdotes: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  Technique: () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
};

const initialResumeTypes = [
  { id: 'standard', title: 'Standard', description: 'Comme au musée.', icon: <Icons.Standard /> },
  { id: 'biographie', title: 'Biographie', description: "Parcours, influences et vie de l'artiste.", icon: <Icons.Biographie /> },
  { id: 'histoire', title: 'Histoire', description: "Contexte historique et regard sur l'époque.", icon: <Icons.Histoire /> },
  { id: 'culture', title: 'Culture', description: 'Contexte artistique, mouvement, contemporains.', icon: <Icons.Culture /> },
  { id: 'anecdotes', title: 'Anecdotes', description: "Petites histoires, secrets d'atelier.", icon: <Icons.Anecdotes /> },
  { id: 'technique', title: 'Technique', description: 'Composition, matériaux et savoir-faire.', icon: <Icons.Technique /> },
];

const ResumeTypeSelector = ({ onTypeChange }) => {
  // ✅ Default selection (first one or a specific default like "anecdotes")
  const [selectedType, setSelectedType] = useState('anecdotes');

  // 🔁 Notify parent every time the selection changes
  useEffect(() => {
    if (onTypeChange) {
      onTypeChange(selectedType);
    }
  }, [selectedType, onTypeChange]);

  const handleSelect = (typeId) => {
    setSelectedType(typeId);
  };

  return (
    <div className="resume-selector-container">
      <div className="selector-header">
        Quel type de résumé voulez-vous ?
      </div>

      <div className="selector-list">
        {initialResumeTypes.map((type) => (
          <SelectorItem
            key={type.id}
            icon={type.icon}
            title={type.title}
            description={type.description}
            isSelected={selectedType === type.id}
            onClick={() => handleSelect(type.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeTypeSelector;
