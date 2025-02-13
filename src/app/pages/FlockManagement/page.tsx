"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CalendarIcon,
  UserGroupIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import Dashsidebar from "../Dashboard/Dashsidebar";
import Breadcrumb from "../Dashboard/Breadcrumb";

interface Flock {
  id: string;
  batchName: string;
  dateAcquired: string;
  initialCount: number;
  breed?: string;
  metrics: DailyMetrics[];
}

interface DailyMetrics {
  date: string;
  weight: number;
  feedConsumption: number;
  waterConsumption: number;
}

export default function FlockManagement() {
  const [flocks, setFlocks] = useState<Flock[]>([]);
  const [editFlock, setEditFlock] = useState<Flock | null>(null);

  // Load flocks from localStorage on initial render
  useEffect(() => {
    const storedFlocks = localStorage.getItem("flocks");
    if (storedFlocks) {
      setFlocks(JSON.parse(storedFlocks));
    }
  }, []);

  // Save flocks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("flocks", JSON.stringify(flocks));
  }, [flocks]);

  //generate IDs
  const generateUniqueId = (): string => {
    return (
      Math.random().toString(16).substring(2, 10) + Date.now().toString(16)
    );
  };

  // Add a new flock
  const addFlock = (flock: Omit<Flock, "id" | "metrics">) => {
    const uniqueId = generateUniqueId();
    const newFlock: Flock = {
      ...flock,
      id: uniqueId,
      metrics: [],
    };
    setFlocks([newFlock, ...flocks]);
    toast.success("Flock added successfully!");
  };

  // Delete a flock
  const deleteFlock = (id: string) => {
    if (window.confirm("Are you sure you want to delete this flock?")) {
      setFlocks(flocks.filter((flock) => flock.id !== id));
      toast.success("Flock deleted successfully.");
    }
  };

  // Save edited flock
  const saveFlock = (updatedFlock: Flock) => {
    setFlocks(
      flocks.map((flock) =>
        flock.id === updatedFlock.id ? updatedFlock : flock
      )
    );
    setEditFlock(null); // Exit edit mode
    toast.success("Flock updated successfully!");
  };

  // Get total birds across all flocks
  const getTotalBirds = () => {
    return flocks.reduce((acc, flock) => acc + flock.initialCount, 0);
  };

  // Calculate age of the flock in days
  const calculateFlockAge = (dateAcquired: string): number => {
    const today = new Date();
    const acquiredDate = new Date(dateAcquired);
    const diffInMs = today.getTime() - acquiredDate.getTime();
    const ageInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return ageInDays;
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 mt-2">
      {/* Sidebar */}
      <Dashsidebar className="w-full lg:w-64 flex-shrink-0" />

      <ToastContainer />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 p-4">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <Breadcrumb />
          <div className="mt-4 mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center lg:justify-start gap-2 max-sm:text-lg">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
              Flock Management
            </h1>
            <p className="text-gray-600 mt-2">
              Efficiently manage and monitor your poultry flocks
            </p>
          </div>

          {/* Add or Edit Flock Form */}
          <AddOrEditFlockForm
            addFlock={addFlock}
            editFlock={editFlock}
            saveFlock={saveFlock}
            cancelEdit={() => setEditFlock(null)}
          />

          {/* Current Flocks */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Current Flocks
              </h2>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5" />
                Total Birds: {getTotalBirds()}
              </div>
            </div>

            <FlockList
              flocks={flocks}
              onDelete={deleteFlock}
              onEdit={(flock) => setEditFlock(flock)}
              calculateFlockAge={calculateFlockAge}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Add or Edit Flock Form
interface AddOrEditFlockFormProps {
  addFlock: (flock: Omit<Flock, "id" | "metrics">) => void;
  editFlock: Flock | null;
  saveFlock: (updatedFlock: Flock) => void;
  cancelEdit: () => void;
}

const AddOrEditFlockForm = ({
  addFlock,
  editFlock,
  saveFlock,
  cancelEdit,
}: AddOrEditFlockFormProps) => {
  const [form, setForm] = useState<Omit<Flock, "id" | "metrics">>({
    batchName: "",
    dateAcquired: "",
    initialCount: 0,
    breed: "",
  });

  useEffect(() => {
    if (editFlock) {
      setForm({
        batchName: editFlock.batchName,
        dateAcquired: editFlock.dateAcquired,
        initialCount: editFlock.initialCount,
        breed: editFlock.breed || "",
      });
    } else {
      setForm({ batchName: "", dateAcquired: "", initialCount: 0, breed: "" });
    }
  }, [editFlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.batchName.trim() ||
      form.initialCount <= 0 ||
      !form.dateAcquired
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (editFlock) {
      saveFlock({ ...editFlock, ...form });
    } else {
      addFlock(form);
      setForm({ batchName: "", dateAcquired: "", initialCount: 0, breed: "" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-full max-sm:max-w-lg max-md:max-w-2xl mx-auto"
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 text-center sm:text-left">
        {editFlock ? "Edit Flock" : "Add New Flock"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Batch Name *
          </label>
          <input
            type="text"
            value={form.batchName}
            onChange={(e) => setForm({ ...form, batchName: e.target.value })}
            className="w-full border-gray-300 p-2 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter batch name"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date Acquired *
          </label>
          <input
            type="date"
            value={form.dateAcquired}
            onChange={(e) => setForm({ ...form, dateAcquired: e.target.value })}
            className="w-full border-gray-300 p-2 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Initial Count *
          </label>
          <input
            type="number"
            value={form.initialCount || ""}
            onChange={(e) =>
              setForm({ ...form, initialCount: parseInt(e.target.value) || 0 })
            }
            className="w-full border-gray-300 p-2 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Breed (Optional)
          </label>
          <input
            type="text"
            value={form.breed || ""}
            onChange={(e) => setForm({ ...form, breed: e.target.value })}
            className="w-full border-gray-300 p-2 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter breed (optional)"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
          {editFlock && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`${
              editFlock
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2 rounded-lg`}
          >
            {editFlock ? "Save Changes" : "Add Flock"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Flock List
interface FlockListProps {
  flocks: Flock[];
  onDelete: (id: string) => void;
  onEdit: (flock: Flock) => void;
  calculateFlockAge: (dateAcquired: string) => number;
}

const FlockList = ({
  flocks,
  onDelete,
  onEdit,
  calculateFlockAge,
}: FlockListProps) => {
  return (
    <AnimatePresence>
      {flocks.map((flock) => (
        <motion.div
          key={flock.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            {/* Left Section: Flock Details */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold">
                  {flock.batchName[0]}
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  <span className="text-blue-600">{flock.batchName}</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-gray-700 flex items-center gap-2">
                  <PencilIcon className="h-5 w-5 text-blue-600" />
                  <span>
                    <span className="font-semibold">Batch ID:</span> {flock.id}
                  </span>
                </p>

                <p className="text-gray-700 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <span>
                    <span className="font-semibold">Acquired:</span>{" "}
                    {new Date(flock.dateAcquired).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <span>
                    <span className="font-semibold">Current Age:</span>{" "}
                    {calculateFlockAge(flock.dateAcquired)} days
                  </span>
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <PencilIcon className="h-5 w-5 text-yellow-600" />
                  <span>
                    <span className="font-semibold">Breed:</span>{" "}
                    {flock.breed || (
                      <span className="italic text-gray-500">
                        Not specified
                      </span>
                    )}
                  </span>
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <PencilIcon className="h-5 w-5 text-red-600" />
                  <span>
                    <span className="font-semibold">Current Count:</span>{" "}
                    {flock.initialCount}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onEdit(flock)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <PencilIcon className="h-5 w-5" />
                <span className="font-medium">Edit</span>
              </button>
              <button
                onClick={() => onDelete(flock.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                <TrashIcon className="h-5 w-5" />
                <span className="font-medium">Delete</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
      {flocks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No flocks available. Add a new flock to start tracking!</p>
        </div>
      )}
    </AnimatePresence>
  );
};
