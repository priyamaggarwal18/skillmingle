import React from "react";
import Image from 'next/image';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing icons from react-icons

interface DarkButtonProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function darkButton({ isDarkMode, toggleDarkMode }: DarkButtonProps) {
  return (
      <>
      <button
        onClick={toggleDarkMode}
        className={`ml-4 p-2 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-black'} text-white transition duration-300 hover:bg-gray-600`}
      >
        {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
      </>
  );
}