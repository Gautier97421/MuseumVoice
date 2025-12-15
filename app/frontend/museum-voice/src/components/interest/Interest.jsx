import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Interest.css';
import SelectorGridItem from '../common/SelectorGridItem';

const InterestSelector = ({ onSelectionChange }) => {
  const [interests, setInterests] = useState([]);
  const [selectedMovements, setSelectedMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_criterias');
        const allCriterias = response.data.criterias || [];

        // Filter for type 'caractéristique' for interests
        const interestCriterias = allCriterias.filter(c => c.type === 'caractéristique');

        const mappedInterests = interestCriterias.map(c => ({
          id: c.criteria_id,
          name: c.name,
          style: c.name,
          image_link: c.image_link || '/assets/images/testmuseum.png'
        }));

        setInterests(mappedInterests);

        // Start with the first movement selected by default if available
        if (mappedInterests.length > 0) {
          setSelectedMovements([mappedInterests[0].id]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching interests:", err);
        setError("Impossible de charger les intérêts.");
        setLoading(false);
      }
    };

    fetchInterests();
  }, []);

  const handleMovementClick = (movementId) => {
    setSelectedMovements((prevSelected) => {
      // If clicked item is already selected, prevent deselecting the last one
      if (prevSelected.includes(movementId)) {
        // Only allow deselecting if there's more than one selected
        if (prevSelected.length > 1) {
          return prevSelected.filter((id) => id !== movementId);
        } else {
          return prevSelected; // ❌ Don’t deselect the only selected item
        }
      } else {
        // Otherwise, add the new selection
        return [...prevSelected, movementId];
      }
    });
  };

  // 🔁 Notify parent whenever selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedMovements);
    }
  }, [selectedMovements, onSelectionChange]);

  if (loading) return <div className="movement-selector-container">Chargement...</div>;
  if (error) return <div className="movement-selector-container">{error}</div>;

  return (
    <div className="movement-selector-container">
      <div className="movement-selector-header">
        Quels sont vos centres d’intérêts ?
      </div>

      <div className="movement-selector-grid">
        {interests.map((movement) => (
          <SelectorGridItem
            key={movement.id}
            id={movement.id}
            name={movement.name}
            image_link={movement.image_link}
            isSelected={selectedMovements.includes(movement.id)}
            onClick={() => handleMovementClick(movement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;
