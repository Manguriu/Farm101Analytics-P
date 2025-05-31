"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import debounce from "lodash/debounce";
import MainHeader from "./MainHeader";
import dynamic from "next/dynamic";

// Dynamically import HeroCountDown to reduce initial bundle size
const HeroCountDown = dynamic(() => import("./HeroCountDown"), { ssr: false });

export default function MainHero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<"getStarted" | "learnMore" | null>(null);

  const videos = ["/Pvideo1.mp4", "/Pvideo2.mp4", "/Pvideo3.mp4", "/Pvideo4.mp4"];

  // Debounce video transitions to prevent rapid clicks
  const handleScreenClick = useCallback(
    debounce(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 1000),
    [videos.length]
  );

  // Memoized navigation handler
  const handleNavigation = useCallback((button: "getStarted" | "learnMore") => {
    setLoadingButton(button);
  }, []);

  return (
    <div
      className="relative h-screen flex flex-col bg-gradient-to-b from-blue-800 to-gray-900"
      onClick={handleScreenClick}
    >
      {/* Video with poster for faster perceived load */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000"
        autoPlay
        muted
        loop
        poster="/placeholder.jpg"
        onLoadedData={() => setIsVideoLoaded(true)}
        preload="auto"
        key={videos[currentVideoIndex]} 
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

        {/* Call-to-Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/pages/Dashboard"
            className={`${
              loadingButton === "getStarted" ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            } text-black font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition`}
            onClick={() => handleNavigation("getStarted")}
          >
            {loadingButton === "getStarted" ? "Loading..." : "Get Started"}
          </Link>
          <Link
            href="/pages/About"
            className={`${
              loadingButton === "learnMore" ? "bg-gray-500 cursor-not-allowed" : "bg-transparent border-2 border-yellow-500 hover:bg-yellow-500"
            } text-yellow-500 hover:text-black font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition`}
            onClick={() => handleNavigation("learnMore")}
          >
            {loadingButton === "learnMore" ? "Loading..." : "Learn More"}
          </Link>
        </div>

        {/* Business Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <HeroCountDown />
        </div>
      </div>
    </div>
  );
}