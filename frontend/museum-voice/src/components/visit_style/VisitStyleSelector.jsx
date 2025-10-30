// VisitStyleSelector.jsx
import React, { useState } from 'react';
import './VisitStyleSelector.css';
import SelectorItem from '../common/SelectorItem';

const initialVisitStyles = [
  { id: 'rapide', title: 'Rapide', description: 'Points essentiels, informations clés', icon: '⏱️' },
  { id: 'equilibre', title: 'Équilibré', description: 'Équilibre entre culture et découverte', icon: '⚖️' },
  { id: 'approfondi', title: 'Approfondi', description: 'Analyses expertes, contexte historique', icon: '📜' },
  { id: 'famille', title: 'Famille', description: 'Ludique et accessible aux enfants', icon: '👨‍👩‍👧‍👦' },
  { id: 'comtemplatif', title: 'Comtemplatif', description: 'Réflexion et émotion', icon: '🧠' },
  { id: 'decouverte', title: 'Découverte', description: 'À la découverte d’oeuvres surprenantes', icon: '🔍' },
  { id: 'thematique', title: 'Thématique', description: 'Parcours avec une cohérence narrative', icon: '⚙️' },
];

const VisitStyleSelector = () => {
  const [selectedStyle, setSelectedStyle] = useState('approfondi');

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
            onClick={() => setSelectedStyle(style.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VisitStyleSelector;
