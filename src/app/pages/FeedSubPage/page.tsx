"use client";

import { useState } from "react";
import { format, startOfWeek, startOfMonth } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashsidebar from "../Dashboard/Dashsidebar";
// import { useRouter } from "next/navigation";
import Feedsubheader from "./Feedsubheader";
import { ScaleIcon, HeartIcon, CalendarIcon } from "@heroicons/react/outline";
import Breadcrumb from "../Dashboard/Breadcrumb";

interface DailySummary {
  id: string;
  day: number;
  date: Date;
  avgWeight: number;
  totalFeed: number;
  totalWater: number;
  deaths: number;
}

export default function Component() {
  const [summaries, setSummaries] = useState<DailySummary[]>([
    {
      id: "1",
      day: 1,
      date: new Date(2024, 0, 15),
      avgWeight: 1.2,
      totalFeed: 50,
      totalWater: 75,
      deaths: 0,
    },
    {
      id: "2",
      day: 2,
      date: new Date(2024, 0, 16),
      avgWeight: 1.3,
      totalFeed: 55,
      totalWater: 80,
      deaths: 1,
    },
  ]);

  const [editingSummary, setEditingSummary] = useState<DailySummary | null>(
    null
  );
  const [formData, setFormData] = useState({
    day: "",
    date: format(new Date(), "yyyy-MM-dd"),
    avgWeight: "",
    totalFeed: "",
    totalWater: "",
    deaths: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSummary: DailySummary = {
      id: editingSummary
        ? editingSummary.id
        : Math.random().toString(36).substr(2, 9),
      day: parseInt(formData.day, 10),
      date: new Date(formData.date),
      avgWeight: parseFloat(formData.avgWeight),
      totalFeed: parseFloat(formData.totalFeed),
      totalWater: parseFloat(formData.totalWater),
      deaths: parseInt(formData.deaths, 10),
    };

    if (editingSummary) {
      setSummaries((prev) =>
        prev.map((summary) =>
          summary.id === editingSummary.id ? newSummary : summary
        )
      );
      toast.success("Summary updated successfully");
      setEditingSummary(null);
    } else {
      setSummaries((prev) => [...prev, newSummary]);
      toast.success("Summary added successfully");
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      day: "",
      date: format(new Date(), "yyyy-MM-dd"),
      avgWeight: "",
      totalFeed: "",
      totalWater: "",
      deaths: "",
    });
  };

  const handleEdit = (summary: DailySummary) => {
    setEditingSummary(summary);
    setFormData({
      day: summary.day.toString(),
      date: format(summary.date, "yyyy-MM-dd"),
      avgWeight: summary.avgWeight.toString(),
      totalFeed: summary.totalFeed.toString(),
      totalWater: summary.totalWater.toString(),
      deaths: summary.deaths.toString(),
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this summary?")) {
      setSummaries((prev) => prev.filter((summary) => summary.id !== id));
      toast.success("Summary deleted successfully");
    }
  };

  const getWeeklySummaries = () => {
    const weeklySummaries: Record<
      string,
      {
        startDate: Date;
        avgWeight: number;
        totalFeed: number;
        totalWater: number;
        deaths: number;
        count: number;
      }
    > = {};

    summaries.forEach((summary) => {
      const weekStart = format(startOfWeek(summary.date), "yyyy-MM-dd");

      if (!weeklySummaries[weekStart]) {
        weeklySummaries[weekStart] = {
          startDate: startOfWeek(summary.date),
          avgWeight: 0,
          totalFeed: 0,
          totalWater: 0,
          deaths: 0,
          count: 0,
        };
      }

      weeklySummaries[weekStart].avgWeight += summary.avgWeight;
      weeklySummaries[weekStart].totalFeed += summary.totalFeed;
      weeklySummaries[weekStart].totalWater += summary.totalWater;
      weeklySummaries[weekStart].deaths += summary.deaths;
      weeklySummaries[weekStart].count += 1;
    });

    Object.values(weeklySummaries).forEach((week) => {
      week.avgWeight /= week.count;
    });

    return Object.values(weeklySummaries);
  };

  const getMonthlySummaries = () => {
    const monthlySummaries: Record<
      string,
      {
        startDate: Date;
        avgWeight: number;
        totalFeed: number;
        totalWater: number;
        deaths: number;
        count: number;
      }
    > = {};

    summaries.forEach((summary) => {
      const monthKey = format(startOfMonth(summary.date), "yyyy-MM");

      if (!monthlySummaries[monthKey]) {
        monthlySummaries[monthKey] = {
          startDate: startOfMonth(summary.date),
          avgWeight: 0,
          totalFeed: 0,
          totalWater: 0,
          deaths: 0,
          count: 0,
        };
      }

      monthlySummaries[monthKey].avgWeight += summary.avgWeight;
      monthlySummaries[monthKey].totalFeed += summary.totalFeed;
      monthlySummaries[monthKey].totalWater += summary.totalWater;
      monthlySummaries[monthKey].deaths += summary.deaths;
      monthlySummaries[monthKey].count += 1;
    });

    Object.values(monthlySummaries).forEach((month) => {
      month.avgWeight /= month.count;
    });

    return Object.values(monthlySummaries);
  };

  return (
    <div className="flex h-screen p-2 ">
      {/* Sidebar */}
      <Dashsidebar className="custom-class lg:w-64" />
      <ToastContainer />
      {/* Main Content */}
      <div className="flex flex-col flex-1 gap-8 p-2 mx-auto">
        
        <div className="max-w-7xl mx-auto">
        <Breadcrumb />
          {/* Header Section */}
          <Feedsubheader />

          <div className="flex flex-col gap-4 pb-2 mt-4">
            {/* Form */}
            <div className=" shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-center justify-center">
                {editingSummary ? "Edit Summary" : "Add Summary"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 md:grid-cols-2"
              >
                <div>
                  <label className="block text-sm font-medium">Day</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Avg Weight (kg)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.avgWeight}
                    onChange={(e) =>
                      setFormData({ ...formData, avgWeight: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Total Feed (kg)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.totalFeed}
                    onChange={(e) =>
                      setFormData({ ...formData, totalFeed: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Total Water (L)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.totalWater}
                    onChange={(e) =>
                      setFormData({ ...formData, totalWater: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Deaths</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.deaths}
                    onChange={(e) =>
                      setFormData({ ...formData, deaths: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {editingSummary ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
            {/* Daily Summaries */}

            <div className="bg-gradient-to-br from-blue-50 to-gray-50 shadow-lg rounded-xl p-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 text-center justify-center">
                Daily Summaries
              </h2>
              <AnimatePresence>
                {summaries.map((summary) => (
                  <motion.div
                    key={summary.id}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: 20 }}
                    className="mb-4 p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          Day {summary.day}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {format(summary.date, "MMM d, yyyy")}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(summary)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
                        >
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(summary.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150 ease-in-out"
                        >
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Weekly Summaries */}

            <div className="bg-gradient-to-br from-green-50 to-gray-50 shadow-lg rounded-xl p-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 text-center justify-center">
                Weekly Summaries
              </h2>
              <div className="space-y-4">
                {getWeeklySummaries().map((week, index) => (
                  <div
                    key={index}
                    className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out border-l-4 border-green-500"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-green-500" />
                      Week of {format(week.startDate, "MMM d")}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <ScaleIcon className="h-5 w-5 text-blue-500" />
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Avg Weight:
                          </span>{" "}
                          {week.avgWeight.toFixed(2)} kg
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-blue-400" />
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Total Feed:
                          </span>{" "}
                          {week.totalFeed} kg
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-teal-500" />
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Total Water:
                          </span>{" "}
                          {week.totalWater} L
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Deaths:
                          </span>{" "}
                          {week.deaths}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Summaries */}
            <div className="bg-gradient-to-br from-yellow-50 to-gray-50 shadow-lg rounded-xl p-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 text-center justify-center">
                Monthly Summaries
              </h2>
              <div className="space-y-4">
                {getMonthlySummaries().map((month, index) => (
                  <div
                    key={index}
                    className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out border-l-4 border-yellow-500"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-yellow-500" />
                      Month: {format(month.startDate, "MMM yyyy")}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <ScaleIcon className="h-5 w-5 text-blue-500" />
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Avg Weight:
                          </span>{" "}
                          {month.avgWeight.toFixed(2)} kg
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HeartIcon className="h-5 w-5 text-blue-400" />
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Total Feed:
                          </span>{" "}
                          {month.totalFeed} kg
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HeartIcon className="h-5 w-5 text-teal-500" />
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Total Water:
                          </span>{" "}
                          {month.totalWater} L
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HeartIcon className="h-5 w-5 text-red-500" />
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            Deaths:
                          </span>{" "}
                          {month.deaths}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
