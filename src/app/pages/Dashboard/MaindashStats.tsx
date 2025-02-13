import React from "react";
import { Bird, Droplets, HeartPulse } from "lucide-react";
import Breadcrumb from "./Breadcrumb";

export default function MaindashStats() {
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
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Breadcrumb />
      </div>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.title}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {item.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className="font-medium text-green-700 hover:text-green-900">
                  {item.change || item.subtext}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
