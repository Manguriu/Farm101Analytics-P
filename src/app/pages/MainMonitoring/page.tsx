"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ChartBarIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Dashsidebar from "../Dashboard/Dashsidebar";

interface Flock {
  id: string;
  batchName: string;
  startDate: Date;
  currentCount: number;
  breed: string;
  lastUpdated: Date;
}

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // "Db data example this data is from the add stock"
  // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars
  const [flocks, setFlocks] = useState<Flock[]>([
    {
      id: "1",
      batchName: "Spring Batch 2024",
      startDate: new Date(2024, 0, 1),
      currentCount: 100,
      breed: "Broiler Ross 308",
      lastUpdated: new Date(),
    },
    {
      id: "2",
      batchName: "Spring Bah 2024",
      startDate: new Date(2024, 0, 1),
      currentCount: 1600,
      breed: "Broiler Ross 308",
      lastUpdated: new Date(),
    },
    {
      id: "3",
      batchName: "sumer Bah 2024",
      startDate: new Date(2024, 0, 1),
      currentCount: 1600,
      breed: "Broiler Ross 308",
      lastUpdated: new Date(),
    },
    {
      id: "4",
      batchName: "dchristmas Bah 2024",
      startDate: new Date(2024, 0, 1),
      currentCount: 1600,
      breed: "Broiler Ross 308",
      lastUpdated: new Date(),
    },
  ]);

  const handleFlockHealth = (flock: Flock) => {
    router.push(
      `/pages/HealthMonitoring?id=${flock.id}&batchName=${encodeURIComponent(
        flock.batchName
      )}&currentCount=${flock.currentCount}&breed=${encodeURIComponent(
        flock.breed || "Unknown"
      )}&startDate=${encodeURIComponent(
        new Date(flock.startDate).toISOString()
      )}`
    );
  };

  const handleFlockGrowth = (flock: Flock) => {
    router.push(
      `/pages/GrowthMonitoring?id=${flock.id}&batchName=${encodeURIComponent(
        flock.batchName
      )}&currentCount=${flock.currentCount}&breed=${encodeURIComponent(
        flock.breed || "Unknown"
      )}&startDate=${encodeURIComponent(
        new Date(flock.startDate).toISOString()
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-orange-50 p-6">
      <Dashsidebar />
      <ToastContainer />

      <div className="flex-1 p-8 overflow-auto lg:ml-64">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
              Health Monitoring & Growth Monitoring{" "}
            </h1>
            <p className="text-gray-600 mt-2">
              Efficiently manage and monitor your poultry flocks Health and
              growth
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Feed Stock */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  Total No of deaths
                </h3>
                <ChartBarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50 kg</div>
              <p className="text-xs text-gray-500">-50 from last week</p>
              <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="absolute h-full bg-orange-500 rounded-full"
                  style={{ width: "65%" }}
                />
              </div>
            </div>

            {/* Water Storage */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  Health Stats
                </h3>
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">89 %</div>
              <p className="text-xs text-gray-500">82% Health Rate</p>
              <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="absolute h-full bg-blue-500 rounded-full"
                  style={{ width: "82%" }}
                />
              </div>
            </div>

            {/* Daily Consumption */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  Growth stats
                </h3>
                <ChartBarIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">95 %</div>
              <p className="text-xs text-gray-500">↑ 8 % increase</p>
              <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="absolute h-full bg-emerald-500 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
          </div>

          {/* Flock Cards */}
          <div className="flex gap-6 flex-wrap">
            <AnimatePresence>
              {flocks.map((flock) => (
                <motion.div
                  key={flock.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-md rounded-lg overflow-hidden min-w-[300px] flex-shrink-0"
                >
                  <div className="bg-blue-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {flock.batchName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Age: {differenceInDays(new Date(), flock.startDate)}{" "}
                          days
                        </p>
                        <p className="text-sm text-gray-500">
                          Breed: {flock.breed}
                        </p>
                      </div>
                      <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                        {flock.currentCount} Birds
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow gap-4">
                    {/* To health */}
                    <button
                      // onClick={handleFlockFeedAndWater}
                      onClick={() => handleFlockHealth(flock)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-200 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
                    >
                      <PencilIcon className="h-5 w-5" />
                      <span className="font-medium">Health Monitoring</span>
                    </button>

                    {/* To Growth  */}
                    <button
                      // onClick={() => handleDelete(flock.id)}
                      onClick={() => handleFlockGrowth(flock)}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-gradient-to-r hover:from-cyan-900 hover:to-cyan-200 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span className="font-medium">Growth Monitoring</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
