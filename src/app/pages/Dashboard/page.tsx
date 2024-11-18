"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle for the dropdown menu

  const router = useRouter();

  const handleFlockManagement = () => {
    router.push("/pages/FlockManagement");
  };

  const handleFlockFeedAndWater = () => {
    router.push("/pages/FeedWaterTracking");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-grey-100">
      {/* Sidebar / Dropdown Menu */}
      <aside
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block bg-gradient-to-b from-blue-800 to-gray-900 text-white flex flex-col w-full md:w-64 p-4 md:p-6 absolute md:static z-10`}
      >
        {/* Logo Section */}
        <div className="flex items-center mb-8">
          {/* <div className="w-10 h-10 rounded-full flex justify-center items-center">
            <span className="text-white text-xl font-bold"><i className="fas fa-bars"></i></span>
          </div> */}
          <h2 className="text-lg md:text-2xl font-bold ml-4">
            SmartPoultry Hub
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-home"></i>
            <span className="text-sm md:text-lg">Home</span>
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-box"></i>
            <span className="text-sm md:text-lg">Products</span>
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="text-sm md:text-lg">Profile</span>
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-chart-line"></i>
            <span className="text-sm md:text-lg">Analytics</span>
          </Link>
          <Link
            href="/reviews"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-star"></i>
            <span className="text-sm md:text-lg">History</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-cog"></i>
            <span className="text-sm md:text-lg">Settings</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-user"></i>
            <span className="text-sm md:text-lg">Profile</span>
          </Link>
        </nav>
      </aside>

      {/* Menu Button for Small Screens */}
      <button
        onClick={toggleMenu}
        className="block md:hidden bg-blue-500 text-white p-2 rounded-full absolute top-4 right-4 z-20"
      >
        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 ">
        <div className="px-2 py-1 ">
          <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8">
            Dashboard Overview
          </h1>
        </div>

        {/* Card Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Card 1 */}
          <button onClick={handleFlockManagement}>
            <div className=" md:p-1 rounded-lg shadow-lg text-center ">
              <div>
                <img
                  src="/FlockManagement.png"
                  className="mx-auto w-full h-56 object-cover rounded"
                />
              </div>
              <div className="mt-3 mb-4">
                <h3 className="text-lg md:text-xl font-semibold mt-2">
                  Flock Management
                </h3>
                <p className="mt-1 text-sm md:text-base">
                  Details about flock management.
                </p>
              </div>
            </div>
          </button>

          {/* Card 2 */}
          <button onClick={handleFlockFeedAndWater}>
          <div className="bg-white md:p-1 rounded-lg shadow-lg text-center">
            <div>
              <img
                src="/FeedWaterTracking.png"
                className="mx-auto w-full h-56 object-cover rounded"
              />
            </div>
            <div className="mt-3 mb-4">
              <h3 className="text-lg md:text-xl font-semibold mt-2">
                Feed & Water Tracking
              </h3>
              <p className="mt-1 text-sm md:text-base">
                Track feed and water usage.
              </p>
            </div>
          </div>
          </button>

          {/* Card 3 */}
          <div className="bg-white md:p-1 rounded-lg shadow-lg text-center">
            <div>
              <img
                src="/GrowthMonitoring.png"
                className="mx-auto w-full h-56 object-cover rounded"
              />
            </div>
            <div className="mt-3 mb-4">
              <h3 className="text-lg md:text-xl font-semibold mt-2">
                Growth Monitoring
              </h3>
              <p className="mt-1 text-sm md:text-base">
                Monitor growth and health.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white md:p-1 rounded-lg shadow-lg text-center">
            <div>
              <img
                src="/ExpenseTracking.png"
                className="mx-auto w-full h-56 object-cover rounded"
              />
            </div>
            <div className="mt-3 mb-4">
              <h3 className="text-lg md:text-xl font-semibold mt-2">
                Expense Tracking
              </h3>
              <p className="mt-1 text-sm md:text-base">
                Record expenses and income.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white md:p-1 rounded-lg shadow-lg text-center">
            <div>
              <img
                src="/HealthMonitoring.png"
                className="mx-auto w-full h-56 object-cover rounded"
              />
            </div>
            <div className="mt-3 mb-4">
              <h3 className="text-lg md:text-xl font-semibold mt-2">
                Health Monitoring
              </h3>
              <p className="mt-1 text-sm md:text-base">
                Manage health and vaccinations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
