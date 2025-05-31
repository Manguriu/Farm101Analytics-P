"use client";

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bird, Droplets, LineChart, HeartPulse, PieChart, ChevronRight, Loader2 } from "lucide-react";
import debounce from "lodash/debounce";

const features = [
  {
    title: "Flock Management",
    icon: Bird,
    image: "/FlockManagement.png",
    alt: "Flock Management",
    action: "Manage flocks",
    href: "/pages/FlockManagement",
  },
  {
    title: "Feed & Water",
    icon: Droplets,
    image: "/FeedWaterTracking.png",
    alt: "Feed and Water",
    action: "Track feed and water",
    href: "/pages/FeedWaterTracking",
  },
  {
    title: "Health and Growth Monitoring",
    icon: HeartPulse,
    image: "/HealthMonitoring.png",
    alt: "Health Monitoring",
    action: "Flocks Monitoring",
    href: "/pages/MainMonitoring",
  },
  {
    title: "Financial Tracking",
    icon: LineChart,
    image: "/ExpenseTracking.png",
    alt: "Financial Tracking",
    action: "Manage finances",
    href: "/pages/FinanceTracking",
  },
  {
    title: "Reports & Insights",
    icon: PieChart,
    image: "/ReportInsights.png",
    alt: "Reports and Insights",
    action: "View reports",
    href: "/pages/ReportsAndInsights",
  },
];

function MainFeatures() {
  const [loadingFeature, setLoadingFeature] = useState<string | null>(null);
  const pathname = usePathname();

  // Debounced click handler for navigation
  const handleFeatureClick = useCallback(
    debounce((href: string) => {
      setLoadingFeature(href);
      setTimeout(() => {
        setLoadingFeature(null);
      }, 1000); 
    }, 300),
    []
  );

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8 mt-5">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center">
              <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              <h3 className="ml-4 text-lg font-semibold text-gray-900 truncate">
                {feature.title}
              </h3>
            </div>
          </div>
          <div className="relative h-48 w-full overflow-hidden bg-gray-50">
            <Image
              src={feature.image}
              alt={feature.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={pathname === feature.href}
            />
          </div>
          <div className="bg-gray-100 px-6 py-4">
            <Link
              href={feature.href}
              className={`flex items-center justify-between w-full text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors duration-200
                ${loadingFeature === feature.href ? "opacity-75 cursor-wait" : ""}`}
              onClick={() => handleFeatureClick(feature.href)}
            >
              <span className="flex items-center">
                {loadingFeature === feature.href && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {feature.action}
              </span>
              <ChevronRight
                className={`h-4 w-4 transition-all duration-300
                  ${loadingFeature === feature.href ? "opacity-0" : "group-hover:opacity-100 group-hover:translate-x-1"}`}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(MainFeatures);