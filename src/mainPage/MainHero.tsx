// 



/* eslint-disable react-hooks/exhaustive-deps */
"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "./MainHeader";
import HeroCountDown from "./HeroCountDown";

export default function MainHero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Index of the current video
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // Track video loading state

  const videos = ["/Pvideo1.mp4", "/Pvideo2.mp4", "/Pvideo3.mp4", "/Pvideo4.mp4"]; // Video sources

  useEffect(() => {
    // Interval to change the video
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length); // Move to the next video
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [videos]);

  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/pages/Dashboard");
  };

  return (
    <div className="relative h-screen flex flex-col bg-gradient-to-b from-blue-800 to-gray-900">
      {/* Static Placeholder */}
      {!isVideoLoaded && (
        <img
          src="/placeholder.jpg"
          alt="Loading..."
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Background Videos with Crossfade Effect */}
      {videos.map((video, index) => (
        <video
          key={index}
          className={`absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000 ${
            index === currentVideoIndex
              ? "opacity-100 z-0"
              : "opacity-0 z-10"
          }`}
          autoPlay
          muted
          loop
          onLoadedData={() => setIsVideoLoaded(true)} // Set loading state to true when video is ready
          preload="auto" // Preload video for faster start
        >
          <source src={video} type="video/mp4" />
        </video>
      ))}

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
          <button
            onClick={handleGetStarted}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/pages/About")}
            className="bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-yellow-500 hover:text-black transition transform hover:scale-105"
          >
            Learn More
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
