import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ThemeAndSeasons.css';
import SelectorGridItem from '../common/SelectorGridItem';

const ThemeAndSeasonsSelector = ({ onSelectionChange }) => {
  const [themes, setThemes] = useState([]);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_criterias');
        const allCriterias = response.data.criterias || [];

        // Filter for type 'narration' for themes/seasons
        const themeCriterias = allCriterias.filter(c => c.type === 'narration');

        const mappedThemes = themeCriterias.map(c => ({
          id: c.criteria_id,
          name: c.name,
          style: c.name,
          image_link: c.image_link || '/assets/images/testmuseum.png'
        }));

        setThemes(mappedThemes);

        // Default to first movement
        if (mappedThemes.length > 0) {
          setSelectedMovement(mappedThemes[0].id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching themes:", err);
        setError("Impossible de charger les thèmes.");
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleMovementClick = (movementId) => {
    setSelectedMovement(movementId);
  };

  // Notify parent whenever selection changes
  useEffect(() => {
    if (onSelectionChange && selectedMovement !== null) {
      onSelectionChange([selectedMovement]);
    }
  }, [selectedMovement, onSelectionChange]);

  if (loading) return <div className="movement-selector-container">Chargement...</div>;
  if (error) return <div className="movement-selector-container">{error}</div>;

  return (
    <div className="movement-selector-container">
      <div className="movement-selector-header">
        Thèmes & saisons
      </div>

      <div className="movement-selector-grid">
        {themes.map((movement) => (
          <SelectorGridItem
            key={movement.id}
            id={movement.id}
            name={movement.name}
            image_link={movement.image_link}
            textOverlay={movement.textOverlay}
            isSelected={selectedMovement === movement.id}
            onClick={() => handleMovementClick(movement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeAndSeasonsSelector;
