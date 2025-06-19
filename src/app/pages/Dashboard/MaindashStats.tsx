"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Bird, Droplets, HeartPulse } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import { useFlockStore } from "@/app/lib/flockStore";

const stats = [
  {
    title: "Total Birds",
    value: (total: number) => total.toLocaleString(),
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

const MaindashStats = () => {
  const totalBirds = useFlockStore((state) => state.totalBirds);

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-6">
      <Breadcrumb />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            role="region"
            aria-labelledby={`stat-${item.title.replace(/\s/g, "-")}`}
          >
            <div className="p-6">
              <div className="flex items-center">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <item.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                </motion.div>
                <div className="ml-4 flex-1">
                  <h3
                    id={`stat-${item.title.replace(/\s/g, "-")}`}
                    className="text-base font-semibold text-gray-800 truncate"
                  >
                    {item.title}
                  </h3>
                  <p className="

text-2xl font-bold text-gray-900">
                    {typeof item.value === "function" ? item.value(totalBirds) : item.value}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3">
              <p className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                {item.change || item.subtext}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default memo(MaindashStats);