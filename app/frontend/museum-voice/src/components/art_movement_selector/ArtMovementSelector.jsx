import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArtMovementSelector.css';
import SelectorGridItem from '../common/SelectorGridItem';

const ArtMovementSelector = ({ onSelectionChange }) => {
  // State to hold the list of movements fetched from the API
  const [artMovements, setArtMovements] = useState([]);
  const [selectedMovements, setSelectedMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchCriterias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_criterias');
        const allCriterias = response.data.criterias || [];

        // Filter for type 'style' to match previous hardcoded data context (art movements)
        const styleCriterias = allCriterias.filter(c => c.type === 'style');

        // Map backend data to the shape expected by the UI
        const mappedMovements = styleCriterias.map(c => ({
          id: c.criteria_id,
          name: c.name,
          style: c.name, // Using name as style, similar to hardcoded data
          image_link: c.image_link || '/assets/images/testmuseum.png' // Fallback if empty
        }));

        setArtMovements(mappedMovements);

        // Default: first movement selected (if available)
        if (mappedMovements.length > 0) {
          setSelectedMovements([mappedMovements[0].id]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching criterias:", err);
        setError("Impossible de charger les mouvements.");
        setLoading(false);
      }
    };

    fetchCriterias();
  }, []);

  const handleMovementClick = (movementId) => {
    setSelectedMovements(prevSelected => {
      if (prevSelected.includes(movementId)) {
        // Prevent deselecting the last one
        if (prevSelected.length > 1) {
          return prevSelected.filter(id => id !== movementId);
        } else {
          return prevSelected;
        }
      } else {
        return [...prevSelected, movementId];
      }
    });
  };

  // Notify parent automatically on selection change
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedMovements);
    }
  }, [selectedMovements, onSelectionChange]);

  if (loading) {
    return <div className="movement-selector-container">Chargement...</div>;
  }

  if (error) {
    return <div className="movement-selector-container">{error}</div>;
  }

  return (
    <div className="movement-selector-container">
      <div className="movement-selector-header">
        Vos mouvements préférés ?
      </div>

      <div className="movement-selector-grid">
        {artMovements.map((movement) => (
          <SelectorGridItem
            key={movement.id}
            id={movement.id}
            name={movement.name}
            image_link={movement.image_link}
            textOverlay={movement.textOverlay}
            isSelected={selectedMovements.includes(movement.id)}
            onClick={() => handleMovementClick(movement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtMovementSelector;
