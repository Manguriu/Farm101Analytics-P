/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useState } from "react";

const Dashboard = () => {
  const handleFlockManagement = () => {
    router.push("/pages/FlockManagement");
  };

  const router = useRouter(); // Initialize useRouter

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen((prev) => !prev);
  // };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        {/* Logo Section */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <h2 className="text-2xl font-bold ml-4">SmartPoultry Hub</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-home"></i>
            <span className="text-lg">Home</span>
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-box"></i>
            <span className="text-lg">Products</span>
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="text-lg">Orders</span>
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-chart-line"></i>
            <span className="text-lg">Analytics</span>
          </Link>
          <Link
            href="/reviews"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-star"></i>
            <span className="text-lg">Reviews</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-cog"></i>
            <span className="text-lg">Settings</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-500 transition"
          >
            <i className="fas fa-user"></i>
            <span className="text-lg">Profile</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <button onClick={handleFlockManagement}>
            <div className="bg-white p-6 rounded shadow text-center">
              <img src="/FlockManagement.png" />
              <h3 className="text-xl font-semibold mt-2">Flock Management</h3>
              <p className="mt-1">Details about flock management.</p>
            </div>
          </button>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded shadow text-center">
            <img src="/mainHero1.png" />
            <h3 className="text-xl font-semibold">Feed & Water Tracking</h3>
            <p>Track feed and water usage.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded shadow text-center">
            <img src="/mainHero1.png" />
            <h3 className="text-xl font-semibold">Growth Monitoring</h3>
            <p>Monitor growth and health.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded shadow text-center">
            <img src="/mainHero1.png" />
            <h3 className="text-xl font-semibold">Expense Tracking</h3>
            <p>Record expenses and income.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded shadow text-center">
            <img src="/mainHero1.png" />
            <h3 className="text-xl font-semibold">Health Monitoring</h3>
            <p>Manage health and vaccinations.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
