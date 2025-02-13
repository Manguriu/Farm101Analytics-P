"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, LineChart, Droplets, HeartPulse, PieChart, ChevronRight } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/pages/Dashboard", label: "Dashboard", icon: LineChart },
  { href: "/pages/FlockManagement", label: "Flock Management", icon: LineChart },
  { href: "/pages/FeedWaterTracking", label: "Feed & Water", icon: Droplets },
  { href: "/pages/MainMonitoring", label: "Monitoring", icon: HeartPulse },
  { href: "/pages/FinanceTracking", label: "Financial Tracking", icon: LineChart },
  { href: "/pages/ReportsAndInsights", label: "Reports & Insights", icon: PieChart },
];

export default function Breadcrumb() {
  const pathname = usePathname();

  // Split path into segments and remove "pages"
  const pathSegments = pathname
    .split("/")
    .filter((seg) => seg && seg !== "pages"); // Exclude "pages"

  // Build breadcrumb items
  let breadcrumbItems = pathSegments.map((seg, index) => {
    const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const link = links.find((l) => l.href === fullPath);

    return {
      href: fullPath,
      label: link ? link.label : seg.replace(/-/g, " "), // Format segment if not found
      icon: link ? link.icon : null,
    };
  });

  // Ensure "Dashboard" is included if it's not the current page
  if (pathname !== "/pages/Dashboard") {
    breadcrumbItems = [
      { href: "/pages/Dashboard", label: "Dashboard", icon: LineChart },
      ...breadcrumbItems,
    ];
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {/* Home Link */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Home className="w-4 h-4 me-2.5" />
            Home
          </Link>
        </li>

        {/* Dynamic Breadcrumb Items */}
        {breadcrumbItems.map((item, idx) => (
          <li key={item.href} aria-current={idx === breadcrumbItems.length - 1 ? "page" : undefined}>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {idx === breadcrumbItems.length - 1 ? (
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white flex items-center"
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-1" />}
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
