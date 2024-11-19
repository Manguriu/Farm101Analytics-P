/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  CogIcon,
  BeakerIcon,
  XIcon,
} from "@heroicons/react/outline";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-700 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <BeakerIcon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-800 text-white flex flex-col p-4 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-600 pb-4">
          <div className="flex items-center space-x-2">
            <BeakerIcon className="h-8 w-8" />
            <span className="text-xl font-bold">SmartPoultry</span>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-5 space-y-2">
          <a
            href="/"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md bg-blue-700 hover:bg-blue-900 transition duration-200"
          >
            <HomeIcon className="h-6 w-6 mr-3" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-base font-medium text-blue-200 hover:bg-blue-600 hover:text-white transition duration-200"
          >
            <ChartBarIcon className="h-6 w-6 mr-3" />
            Analytics
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 text-base font-medium text-blue-200 hover:bg-blue-600 hover:text-white transition duration-200"
          >
            <CogIcon className="h-6 w-6 mr-3" />
            Settings
          </a>
        </nav>

        {/* Profile Section */}
        <div className="mt-auto border-t border-blue-600 pt-4">
          <div className="flex items-center px-3">
            <img
              className="h-10 w-10 rounded-full"
              src="/placeholder.svg?height=40&width=40"
              alt="Profile Picture"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">John Smith</p>
              <a
                href="#"
                className="text-xs font-medium text-blue-300 hover:underline"
              >
                View profile
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
