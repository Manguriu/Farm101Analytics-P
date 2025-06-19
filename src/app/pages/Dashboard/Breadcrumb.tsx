"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, Droplets, HeartPulse, PieChart, ChevronRight, Loader2 } from "lucide-react";
import debounce from "lodash/debounce";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/pages/Dashboard", label: "Dashboard", icon: LineChart },
  { href: "/pages/FlockManagement", label: "Flock Management", icon: LineChart },
  { href: "/pages/FeedWaterTracking", label: "Feed & Water", icon: Droplets },
  { href: "/pages/MainMonitoring", label: "Monitoring", icon: HeartPulse },
  { href: "/pages/FinanceTracking", label: "Financial Tracking", icon: LineChart },
  { href: "/pages/ReportsAndInsights", label: "Reports & Insights", icon: PieChart },
];

function Breadcrumb() {
  const pathname = usePathname();
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const breadcrumbItems = useMemo(() => {
    const normalizedPath = pathname.split("?")[0].replace(/\/$/, "");
    const pathSegments = normalizedPath
      .split("/")
      .filter((seg) => seg && seg !== "pages");

    // Build breadcrumb items
    let items = pathSegments.map((seg, index) => {
      const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const link = links.find((l) => l.href === fullPath);
      return {
        href: fullPath,
        label: link ? link.label : seg.replace(/-/g, " "),
        icon: link ? link.icon : null,
      };
    });

    if (normalizedPath !== "/pages/Dashboard" && !items.some((item) => item.href === "/pages/Dashboard")) {
      items = [{ href: "/pages/Dashboard", label: "Dashboard", icon: LineChart }, ...items];
    }

    return items;
  }, [pathname]);

  // Debounced click handler for navigation
  const handleLinkClick = useCallback(
    debounce((href: string) => {
      setLoadingLink(href);
      setTimeout(() => {
        setLoadingLink(null);
      }, 1000); // Adjust based on actual navigation time
    }, 300),
    []
  );

  return (
    <nav className="flex px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2 sm:space-x-3">
        {/* Home Link */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className={`inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors duration-200
              ${loadingLink === "/" ? "opacity-75 cursor-wait" : ""}`}
            onClick={() => handleLinkClick("/")}
          >
            {loadingLink === "/" ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Home className="w-4 h-4 mr-2 text-blue-600" />
            )}
            Home
          </Link>
        </li>

        {/* Dynamic Breadcrumb Items */}
        {breadcrumbItems.map((item, idx) => (
          <li
            key={item.href}
            aria-current={idx === breadcrumbItems.length - 1 ? "page" : undefined}
          >
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              {idx === breadcrumbItems.length - 1 ? (
                <span className="text-sm font-medium text-gray-500">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors duration-200
                    ${loadingLink === item.href ? "opacity-75 cursor-wait" : ""}`}
                  onClick={() => handleLinkClick(item.href)}
                >
                  {loadingLink === item.href ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    item.icon && <item.icon className="w-4 h-4 mr-2 text-blue-600" />
                  )}
                  {item.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default memo(Breadcrumb);