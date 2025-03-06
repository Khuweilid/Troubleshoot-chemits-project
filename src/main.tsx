import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Initialize Tempo Devtools if available
try {
  const { TempoDevtools } = require("tempo-devtools");
  TempoDevtools.init();
} catch (error) {
  console.log("Tempo devtools not available, skipping initialization");
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
