/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  CogIcon,
  BeakerIcon,
  XIcon,
} from "@heroicons/react/outline";

interface DashsidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string; // Allow external classes
}

export default function Dashsidebar({ className = "", ...props }: DashsidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("");

  // Fetch the current route after the component mounts
  useEffect(() => {
    setCurrentRoute(window.location.pathname);
  }, []);

  const links = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/pages/Dashboard", label: "Dashboard", icon: ChartBarIcon },
    {
      href: "/pages/FlockManagement",
      label: "Flock Management",
      icon: ChartBarIcon,
    },
    { href: "/pages/FeedWaterTracking", label: "Feed & Water", icon: CogIcon },
    {
      href: "/pages/MainMonitoring",
      label: "Monitoring",
      icon: ChartBarIcon,
    },
    {
      href: "/pages/FinanceTracking",
      label: "Financial Tracking",
      icon: CogIcon,
    },
    {
      href: "/pages/ReportsAndInsights",
      label: "Reports & Insights",
      icon: ChartBarIcon,
    },
    { href: "/pages/Settings", label: "Settings", icon: CogIcon },
  ];

  return (
    <div {...props} className={`relative ${className}`}>
      {/* Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-5 left-1 z-50 bg-blue-700 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <BeakerIcon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 bg-blue-800 text-white flex flex-col p-4 transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-blue-600">
          <div className="flex items-center space-x-2">
            <BeakerIcon className="h-8 w-8" />
            <span className="text-xl font-bold">SmartPoultry</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 px-2">
          {links
            .filter((link) => link.href !== currentRoute)
            .map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition ease-in-out duration-150"
              >
                <link.icon className="mr-4 h-6 w-6" />
                {link.label}
              </a>
            ))}
        </nav>
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
