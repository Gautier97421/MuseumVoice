import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class CriteriaStore {
  criteriaNarration = [];
  criteriaCourantArtistique = [];
  criteriaMovement = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Define the API call directly in the store
  getCriteria = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get_criteria");
      return response.data.criteria; // Return only the criteria array
    } catch (error) {
      console.error("Error fetching criteria:", error);
      throw error;
    }
  };

  fetchCriteria = async () => {
    this.loading = true;
    this.error = null;

    try {
      const data = await this.getCriteria();

      runInAction(() => {
        // Split criteria into three arrays based on 'type'
        this.criteriaNarration = data.filter(c => c.type === "narration");
        this.criteriaCourantArtistique = data.filter(c => c.type === "courantArtistique");
        this.criteriaMovement = data.filter(c => c.type === "movement");
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || "Error fetching criteria";
        this.loading = false;
      });
    }
  };
}

export const criteriaStore = new CriteriaStore();
