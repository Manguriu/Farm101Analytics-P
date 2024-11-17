"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MenuIcon, XIcon } from "@heroicons/react/outline"; // Import Heroicons

export default function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-black bg-opacity-70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img
            src="/MainLogo.png"
            alt="SmartPoultry Hub Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain mr-2"
          />
          <h1 className="text-lg sm:text-2xl font-bold text-yellow-500">
            SmartPoultry Hub
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => router.push("/pages/About")}
            className="text-gray-300 hover:text-yellow-500 text-sm font-medium transition"
          >
            About Us
          </button>
          <button
            onClick={() => router.push("/pages/Features")}
            className="text-gray-300 hover:text-yellow-500 text-sm font-medium transition"
          >
            Features
          </button>
          <button
            onClick={() => router.push("/pages/Contact")}
            className="text-gray-300 hover:text-yellow-500 text-sm font-medium transition"
          >
            Contact
          </button>
          {/* <button
            onClick={() => router.push("/pages/Pricing")}
            className="text-gray-300 hover:text-yellow-500 text-sm font-medium transition"
          >
            Pricing
          </button> */}
        </nav>

        {/* Call-to-Action Button */}
        <div className="hidden md:flex">
          <button
            onClick={() => router.push("/pages/Dashboard")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
          >
            {menuOpen ? (
              <XIcon className="h-8 w-8" /> // Close Icon
            ) : (
              <MenuIcon className="h-8 w-8" /> // Hamburger Icon
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 text-gray-300 flex flex-col items-start p-4 space-y-4">
          <button
            onClick={() => {
              router.push("/pages/About");
              setMenuOpen(false);
            }}
            className="hover:text-yellow-500 text-base font-medium transition w-full text-left"
          >
            About Us
          </button>
          <button
            onClick={() => {
              router.push("/pages/Features");
              setMenuOpen(false);
            }}
            className="hover:text-yellow-500 text-base font-medium transition w-full text-left"
          >
            Features
          </button>
          <button
            onClick={() => {
              router.push("/pages/Contact");
              setMenuOpen(false);
            }}
            className="hover:text-yellow-500 text-base font-medium transition w-full text-left"
          >
            Contact
          </button>
          {/* <button
            onClick={() => {
              router.push("/pages/Pricing");
              setMenuOpen(false);
            }}
            className="hover:text-yellow-500 text-base font-medium transition w-full text-left"
          >
            Pricing
          </button> */}
          <button
            onClick={() => {
              router.push("/pages/Dashboard");
              setMenuOpen(false);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg w-full text-center transition"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
