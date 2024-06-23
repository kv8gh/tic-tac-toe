"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import ConfettiBasicCannon from "../component/WinningConfetti";
import Modal from "@/app/component/Modal";

type Player = string | null;

const Board: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("");
  const [winner, setWinner] = useState<Player | "Draw">(null);
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  useEffect(() => {
    if (data === "X" || data === "O") {
      setCurrentPlayer(data);
    } else {
      router.push("/option");
    }
  }, [data]);

  const checkWinner = (board: Player[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningCombo(combo);
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (newBoard.every((square) => square !== null)) {
      setWinner("Draw");
      setIsModalOpen(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handlePlayAgain = () => {
    console.log("play again")
    router.push("/option");
  };

  const handleHome = () => {
    router.push("/");
  };

  const renderSquare = (index: number) => (
    <button
      onClick={() => handleClick(index)}
      className={classNames(
        "w-24 md:w-28 h-24 md:h-28 bg-white border border-gray-400 text-3xl font-bold flex items-center justify-center",
        {
          "text-red-600": board[index] === "X",
          "text-blue-600": board[index] === "O",
        }
      )}
    >
      {board[index]}
    </button>
  );

  const boardClass = classNames(
    "min-h-screen flex flex-col items-center justify-center",
    {
      "bg-red-500":
        (currentPlayer === "X" && !winningCombo) ||
        (winner === "X" && winningCombo),
      "bg-blue-500":
        (currentPlayer === "O" && !winningCombo) ||
        (winner === "O" && winningCombo),
      "bg-gray-500": winner === "Draw",
    }
  );

  return (
    <div className={boardClass}>
      {winningCombo ? (
        <ConfettiBasicCannon
          winner={winner}
          goHome={handleHome}
          playAgain={handlePlayAgain}
        />
      ) : (
        <>
          <div className="relative mb-8 text-3xl text-white">
            {winner
              ? winner === "Draw"
                ? "Game Drawn"
                : `Winner: ${winner}`
              : `Current player: ${currentPlayer}`}
          </div>
          <div className="grid grid-cols-3 gap-1 md:gap-3 relative">
            {board.map((square, index) => (
              <div key={index}>{renderSquare(index)}</div>
            ))}
          </div>
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="Game Drawn!"
        onPlayAgain={handlePlayAgain}
        onHome={handleHome}
      />
    </div>
  );
};

export default Board;
