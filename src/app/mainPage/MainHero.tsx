"use client";

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import debounce from "lodash/debounce";
import MainHeader from "./MainHeader";
import dynamic from "next/dynamic";

const HeroCountDown = dynamic(() => import("./HeroCountDown"), { ssr: false });

function MainHero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [loadingButton, setLoadingButton] = useState<"getStarted" | "learnMore" | null>(null);

  const videos = ["/Pvideo1.mp4", "/Pvideo2.mp4", "/Pvideo3.mp4", "/Pvideo4.mp4"];

  const handleScreenClick = useCallback(
    debounce(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 1000),
    [videos.length]
  );

  const handleNavigation = useCallback((button: "getStarted" | "learnMore") => {
    setLoadingButton(button);
    setTimeout(() => setLoadingButton(null), 1000); 
  }, []);

  return (
    <div
      className="relative h-screen flex flex-col bg-gradient-to-b from-blue-800 to-gray-900"
      onClick={handleScreenClick}
      aria-label="Cycle through background videos"
    >
      {/* Video with poster for faster perceived load */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-1000"
        autoPlay
        muted
        loop
        poster="/placeholder.jpg"
        preload="metadata"
        key={videos[currentVideoIndex]}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm supports-[backdrop-filter]:bg-gray-900/30"></div>

      <MainHeader />

      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          The Future of Poultry Farming <br />
          <span className="text-yellow-400">Starts Here</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl">
          Harness the power of technology to maximize efficiency, reduce waste, 
          and grow your poultry business. SmartPoultry Hub is built for serious farmers who mean business.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/pages/Dashboard"
            className={`flex items-center justify-center ${
              loadingButton === "getStarted" ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-3 px-6 sm:px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
            onClick={() => handleNavigation("getStarted")}
            aria-label="Get started with SmartPoultry Hub"
          >
            {loadingButton === "getStarted" ? "Loading..." : "Get Started"}
          </Link>
          <Link
            href="/pages/About"
            className={`flex items-center justify-center ${
              loadingButton === "learnMore" ? "bg-gray-500 cursor-not-allowed" : "bg-transparent border-2 border-yellow-400 hover:bg-yellow-400"
            } text-yellow-400 hover:text-gray-900 font-semibold py-3 px-6 sm:px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
            onClick={() => handleNavigation("learnMore")}
            aria-label="Learn more about SmartPoultry Hub"
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

export default memo(MainHero);