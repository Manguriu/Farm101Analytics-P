/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  ChartBarIcon,
  BeakerIcon,
  HeartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/navigation";

export default function MainFeatures() {
    const router = useRouter();

    const handleFlockFeedAndWater = () => {
        router.push("/pages/FeedWaterTracking");
      };
     
  return (
    <div className="mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* Flock Management */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BeakerIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                Flock Management
              </h3>
            </div>
          </div>
          <div className="mt-4">
            <img
              className="h-48 w-full object-cover rounded-md"
              src="/FlockManagement.png"
              alt="Flock Management"
            />
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-700 hover:text-blue-900"
            >
              Manage flocks
            </a>
          </div>
        </div>
      </div>

      {/* Feed & Water */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BeakerIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                Feed & Water
              </h3>
            </div>
          </div>
          <div className="mt-4">
            <img
              className="h-48 w-full object-cover rounded-md"
              src="/FeedWaterTracking.png"
              alt="Feed and Water"
            />
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <button onClick={handleFlockFeedAndWater} className="font-medium text-blue-700 hover:text-blue-900">
              Track resources
            </button>
          </div>
        </div>
      </div>

      {/* Growth Analytics */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                Growth Analytics
              </h3>
            </div>
          </div>
          <div className="mt-4">
            <img
              className="h-48 w-full object-cover rounded-md"
              src="/GrowthMonitoring.png"
              alt="Growth Analytics"
            />
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-700 hover:text-blue-900"
            >
              View analytics
            </a>
          </div>
        </div>
      </div>

      {/* Financial Tracking */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                Financial Tracking
              </h3>
            </div>
          </div>
          <div className="mt-4">
            <img
              className="h-48 w-full object-cover rounded-md"
              src="/ExpenseTracking.png"
              alt="Financial Tracking"
            />
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-700 hover:text-blue-900"
            >
              Manage finances
            </a>
          </div>
        </div>
      </div>

      {/* Health Monitoring */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <HeartIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                Health Monitoring
              </h3>
            </div>
          </div>
          <div className="mt-4">
            <img
              className="h-48 w-full object-cover rounded-md"
              src="/HealthMonitoring.png"
              alt="Health Monitoring"
            />
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-700 hover:text-blue-900"
            >
              Check health
            </a>
          </div>
        </div>
      </div>

      {/* Reports & Insights */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BeakerIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                Reports & Insights
              </h3>
            </div>
          </div>
          <div className="mt-4">
            <img
              className="h-48 w-full object-cover rounded-md"
              src="/ReportInsights.png"
              alt="Reports and Insights"
            />
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-700 hover:text-blue-900"
            >
              View reports
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
