import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";

// Les routes protégées (Dashboard, Expenses...) seront ajoutées à l'Étape 6 (Authentification)
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
