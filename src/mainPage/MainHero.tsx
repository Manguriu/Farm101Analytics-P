"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/navigation";
import MainHeader from "./MainHeader";
import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";

const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function MainHero() {
  const router = useRouter(); // Initialize useRouter

  const handleGetStarted = () => {
    router.push("/pages/Dashboard"); 
  };

  return (
    <div
      className="relative overflow-hidden h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(1, 0, 0, 1)), url('/MainHero5.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main Header */}
      <MainHeader />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between px-8 py-16 space-y-8 md:space-y-0 md:space-x-12 gap-2">
          
          {/* Left Text Section */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start w-3/4">
            <h1 className="text-5xl font-bold text-green-600 mb-4">
              Optimize Your Poultry Management with SmartPoultry Hub
            </h1>
            <p className="text-xl text-white mb-4">
              SmartPoultry Hub is designed to streamline poultry management and boost productivity for your farm.
            </p>
            <button
              onClick={handleGetStarted} // Attach the click handler
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full"
            >
              Get Started
            </button>
            <p className="text-sm text-red-500 mt-2">Limited Time Offer: Start Free Trial Today!</p>
            <p className="text-sm text-white mt-4">Trusted by over 1,000 poultry farms worldwide</p>
          </div>

          {/* Carousel Section */}
          <div className="w-full md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden shadow-lg">
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              <div>
                <img src="/mainHero1.png" className="w-full h-[400px] object-cover rounded-lg" />
              </div>
              <div>
                <img src="/mainHero2.png" className="w-full h-[400px] object-cover rounded-lg" />
              </div>
              <div>
                <img src="/MainHero5.png" className="w-full h-[400px] object-cover rounded-lg" />
              </div>
              <div>
                <img src="/MainHero4.png" className="w-full h-[400px] object-cover rounded-lg" />
              </div>
              <div>
                <img src="/MainLogo.png" className="w-full h-[400px] object-cover rounded-lg" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
