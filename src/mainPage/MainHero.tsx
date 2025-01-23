"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "./MainHeader";
import HeroCountDown from "./HeroCountDown";
import { Button } from "@/app/lib/presentation/components/ui/button/Button";

export default function MainHero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0); // Index of the current video
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false); // Track video loading state
  const [loadingButton, setLoadingButton] = useState<"getStarted" | "learnMore" | null>(null); // Track which button is loading

  const router = useRouter();

  const videos = ["/Pvideo1.mp4", "/Pvideo2.mp4", "/Pvideo3.mp4", "/Pvideo4.mp4"]; // Video sources

  // Prefetch routes for smoother navigation
  useEffect(() => {
    router.prefetch("/pages/Dashboard");
    router.prefetch("/pages/About");
  }, [router]);

  const handleScreenClick = () => {
    // Change to the next video in the array
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const handleNavigation = async (path: string, button: "getStarted" | "learnMore") => {
    setLoadingButton(button);
    try {
      await router.push(path); // Handle navigation
    } finally {
      setLoadingButton(null); // Reset loading state
    }
  };

  return (
    <div
      className="relative h-screen flex flex-col bg-gradient-to-b from-blue-800 to-gray-900"
      onClick={handleScreenClick} // Trigger video change on click
    >
      {/* Static Placeholder */}
      {!isVideoLoaded && (
        <img
          src="/placeholder.jpg"
          alt="Loading..."
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Active Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000"
        autoPlay
        muted
        loop
        onLoadedData={() => setIsVideoLoaded(true)} // Set loading state to true when video is ready
        preload="auto" // Preload video for faster start
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Header */}
      <MainHeader />

      {/* Content */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 relative z-10">
        {/* Tagline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          The Future of Poultry Farming <br />
          <span className="text-yellow-500">Starts Here</span>
        </h1>
        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl">
          Harness the power of technology to maximize efficiency, reduce waste, 
          and grow your poultry business. SmartPoultry Hub is built for serious farmers who mean business.
        </p>
        <Button variant="default" size="lg">
          Check
        </Button>

        {/* Call-to-Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleNavigation("/pages/Dashboard", "getStarted")}
            className={`${
              loadingButton === "getStarted" ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            } text-black font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition`}
            disabled={loadingButton === "getStarted"}
          >
            {loadingButton === "getStarted" ? "Loading..." : "Get Started"}
          </button>
          <button
            onClick={() => handleNavigation("/pages/About", "learnMore")}
            className={`${
              loadingButton === "learnMore" ? "bg-gray-500 cursor-not-allowed" : "bg-transparent border-2 border-yellow-500 hover:bg-yellow-500"
            } text-yellow-500 hover:text-black font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition`}
            disabled={loadingButton === "learnMore"}
          >
            {loadingButton === "learnMore" ? "Loading..." : "Learn More"}
          </button>
        </div>

        {/* Business Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <HeroCountDown />
        </div>
      </div>
    </div>
  );
}
