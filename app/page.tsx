import React from "react";
import { BackgroundBeams } from "./component/ui/background-beams";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[40rem] min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          TIC TAC TOE
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-lg text-center relative z-10">
          Welcome to Site
        </p>
        
      </div>
      <Link
          className="z-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          href={'/option'}
        >
          {" "}
          Click to Start{" "}
        </Link>
      <BackgroundBeams />
    </div>
  );
}
