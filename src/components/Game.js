import React from "react";
import Board from "./Board";
import "../App.css";

export default function Game() {
  return (
    <div className="game">
      <div className="title">Tic-Tac-Toe</div>
      <Board />
    </div>
  );
}
