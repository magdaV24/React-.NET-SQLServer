import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WithProviders } from "./utils/WithProviders.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  WithProviders(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
