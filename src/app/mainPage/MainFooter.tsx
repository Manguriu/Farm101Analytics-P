"use client";

import React, { memo } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function MainFooter() {
  const navLinks = [
    { href: "/pages/About", label: "About" },
    { href: "/pages/Contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/terms", label: "Terms" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: Facebook },
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://instagram.com", label: "Instagram", icon: Instagram },
    { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  ];

  return (
    <footer className="bg-gray-900 backdrop-blur-lg  shadow-lg text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Footer Logo & Description */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-extrabold text-yellow-400">SmartPoultry Hub</h2>
          <p className="text-sm text-gray-400 mt-2">
            Revolutionizing poultry management with smart technology.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-200 hover:text-yellow-400 hover:bg-gray-800/30 px-3 py-1 rounded-md transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-6 md:mt-0 justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SmartPoultry Hub. All rights reserved.
      </div>
    </footer>
  );
}

export default memo(MainFooter);