/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState} from "react";
import { usePathname } from "next/navigation"; // To get current route
import {
  HomeIcon,
  ChartBarIcon,
  CogIcon,
  BeakerIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";

interface DashsidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Dashsidebar({ className = "", ...props }: DashsidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  // Define available pages dynamically (this can come from API)
  const links = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/pages/Dashboard", label: "Dashboard", icon: ChartBarIcon },
    { href: "/pages/FlockManagement", label: "Flock Management", icon: ChartBarIcon },
    { href: "/pages/FeedWaterTracking", label: "Feed & Water", icon: CogIcon },
    { href: "/pages/MainMonitoring", label: "Monitoring", icon: ChartBarIcon },
    { href: "/pages/FinanceTracking", label: "Financial Tracking", icon: CogIcon },
    { href: "/pages/ReportsAndInsights", label: "Reports & Insights", icon: ChartBarIcon },
  ].filter((link) => link.href !== pathname); // Remove current page from links

  return (
    <div {...props} className={`relative ${className}`}>
      {/* Sidebar Toggle Button - Only visible when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          className="lg:hidden fixed top-5 left-3 z-50 bg-blue-700 text-white p-2 rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-800 text-white flex flex-col p-4 transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:block`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-600">
          <div className="flex items-center space-x-2">
            <BeakerIcon className="h-8 w-8" />
            <span className="text-xl font-bold">SmartPoultry</span>
          </div>
          {/* Close Button inside Sidebar */}
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-5 px-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`mt-1 flex items-center px-3 py-2 text-base font-medium rounded-md transition duration-150 ease-in-out
                ${
                  pathname === link.href
                    ? "bg-blue-600 text-white"
                    : "text-blue-100 hover:bg-blue-600 hover:text-white"
                }`}
            >
              <link.icon className="mr-3 h-6 w-6" />
              {link.label}
            </a>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center py-3 border-t border-blue-600">
            <img className="h-8 w-8 rounded-full" src="/Chick1.png" alt="User Avatar" />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">John Smith</p>
              <p className="text-xs font-medium text-blue-300">View profile</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
