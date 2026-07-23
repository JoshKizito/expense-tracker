import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api",
  withCredentials: false,
});

// L'intercepteur d'ajout du token JWT sera branché à l'Étape 6 (Authentification)
