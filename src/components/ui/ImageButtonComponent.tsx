"use client"; // Ensure this component is rendered on the client side
import React from "react";
import Image from 'next/image';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing icons from react-icons

export function ImageButtonComponent({ isDarkMode, toggleDarkMode }) {
  return (
    <div className={`flex items-center justify-between p-4 w-full h-20 transition-all duration-300 bg-transparent`}>
      {/* Left Side: Image */}
      <div className="w-1/2">
        <Image
          src={"/logo.png"} // Adjust the path as needed
          alt="My Logo"
          className="h-auto w-full object-cover rounded-lg"
          layout="responsive"
          width={50}
          height={50} // Replace with actual width
          priority
        />
      </div>

      {/* Right Side: Round Icon Button */}
      <button
        onClick={toggleDarkMode}
        className={`ml-4 p-2 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-black'} text-white transition duration-300 hover:bg-gray-600`}
      >
        {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </div>
  );
}