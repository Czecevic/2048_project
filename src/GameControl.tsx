import { useEffect, useState } from "react";
import {
  getEmptyBoard,
  generateRandom,
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
  isOver,
} from "./GameBoard";

const Cell = ({ number }: { number: number }) => {
  return (
    <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
  );
};

const GameControl = () => {
  const [board, setBoard] = useState(generateRandom(getEmptyBoard()));
  const [looseGame, setLooseGame] = useState<boolean>(false);

  const move = (direction: string) => {
    let newBoard;
    switch (direction) {
      case "left":
        newBoard = moveLeft(board);
        break;
      case "right":
        newBoard = moveRight(board);
        break;
      case "up":
        newBoard = moveUp(board);
        break;
      case "down":
        newBoard = moveDown(board);
        break;
      default:
        return;
    }
    setBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const checkEndGame = () => {
    if (isOver(board)) {
      setLooseGame(true);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown":
        move(e.key.substr(5).toLowerCase());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <div className="sous-container">
      <div className="game-board">
        {board.map((row, i) => (
          <div key={`row-${i}`} className="row">
            {row.map((cell, j) => (
              <Cell key={`cell-${i}-${j}`} number={cell} />
            ))}
          </div>
        ))}
      </div>
      {looseGame === true && (
        <div className="looseGame">
          <h1>Vous avez perdu !</h1>
          <button>
            <a href="/">relancer</a>
          </button>
        </div>
      )}
    </div>
  );
};

export default GameControl;
