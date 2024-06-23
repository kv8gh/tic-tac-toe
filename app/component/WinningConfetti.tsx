"use client";

import { useRouter } from "next/navigation";
import type { ConfettiRef } from "./magicui/confetti";
import Confetti from "./magicui/confetti";
import { useEffect, useRef } from "react";

interface WinningConfettiProps {
  winner: string | null;
  goHome : ()=> void;
  playAgain : () => void;
}

const ConfettiBasicCannon: React.FC<WinningConfettiProps> = ({ winner, goHome,playAgain }) => {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className=" flex h-[50vh] w-80 md:w-3/5  flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Player {winner} is Winner
      </span>
      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-0 h-full w-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />

      <button
        onClick={()=>goHome()}
        className="z-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Home
      </button>
      <button
        className="z-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={()=>playAgain()}
      >
        Play Again
      </button>
    </div>
  );
};

export default ConfettiBasicCannon;
