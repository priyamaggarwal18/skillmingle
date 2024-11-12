"use client";

import React, { useState, useEffect } from 'react';
import { DotBackgroundDemo } from '@/src/components/DotBackgroundDemo';
import Spinner from 'react-spinkit';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., 2 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container relative">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen mt-16">
          <Spinner name="ball-spin-fade-loader" className='mt-2' color="#7C3AED" fadeIn="none" />
        </div>
      ) : (
        <DotBackgroundDemo />
      )}
    </div>
  );
};

export default HomePage;
