"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";
import demo from "../../public/demo.png";
import { darkButton } from "./ui/darkButton";
import { AnimatedTooltip } from "./ui/team";
import Footer from "./ui/footer";
import Marquee from "./ui/review";
import { people, reviews,testimonialsData} from "./constants/mainpage";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlipWords } from "./ui/flipword";
import { AnimatedTestimonials } from "./ui/features";
import { CardContainer, CardBody, CardItem } from "../../components/ui/contact";
import {motion} from 'framer-motion';
import {fadeIn} from '../components/variants';

export function DotBackgroundDemo() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDarkScheme.matches);

    const handleChange = (e: MediaQueryListEvent) => {
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

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          isDarkMode ? "bg-black/50 text-white" : "bg-white/50 text-black"
        } backdrop-blur-md`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex-shrink-0 mr-18">
              <h4 className="text-2xl font-bold">
                Skill <span className="text-violet-600">Mingle</span>
              </h4>
            </div>
            <nav className="hidden md:block pl-20">
              <ul className="flex space-x-10">
                {["Home", "Features", "Review", "Team", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-primary transition-colors hover:text-gray-200"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              {darkButton({ isDarkMode, toggleDarkMode })}
              <Button className="border-2 border-violet-800 text-buttons-primary py-2 px-6 rounded-md hover:text-violet-400 transition-all">
                Sign Up
              </Button>
              <Button
                className={`transition-all duration-300 ${
                  isDarkMode
                    ? "bg-violet-600 hover:bg-violet-500 text-white"
                    : "bg-violet-600 hover:bg-violet-500 text-white"
                }`}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`h-full w-full flex flex-col items-center justify-center transition-all duration-300 ${
          isDarkMode
            ? "bg-dark-purple-gradient from-[#B9AEDF] to-[#1A1A32] text-white "
            : "bg-white text-black bg-dot-black/[0.2]"
        }`}
      >
        <ContainerScroll
          titleComponent={
            <FlipWords
            words={["Collaboration.", "Teamwork.", "Partnership.", "Technology."]}
            duration={3000} // 2 seconds duration for each word
            className="text-violet-600" // Apply a custom text color
          />
          }
          isDarkMode={isDarkMode} // Pass isDarkMode from parent component
        >
          <Image
            src={demo}
            alt="My Logo"
            className="h-full w-full object-cover"
          />
        </ContainerScroll>

        {/* Features Section */}
        <section id="features" className="w-full h-full my-10">
          <motion.div
          variants={fadeIn("up",0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.5}}
           className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-7xl font-bold">Features</h2>
            <AnimatedTestimonials testimonials={testimonialsData} autoplay={true} />
          </motion.div>
        </section>

        {/* Marquee Section */}
        <div id="review" className="py-10 md:py-20 w-full mb-10">
          <motion.div
          variants={fadeIn("up",0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.5}}
          className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
            <h2 className="text-6xl font-bold mb-20 text-center">
              What Our <span className="text-violet-600">Customers</span> say
            </h2>
            {/* Upper Marquee - Scrolls Right */}
            <Marquee
              reverse={true}
              pauseOnHover
              className="[--duration:20s] select-none"
            >
              {firstRow.map((review, i) => (
          <figure
            key={i}
            className={cn(
              "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
              isDarkMode
                ? "bg-white text-black border-zinc-50/[.1] over:bg-zinc-50/[.15]"
                : "bg-violet-500 text-white border-gray-700"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium">
            {review.name}
                </figcaption>
                <p className="text-xs font-medium text-muted-foreground">
            {review.username}
                </p>
              </div>
            </div>
            <blockquote className="mt-2 text-sm">
              {review.body}
            </blockquote>
          </figure>
              ))}
            </Marquee>

            {/* Lower Marquee - Scrolls Left */}
            <Marquee pauseOnHover className="[--duration:20s] select-none">
              {secondRow.map((review, i) => (
          <figure
            key={i}
            className={cn(
              "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
              isDarkMode
                ? "bg-white text-black border-zinc-50/[.1] over:bg-zinc-50/[.15]"
                : "bg-violet-400 text-white border-gray-700"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium">
            {review.name}
                </figcaption>
                <p className="text-xs font-medium text-muted-foreground">
            {review.username}
                </p>
              </div>
            </div>
            <blockquote className="mt-2 text-sm">
              {review.body}
            </blockquote>
          </figure>
              ))}
            </Marquee>
          </motion.div>
        </div>

        {/* Meet the Team Section */}
        <section className="w-full h-full my-20">
          <motion.div
          variants={fadeIn("up",0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.5}}
           id="team" className="max-w-7xl mx-auto  my-10 px-4 text-center">
            <h2 className="text-7xl font-bold mb-20">
              Meet the <span className="text-violet-600">Team</span>
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
          </motion.div>
        </section>

        <section id="join" className="py-20">
            <motion.div
            variants={fadeIn("up",0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{once:false,amount:0.5}}
             className="max-w-4xl mx-auto px-4 text-center">
              <CardContainer className="inter-var text-center ">
                <CardBody className="bg-violet-500  relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-3xl mx-auto font-bold text-white"
                  >
                    Join Us Today!
                  </CardItem>
                  <CardItem
                    translateZ="60"
                    className="text-white text-lg max-w-sm mt-2 ml-6 dark:text-neutral-300"
                  >
                    Become a part of the future of Collaboration and Task Management
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4 p-4">
                    <Button className=" bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105 w-full">
                      Get Started
                    </Button>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          </section>
      </div>

      <Footer/>
    </>
  );
}
