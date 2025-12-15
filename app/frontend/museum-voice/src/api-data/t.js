const axios = require("axios");
async function fetchCriterias() {
  const apiUrl = "http://127.0.0.1:8000/api/get_criterias";

  try {
    const response = await axios.get(apiUrl);

    // La requête a réussi.
    // 'response.data' contient les données renvoyées par l'API.
    console.log("Données reçues avec succès (méthode async/await):");
    console.log(response.data);
    
    // [Inference] Vous pouvez retourner les données pour les utiliser ailleurs
    return response.data;
  } catch (error) {
    // La requête a échoué.
    console.error("Erreur lors de la récupération des critères (méthode async/await):", error.message);

    if (error.response) {
      console.error("Statut HTTP:", error.response.status);
      console.error("Corps de l'erreur:", error.response.data);
    }
    // [Inference] Il est souvent utile de relancer l'erreur ou de retourner une valeur par défaut.
    throw error; 
  }
}

// Appeler la fonction asynchrone pour l'exécuter
fetchCriterias();