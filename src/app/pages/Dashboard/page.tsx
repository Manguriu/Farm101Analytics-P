/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
"use client";

import { PlusIcon } from "@heroicons/react/outline";
// import Stats from '../GrowthMonitoring/Stats'
import MainFeatures from "./MainFeatures";
import { useRouter } from "next/navigation";
import Dashsidebar from "./Dashsidebar";
import MaindashStats from "./MaindashStats";

export default function Dashboard() {
  const router = useRouter();

  const handleFlockManagement = () => {
    router.push("/pages/FlockManagement");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Dashsidebar className="custom-class lg:w-64" />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8 ">
        <header className=" shadow-sm p-2">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex justify-between ">
              <h1 className="text-2xl sm:font-bold text-gray-900 ">
                Dashboard
              </h1>
              <button
                onClick={handleFlockManagement}
                className="inline-flex items-center px-4 max-sm:px-2 py-2 max-sm:py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Flock
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MaindashStats />
              <MainFeatures />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
