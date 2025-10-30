// ArtMovementSelector.jsx
import React, { useState } from 'react';
import './Interest.css';
import SelectorGridItem from '../common/SelectorGridItem';

// Correction et ajustement de votre liste pour garantir des IDs uniques pour React
const initialArtMovements = [
  { id: 'roman1', title: 'roman', style: 'roman', imageUrl: 'assets/images/testmuseum.png' }, 
  { id: 'gothique', title: 'gothique', style: 'gothique', imageUrl: '/assets/images/testmuseum.png' },
  { id: 'renaissance', title: 'renaissance', style: 'renaissance', imageUrl: '/assets/images/testmuseum.png' },
 
];

const InterestSelector = () => {
  // Changement crucial : selectedMovements est maintenant un tableau d'IDs
  const [selectedMovements, setSelectedMovements] = useState([]);

  const handleMovementClick = (movementId) => {
    setSelectedMovements(prevSelected => {
      // Vérifie si l'ID est déjà dans le tableau
      if (prevSelected.includes(movementId)) {
        // Si oui, le retire (désélectionne)
        return prevSelected.filter(id => id !== movementId);
      } else {
        // Si non, l'ajoute (sélectionne)
        return [...prevSelected, movementId];
      }
    });
  };

  return (
    <div className="movement-selector-container">
      <div className="movement-selector-header">
        Quels sont vos centres d intérêts?
      </div>
      
      <div className="movement-selector-grid">
        {initialArtMovements.map((movement) => (
          <SelectorGridItem
            key={movement.id}
            id={movement.id}
            title={movement.title}
            imageUrl={movement.imageUrl}
            textOverlay={movement.textOverlay}
            // Vérifie si l'ID est présent dans le tableau de sélection
            isSelected={selectedMovements.includes(movement.id)}
            onClick={() => handleMovementClick(movement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;