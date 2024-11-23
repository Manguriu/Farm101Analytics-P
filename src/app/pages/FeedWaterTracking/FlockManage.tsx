"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ChartBarIcon,
  ExclamationCircleIcon,
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

export default function Component() {
  const router = useRouter();

  // "Db data example this data is from the add stock"
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

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this flock? This action cannot be undone."
      )
    ) {
      setFlocks((prev) => prev.filter((flock) => flock.id !== id));
      toast.success("Flock deleted successfully");
    }
  };

  

  const handleFlockFeedAndWater = (flock: Flock) => {
    router.push(
      `/pages/FeedSubPage?id=${flock.id}&batchName=${encodeURIComponent(
        flock.batchName
      )}&currentCount=${flock.currentCount}&breed=${encodeURIComponent(
        flock.breed || "Unknown"
      )}&startDate=${encodeURIComponent(new Date(flock.startDate).toISOString())}`
    );
  };
  

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-orange-50 p-6">
      <Dashsidebar />
      <ToastContainer />
      <div className="max-w-7xl mx-auto space-y-6 lg:ml-64">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
            Feed & Watering Monitoring
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage resources for all your flocks
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Feed Stock */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Total Feed Stock
              </h3>
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2,450 kg</div>
            <p className="text-xs text-gray-500">+180 kg from last week</p>
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
                Water Storage
              </h3>
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">5,200 L</div>
            <p className="text-xs text-gray-500">82% capacity</p>
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
                Daily Consumption
              </h3>
              <ChartBarIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">320 kg</div>
            <p className="text-xs text-gray-500">↑ 8% increase</p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="absolute h-full bg-emerald-500 rounded-full"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          {/* Efficiency Score */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Efficiency Score
              </h3>
              <ExclamationCircleIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <p className="text-xs text-gray-500">Above target</p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="absolute h-full bg-purple-500 rounded-full"
                style={{ width: "94%" }}
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
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow">
                  {/* Manage Button */}
                  <button
                    // onClick={handleFlockFeedAndWater}
                    onClick= {() => handleFlockFeedAndWater(flock)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span className="font-medium">Manage</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(flock.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
                  >
                    <TrashIcon className="h-5 w-5" />
                    <span className="font-medium">Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
