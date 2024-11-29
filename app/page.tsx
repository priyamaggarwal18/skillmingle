'use client';

import React, { useState, useEffect } from 'react';
import { DotBackgroundDemo } from '@/src/components/DotBackgroundDemo';
import Spinner from 'react-spinkit';
import { SidebarLink } from '@/components/ui/dashbaord/sidebar';

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
                <div className="flex justify-center items-center min-h-screen min-w-full">
                    <Spinner
                        name="ball-spin-fade-loader"
                        color="#7C3AED"
                        fadeIn="none"
                    />
                </div>
            ) : (
                <DotBackgroundDemo />
            )}
        </div>
    );
};

export default HomePage;
