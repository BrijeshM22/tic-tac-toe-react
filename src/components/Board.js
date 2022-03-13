import React, { useState } from "react";
import Square from "./Square";
import Confetti from "react-confetti";
import "../App.css";

export default function Board() {
  const initialValue = Array(9).fill(null);
  const [squares, setSquares] = useState(initialValue);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    const newSqaures = [...squares];

    const winnerDeclared = Boolean(calculateWinner(newSqaures));
    const squarefilled = Boolean(newSqaures[i]);

    if (winnerDeclared || squarefilled) {
      return;
    }

    newSqaures[i] = xIsNext ? "X" : "O";
    setSquares(newSqaures);
    setXIsNext(!xIsNext);
  };

  const handlenewgame = () => {
    setSquares(initialValue);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  const winnereffect = winner && (
    <Confetti width={window.innerWidth} height={window.innerHeight} />
  );

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)} />
    );
  };

  const generateRow = (index, max) => {
    let rows = [];
    for (index; index < max; index++) {
      rows.push(renderSquare(index));
    }
    return rows;
  };

  const generateBoard = (columns, rows) => {
    let board = [];
    for (let i = 0; i < columns * rows; i++) {
      if (i % columns === 0) {
        board.push(
          <div className="board-row" key={i}>
            {generateRow(i, i + columns)}
          </div>
        );
      }
    }
    return board;
  };

  return (
    <div>
      <div className="winner-animation">{winnereffect}</div>
      <div className="status">{status}</div>
      <div>{generateBoard(3, 3)}</div>
      <div className="reset-game-btn">
        <button onClick={handlenewgame}>Reset Game</button>
      </div>
    </div>
  );

  function calculateWinner(sq) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a]; // 'X' or 'O'
      }
    }
    return null;
  }
}
