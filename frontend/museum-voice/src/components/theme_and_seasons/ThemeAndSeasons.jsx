// ArtMovementSelector.jsx
import React, { useState } from 'react';
import './ThemeAndSeasons.css';
import SelectorGridItem from '../common/SelectorGridItem';

const initialArtMovements = [
  { id: 'roman1', title: 'roman', style: 'roman', imageUrl: 'assets/images/testmuseum.png' }, 
  { id: 'gothique', title: 'gothique', style: 'gothique', imageUrl: '/assets/images/testmuseum.png' },
  { id: 'renaissance', title: 'renaissance', style: 'renaissance', imageUrl: '/assets/images/testmuseum.png' },
];

const ThemeAndSeasonsSelector = () => {
  // ✅ Default to first movement so one is *always* selected
  const [selectedMovement, setSelectedMovement] = useState(initialArtMovements[0].id);

  const handleMovementClick = (movementId) => {
    // ✅ Only change selection; never allow deselection
    setSelectedMovement(movementId);
  };

  return (
    <div className="movement-selector-container">
      <div className="movement-selector-header">
        Thèmes & saisons
      </div>
      
      <div className="movement-selector-grid">
        {initialArtMovements.map((movement) => (
          <SelectorGridItem
            key={movement.id}
            id={movement.id}
            title={movement.title}
            imageUrl={movement.imageUrl}
            textOverlay={movement.textOverlay}
            // ✅ Only one can be selected
            isSelected={selectedMovement === movement.id}
            onClick={() => handleMovementClick(movement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeAndSeasonsSelector;
