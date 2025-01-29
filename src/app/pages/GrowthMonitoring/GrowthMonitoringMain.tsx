import { useState } from "react";
import { format, subDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/app/lib/presentation/components/ui/button/Button";
import Dashsidebar from "../Dashboard/Dashsidebar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface WeightEntry {
  id: string;
  date: Date;
  weight: number;
  batchName: string;
  currentCount: string | null;
  breed: string | null;
  startDate: string | null;
}

export default function GrowthMonitoringMain() {
  const searchParams = useSearchParams();
  const batchName = searchParams.get("batchName") || "Unknown Batch";
  const currentCount = searchParams.get("currentCount");
  const breed = searchParams.get("breed");
  const startDate = searchParams.get("startDate");

  const [entries, setEntries] = useState<WeightEntry[]>([
    {
      id: "1",
      date: subDays(new Date(), 14),
      weight: 0.8,
      batchName,
      currentCount,
      breed,
      startDate,
    },
    {
      id: "2",
      date: subDays(new Date(), 7),
      weight: 1.2,
      batchName,
      currentCount,
      breed,
      startDate,
    },
    {
      id: "3",
      date: new Date(),
      weight: 1.6,
      batchName,
      currentCount,
      breed,
      startDate,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEntry, setEditingEntry] = useState<WeightEntry | null>(null);
  const [formData, setFormData] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    weight: "",
    batchName,
    currentCount,
    breed,
    startDate,
  });

  const handleAdd = () => {
    setFormData({
      date: format(new Date(), "yyyy-MM-dd"),
      weight: "",
      batchName,
      currentCount,
      breed,
      startDate,
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = (entry: WeightEntry) => {
    setEditingEntry(entry);
    setFormData({
      date: format(entry.date, "yyyy-MM-dd"),
      weight: entry.weight.toString(),
      batchName: entry.batchName,
      currentCount: entry.currentCount,
      breed: entry.breed,
      startDate: entry.startDate,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(formData.weight);

    if (!formData.date || isNaN(weight)) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    if (isEditing && editingEntry) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingEntry.id
            ? { ...entry, date: new Date(formData.date), weight }
            : entry
        )
      );
      toast.info("Weight entry updated successfully");
    } else {
      const newEntry: WeightEntry = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date(formData.date),
        weight,
        batchName,
        currentCount,
        breed,
        startDate,
      };
      setEntries((prev) => [...prev, newEntry]);
      toast.success("Weight entry added successfully");
    }

    setShowForm(false);
    setEditingEntry(null);
  };

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setEntries((prev) => prev.filter((entry) => entry.id !== deleteId));
      toast.error("Entry deleted successfully");
      setDeleteId(null);
    }
  };

  const chartData = {
    labels: entries.map((entry) => format(entry.date, "MMM d")),
    datasets: [
      {
        label: "Weight (kg)",
        data: entries.map((entry) => entry.weight),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Dashsidebar className="custom-class lg:w-64" />

    {/* Main Content */}
    <div className="max-w-7xl mx-auto flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="mt-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <PlusCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
            {batchName} Growth Monitoring
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Track and analyze broiler growth patterns.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg"
          onClick={handleAdd}
        >
          <PlusCircleIcon className="h-5 w-5" />
          Add Weight Entry
        </button>
      </div>
  
      {/* Chart Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-5">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Growth Progression Chart for {batchName}
        </h2>
        <div className="h-72 sm:h-96">
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
  
      {/* Weight Entries Table */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-5">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Weight History
        </h2>
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b last:border-none"
            >
              <div>
                <h3 className="font-semibold text-base">
                  {format(entry.date, "MMMM d, yyyy")}
                </h3>
                <p className="text-sm">{entry.weight.toFixed(2)} kg</p>
                <p className="text-gray-600 text-sm">
                  Batch: {entry.batchName} (Start Date:{" "}
                  {entry.startDate || "N/A"})
                </p>
                <p className="text-gray-600 text-sm">
                  Breed: {entry.breed || "N/A"}, Initial Count:{" "}
                  {entry.currentCount || "N/A"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(entry)}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setDeleteId(entry.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this entry? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button>Cancel</Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
  
      {/* Add/Edit Weight Entry Form (Popup) */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900">
              {isEditing ? "Edit Weight Entry" : "Add Weight Entry"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter weight"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        weight: e.target.value,
                      }))
                    }
                    className="w-full border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
}