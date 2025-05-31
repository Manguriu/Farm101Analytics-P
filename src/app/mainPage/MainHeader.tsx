"use client";

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Memoized toggle handler
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="top-0 left-0 right-0 z-20 bg-grey-900 bg-opacity-80 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/MainLogo.png"
            alt="SmartPoultry Hub Logo"
            width={48}
            height={48}
            priority
            className="object-contain mr-2"
          />
          <h1 className="text-xl sm:text-2xl font-extrabold text-yellow-400">
            SmartPoultry Hub
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/pages/About"
            className="text-gray-200 hover:text-yellow-400 text-sm font-medium transition-colors duration-200"
          >
            About Us
          </Link>
          <Link
            href="/pages/Features"
            className="text-gray-200 hover:text-yellow-400 text-sm font-medium transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="/pages/Contact"
            className="text-gray-200 hover:text-yellow-400 text-sm font-medium transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Call-to-Action Button */}
        <div className="hidden md:flex gap-4">
          <Link
            href="/pages/Login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Login/Register
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-yellow-400 hover:text-yellow-500 focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-900 bg-opacity-95 text-gray-200 flex flex-col items-start p-6 space-y-4 animate-slide-down">
          <Link
            href="/pages/About"
            className="hover:text-yellow-400 text-base font-medium transition-colors duration-200 w-full text-left"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <Link
            href="/pages/Features"
            className="hover:text-yellow-400 text-base font-medium transition-colors duration-200 w-full text-left"
            onClick={toggleMenu}
          >
            Features
          </Link>
          <Link
            href="/pages/Contact"
            className="hover:text-yellow-400 text-base font-medium transition-colors duration-200 w-full text-left"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            href="/pages/Dashboard"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-full shadow-md w-full text-center transition-all duration-200"
            onClick={toggleMenu}
          >
            Get Started
          </Link>
          <Link
            href="/pages/Login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md w-full text-center transition-all duration-200"
            onClick={toggleMenu}
          >
            Login/Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default memo(MainHeader);