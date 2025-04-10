import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; 
import { ItemProvider } from "./context/ItemContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ItemProvider>
        <App />
      </ItemProvider>
    </BrowserRouter>
  </React.StrictMode>
);
