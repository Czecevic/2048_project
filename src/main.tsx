import React from "react";
import ReactDOM from "react-dom/client";
import GameControl from "./GameControl";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="container">
      <h1>2048 Game</h1>
      <GameControl />
    </div>
  </React.StrictMode>
);
