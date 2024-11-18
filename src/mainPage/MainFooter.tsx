import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";


function MainFooter() {
  return (
    <footer className="bg-black backdrop-blur-md text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Footer Logo & Description */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold">SmartPoultry Hub</h2>
          <p className="text-sm text-gray-400">
            Revolutionizing poultry management with smart technology.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-white">
          <a href="/about" className="hover:text-yellow-500 transition text-white">
            About
          </a>
          <a href="/contact" className="hover:text-yellow-500 transition">
            Contact
          </a>
          <a href="/faq" className="hover:text-yellow-500 transition">
            FAQ
          </a>
          <a href="/terms" className="hover:text-yellow-500 transition">
            Terms
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mt-4 md:mt-0 justify-center text-white">
          <a
            href="#"
            className="text-gray-400 hover:text-yellow-500 transition"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-yellow-500 transition"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-yellow-500 transition"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-yellow-500 transition"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-white">
        © 2024 SmartPoultry Hub. All rights reserved.
      </div>
    </footer>
  );
}

export default MainFooter;
