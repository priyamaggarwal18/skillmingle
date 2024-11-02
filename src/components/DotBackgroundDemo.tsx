"use client"
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { ContainerScroll } from "./ui/container-scroll-animation";
import demo from "../../public/demo.png";
import { ImageButtonComponent } from "./ui/ImageButtonComponent";

export function DotBackgroundDemo() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check for user's preference on initial load
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDarkScheme.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    prefersDarkScheme.addEventListener("change", handleChange);
    
    return () => {
      prefersDarkScheme.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`h-full w-full flex flex-col items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-black text-white bg-dot-white/[0.2]' : 'bg-white text-black bg-dot-black/[0.2]'}`}>
      <ImageButtonComponent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <ContainerScroll titleComponent="Collaborate">
        <Image
          src={demo} // Adjust the path as needed
          alt="My Logo" // Provide an alt text for accessibility
          className="h-full w-full object-cover" // Use classes to style the image
        />
      </ContainerScroll>
    </div>
  );
}