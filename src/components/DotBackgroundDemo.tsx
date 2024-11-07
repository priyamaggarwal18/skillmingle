"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ContainerScroll } from "./ui/container-scroll-animation"
import { FeaturesSectionDemo } from "./ui/feature"
import demo from "../../public/demo.png"
import { darkButton } from "./ui/darkButton"
import { AnimatedTooltip } from "./ui/team"
import Footer from "./ui/footer"
import Marquee from "./ui/slider"
import { people, reviews } from "./constants/mainpage"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DotBackgroundDemo() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(prefersDarkScheme.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    prefersDarkScheme.addEventListener("change", handleChange)

    return () => {
      prefersDarkScheme.removeEventListener("change", handleChange)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  return (
    <>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode ? "bg-black/50 text-white" : "bg-white/50 text-black"
      } backdrop-blur-md`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex-shrink-0 mr-18">
              <span className="text-2xl font-bold">SkillMingle</span>
            </div>
            <nav className="hidden md:block pl-20">
              <ul className="flex space-x-10">
                {["Home", "Features", "Reviews", "Team", "Contact"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors hover:text-gray-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              {darkButton({ isDarkMode, toggleDarkMode })}
              <Button className="hover:text-gray-200">Sign Up</Button>
              <Button className="bg-blue-700 hover:bg-blue-600">Start Free Trial</Button>
            </div>
          </div>
        </div>
      </header>

      <div className={`h-full w-full flex flex-col items-center justify-center transition-all duration-300 ${isDarkMode ? "bg-black text-white bg-dot-white/[0.2]" : "bg-white text-black bg-dot-black/[0.2]"}`}>
        
        
        <ContainerScroll titleComponent={<span className="text-blue-500">Collaboration</span>}>
          <Image src={demo} alt="My Logo" className="h-full w-full object-cover" />
        </ContainerScroll>

        {/* Features Section */}
        <section id="features" className="w-full h-full my-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-7xl font-bold">Features</h2>
              <FeaturesSectionDemo />
          </div>
        </section>

        {/* Marquee Section */}
        <div id="review" className="py-10 md:py-20 w-full mb-10">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
          <h2 className="text-6xl font-bold mb-20">What Our <span className="text-blue-500">Customers</span> say</h2>
            {/* Upper Marquee - Scrolls Right */}
            <Marquee reverse={true} pauseOnHover className="[--duration:20s] select-none">
              {firstRow.map((review, i) => (
                <figure
                key={i}
                className={cn(
                  "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                  isDarkMode 
                    ? "bg-white text-black border-zinc-50/[.1] over:bg-zinc-50/[.15]" 
                    : "bg-blue-500 text-white border-gray-700"
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  <div className="flex flex-col">
                    <figcaption className="text-sm font-medium">{review.name}</figcaption>
                    <p className="text-xs font-medium text-muted-foreground">{review.username}</p>
                  </div>
                </div>
                <blockquote className="mt-2 text-sm">{review.body}</blockquote>
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
                    : "bg-blue-500 text-white border-gray-700"
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  <div className="flex flex-col">
                    <figcaption className="text-sm font-medium">{review.name}</figcaption>
                    <p className="text-xs font-medium text-muted-foreground">{review.username}</p>
                  </div>
                </div>
                <blockquote className="mt-2 text-sm">{review.body}</blockquote>
              </figure>
              ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <section className="w-full h-full my-20">
          <div id="team" className="max-w-7xl mx-auto  my-10 px-4 text-center">
            <h2 className="text-7xl font-bold mb-20">Meet the <span className="text-blue-500">Team</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-2 scale-150">
              {people.map((person) => (
                <a key={person.id} href={person.link} target="_blank" rel="noopener noreferrer">
                  <AnimatedTooltip
                    isDarkMode={isDarkMode}
                    items={[{ id: person.id, name: person.name, designation: person.designation, image: person.image }]}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  )
}