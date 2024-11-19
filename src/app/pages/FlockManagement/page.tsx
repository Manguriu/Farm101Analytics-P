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
import Sidebar from "./Sidebar";

interface Flock {
  id: number;
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

  // Add a new flock
  const addFlock = (flock: Omit<Flock, "id" | "metrics">) => {
    const newFlock: Flock = {
      ...flock,
      id: Date.now(),
      metrics: [],
    };
    setFlocks([newFlock, ...flocks]);
    toast.success("Flock added successfully!");
  };

  // Delete a flock
  const deleteFlock = (id: number) => {
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8 overflow-auto lg:ml-64">
        <ToastContainer />
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
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

    if (!form.batchName.trim() || form.initialCount <= 0) {
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
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
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
        <div className="col-span-2 flex justify-end gap-4">
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
  onDelete: (id: number) => void;
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
          className="bg-gray-50 rounded-lg p-4 mb-4 shadow hover:shadow-md"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900">{flock.batchName}</h3>
              <p className="text-sm text-gray-600">
                Age: {calculateFlockAge(flock.dateAcquired)} days
              </p>
              <p className="text-sm text-gray-600">
                Current Count: {flock.initialCount}
              </p>
              <p className="text-sm text-gray-600">
                Breed: {flock.breed || "Not specified"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(flock)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(flock.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
      {flocks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CalendarIcon className="h-12 w-12 mx-auto mb-4" />
          <p>No flocks available. Add a new flock to start tracking!</p>
        </div>
      )}
    </AnimatePresence>
  );
};
