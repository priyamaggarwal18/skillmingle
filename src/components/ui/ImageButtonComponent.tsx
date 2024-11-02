"use client"; // Ensure this component is rendered on the client side
import React from "react";
import Image from 'next/image';

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

      {/* Right Side: Button */}
      <button
        onClick={toggleDarkMode}
        className={`ml-4 p-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}
      >
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}