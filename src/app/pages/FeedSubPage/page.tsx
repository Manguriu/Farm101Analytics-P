"use client";

import { useState } from "react";
import { format, startOfWeek, startOfMonth } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [editingSummary, setEditingSummary] = useState<DailySummary | null>(null);
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
      id: editingSummary ? editingSummary.id : Math.random().toString(36).substr(2, 9),
      day: parseInt(formData.day, 10),
      date: new Date(formData.date),
      avgWeight: parseFloat(formData.avgWeight),
      totalFeed: parseFloat(formData.totalFeed),
      totalWater: parseFloat(formData.totalWater),
      deaths: parseInt(formData.deaths, 10),
    };

    if (editingSummary) {
      setSummaries((prev) =>
        prev.map((summary) => (summary.id === editingSummary.id ? newSummary : summary))
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 p-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingSummary ? "Edit Summary" : "Add Summary"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Day</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Avg Weight (kg)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={formData.avgWeight}
                onChange={(e) => setFormData({ ...formData, avgWeight: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Total Feed (kg)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={formData.totalFeed}
                onChange={(e) => setFormData({ ...formData, totalFeed: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Total Water (L)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={formData.totalWater}
                onChange={(e) => setFormData({ ...formData, totalWater: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Deaths</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={formData.deaths}
                onChange={(e) => setFormData({ ...formData, deaths: e.target.value })}
                required
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                {editingSummary ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>

        {/* Daily Summaries */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Daily Summaries</h2>
          <AnimatePresence>
            {summaries.map((summary) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-4 border rounded"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">Day {summary.day}</h3>
                    <p>{format(summary.date, "MMM d, yyyy")}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(summary)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(summary.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Weekly Summaries */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Summaries</h2>
          {getWeeklySummaries().map((week, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold">Week of {format(week.startDate, "MMM d")}</h3>
              <p>Avg Weight: {week.avgWeight.toFixed(2)} kg</p>
              <p>Total Feed: {week.totalFeed} kg</p>
              <p>Total Water: {week.totalWater} L</p>
              <p>Deaths: {week.deaths}</p>
            </div>
          ))}
        </div>

        {/* Monthly Summaries */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Summaries</h2>
          {getMonthlySummaries().map((month, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold">Month: {format(month.startDate, "MMM yyyy")}</h3>
              <p>Avg Weight: {month.avgWeight.toFixed(2)} kg</p>
              <p>Total Feed: {month.totalFeed} kg</p>
              <p>Total Water: {month.totalWater} L</p>
              <p>Deaths: {month.deaths}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
