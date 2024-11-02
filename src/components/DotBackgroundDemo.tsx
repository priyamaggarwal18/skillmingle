"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";
import demo from "../../public/demo.png";
import { ImageButtonComponent } from "./ui/ImageButtonComponent";
import { FloatingNav } from "./ui/navbar";
import { AnimatedTooltip } from "./ui/team";

export function DotBackgroundDemo() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check for user's preference on initial load
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDarkScheme.matches);

    const handleChange = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => {
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
  const people = [
    {
      id: 1,
      name: "Priyam Aggarwal",
      designation: "Team Lead",
      image: "/image/priyam.jpg",
      link: "https://www.linkedin.com/in/priyamaggarwal/",
    },
    {
      id: 2,
      name: "Soham Chakraborty",
      designation: "Frontend Developer",
      image: "/image/soham.jpeg",
      link: "https://www.linkedin.com/in/soham-chakraborty-108450255/",
    },
    {
      id: 3,
      name: "Alisha Vashisht",
      designation: "Frontend Developer",
      image: "/image/alisha.jpeg",
      link: "https://www.linkedin.com/in/alisha-vashisht-56534620b/",
    },
    {
      id: 4,
      name: "Lovish Bansal",
      designation: "Backend Developer",
      image: "/image/lovish.jpg",
      link: "https://www.linkedin.com/in/lovish2584-profile/",
    },
    {
      id: 5,
      name: "Bama Charan ",
      designation: "Backend Developer",
      image: "/image/bama.jpeg",
      link: "https://www.linkedin.com/in/bamacharanchhandogi/",
    },
  ];

  return (
    <>
      <FloatingNav
        className={`${
          isDarkMode
            ? "bg-white  border border-white font-bold"
            : "bg-white  border border-black font-bold"
        }`} // Ensure this color is set correctly
        navItems={[
          { name: "Home", link: "#home" },
          { name: "Features", link: "#features" },
          { name: "Insights", link: "#insights" },
          { name: "Team", link: "#team" },
          { name: "Contact", link: "#contact" },
        ]}
      />
      <div
        className={`h-full w-full flex flex-col items-center justify-center transition-all duration-300 ${
          isDarkMode
            ? "bg-black text-white bg-dot-white/[0.2]"
            : "bg-white text-black bg-dot-black/[0.2]"
        }`}
      >
        <ImageButtonComponent 
          id="home"
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <ContainerScroll titleComponent="Collaboration">
          <Image
            src={demo} // Adjust the path as needed
            alt="My Logo" // Provide an alt text for accessibility
            className="h-full w-full object-cover" // Use classes to style the image
          />
        </ContainerScroll>
{/* Team Section */}
<section className="py-20">
            <div id="team" className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-7xl font-bold mb-20">
                Meet the Team
              </h2>
              <div className="flex flex-wrap justify-center gap-2 scale-150">
                {people.map((person) => (
                  <a
                    key={person.id}
                    href={person.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AnimatedTooltip
                      isDarkMode={isDarkMode}
                      items={[
                        {
                          id: person.id,
                          name: person.name,
                          designation: person.designation,
                          image: person.image,
                        },
                      ]}
                    />
                  </a>
                ))}
              </div>
            </div>
          </section>
      </div>
    </>
  );
}
