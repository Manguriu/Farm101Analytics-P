"use client";

import React, { memo } from "react";
import { Bird, Droplets, HeartPulse } from "lucide-react";
import Breadcrumb from "./Breadcrumb";

const stats = [
  {
    title: "Total Birds",
    value: "1,234",
    change: "+12% from last month",
    icon: Bird,
  },
  {
    title: "Feed Consumption",
    value: "2.4 tons",
    subtext: "Average daily usage",
    icon: Droplets,
  },
  {
    title: "Water Usage",
    value: "4,500 L",
    subtext: "Daily consumption",
    icon: Droplets,
  },
  {
    title: "Health Status",
    value: "98%",
    subtext: "Flock wellness score",
    icon: HeartPulse,
  },
];

function MaindashStats() {
  return (
    <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8">
      <Breadcrumb />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center">
                <item.icon
                  className="h-6 w-6 text-blue-600"
                  aria-hidden="true"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">{item.value}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-3">
              <p className="text-sm font-medium text-green-600 group-hover:text-green-800 transition-colors duration-200">
                {item.change || item.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(MaindashStats);