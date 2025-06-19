"use client";

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ChartBarIcon,
  CogIcon,
  BeakerIcon,
  XIcon,
  MenuIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import debounce from "lodash/debounce";
import Profilesection from "../Login/Profilesection";

interface DashsidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Dashsidebar({ className = "", ...props }: DashsidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/pages/Dashboard", label: "Dashboard", icon: ChartBarIcon },
    {
      href: "/pages/FlockManagement",
      label: "Flock Management",
      icon: ChartBarIcon,
    },
    { href: "/pages/FeedWaterTracking", label: "Feed & Water", icon: CogIcon },
    { href: "/pages/MainMonitoring", label: "Monitoring", icon: ChartBarIcon },
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
  ].filter((link) => link.href !== pathname);

  // Debounced link click handler to prevent rapid clicks
  const handleLinkClick = useCallback(
    debounce((href: string) => {
      setLoadingLink(href);
      setIsSidebarOpen(false);
      setTimeout(() => {
        setLoadingLink(null);
      }, 1000); 
    }, 300),
    []
  );

  // Memoized toggle handler
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div {...props} className={`relative ${className}`}>
      {/* Sidebar Toggle Button - Visible on mobile when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-blue-700 text-white p-2.5 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-200"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-900 text-white flex flex-col p-6 transition-transform duration-300 ease-in-out shadow-2xl will-change-transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:block`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <BeakerIcon className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-extrabold tracking-tight">SmartPoultry</span>
          </div>
          {/* Close Button - Mobile only */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-blue-200 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200
                ${
                  pathname === link.href
                    ? "bg-blue-700 text-white shadow-md"
                    : loadingLink === link.href
                    ? "bg-blue-600 text-white opacity-75 cursor-wait"
                    : "text-blue-100 hover:bg-blue-800 hover:text-white"
                }`}
              onClick={() => handleLinkClick(link.href)}
            >
              {loadingLink === link.href ? (
                <RefreshIcon className="mr-3 h-5 w-5 animate-spin" />
              ) : (
                <link.icon className="mr-3 h-5 w-5" />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

      
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default memo(Dashsidebar);