"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Profilesection from "./Profilesection";
import {
  Home,
  LineChart,
  Droplets,
  HeartPulse,
  PieChart,
} from "lucide-react";

export default function Mainprofile() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/pages/Dashboard", label: "Dashboard", icon: LineChart },
    { href: "/pages/FlockManagement", label: "Flock Management", icon: LineChart },
    { href: "/pages/FeedWaterTracking", label: "Feed & Water", icon: Droplets },
    { href: "/pages/MainMonitoring", label: "Monitoring", icon: HeartPulse },
    { href: "/pages/FinanceTracking", label: "Financial Tracking", icon: LineChart },
    { href: "/pages/ReportsAndInsights", label: "Reports & Insights", icon: PieChart },
  ];

  // Determine current page label
  const getCurrentPageLabel = (pathname: string) => {
    const normalizedPath = pathname.split("?")[0].replace(/\/$/, "");
    const segments = normalizedPath.split("/").filter(seg => seg && seg !== "pages");
    if (segments.length === 0) return "Home";

    const fullPath = `/${segments.join("/")}`;
    const found = links.find(link => link.href === fullPath);

    return found ? found.label : segments[segments.length - 1].replace(/-/g, " ");
  };

  const pageTitle = getCurrentPageLabel(pathname);

  return (
    <div>
      <header className="shadow-sm p-2">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex justify-between items-center">
            <h1 className="text-2xl sm:font-bold text-gray-900">
              {pageTitle}
            </h1>
            <div>
              <Profilesection />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
