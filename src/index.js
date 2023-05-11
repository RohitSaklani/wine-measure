import React from "react";
import ReactDOM from "react-dom/client";
import { WineDataContext } from "./context/WineDataContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WineDataContext>
      <App />
    </WineDataContext>
  </React.StrictMode>
);
