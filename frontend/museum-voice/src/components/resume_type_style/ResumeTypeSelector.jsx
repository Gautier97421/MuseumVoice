// ResumeTypeSelector.jsx
import React, { useState } from 'react';
import './ResumeTypeSelector.css';
import SelectorItem from '../common/SelectorItem'; // Assurez-vous que ce chemin est correct

const initialResumeTypes = [
  { id: 'standard', title: 'Standard', description: 'Comme au musée.', icon: '🏆' },
  { id: 'biographie', title: 'Biographie', description: 'Parcours, influences et vie de l\'artiste.', icon: '✍️' },
  { id: 'histoire', title: 'Histoire', description: 'Contexte historique et regard sur l\'époque.', icon: '⏳' },
  { id: 'culture', title: 'Culture', description: 'Contexte artistique, mouvement, contemporains.', icon: '🤝' },
  { id: 'anecdotes', title: 'Anecdotes', description: 'Petites histoires, secrets d\'atelier.', icon: '💬' },
  { id: 'technique', title: 'Technique', description: 'Composition, matériaux et savoir-faire.', icon: '⚙️' },
];

const ResumeTypeSelector = () => {
  // L'état initial est 'anecdotes' pour correspondre à l'image où il est en surbrillance
  const [selectedType, setSelectedType] = useState('anecdotes');

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
            onClick={() => setSelectedType(type.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeTypeSelector;