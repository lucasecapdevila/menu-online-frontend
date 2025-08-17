import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/tailwind.css";
import "./assets/styles/globals.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
