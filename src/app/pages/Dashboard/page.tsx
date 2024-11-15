/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import React from "react";
import { useRouter } from "next/navigation";




const Dashboard = () => {
const handleFlockManagement = () => {
        router.push("/pages/FlockManagement"); 
      };
    
const router = useRouter(); // Initialize useRouter


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {/* Add navigation links here if needed */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <button onClick={handleFlockManagement}>
          <div className="bg-white p-6 rounded shadow text-center">
            <img src="/mainHero1.png"/>
            <h3 className="text-xl font-semibold">Flock Management</h3>
            <p>Details about flock management.</p>
          </div>
          </button>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded shadow text-center">
          <img src="/mainHero1.png"/>
            <h3 className="text-xl font-semibold">Feed & Water Tracking</h3>
            <p>Track feed and water usage.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded shadow text-center">
          <img src="/mainHero1.png"/>
            <h3 className="text-xl font-semibold">Growth Monitoring</h3>
            <p>Monitor growth and health.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded shadow text-center">
          <img src="/mainHero1.png"/>
            <h3 className="text-xl font-semibold">Expense Tracking</h3>
            <p>Record expenses and income.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded shadow text-center">
          <img src="/mainHero1.png"/>
            <h3 className="text-xl font-semibold">Health Monitoring</h3>
            <p>Manage health and vaccinations.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
