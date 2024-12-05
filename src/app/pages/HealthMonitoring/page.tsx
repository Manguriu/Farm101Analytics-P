"use client";

import { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashsidebar from "../Dashboard/Dashsidebar";
import HealthHeader from "./HealthHeader";

// Define the type for health check records
interface HealthCheck {
  id: string;
  batchName: string;
  date: string;
  symptom: string;
  deaths: string;
  treatment: string;
  notes: string;
}

export default function HealthMonitoring() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([
    {
      id: "1",
      batchName: "Batch A",
      date: format(new Date(), "yyyy-MM-dd"),
      symptom: "Lethargy",
      deaths: "10",
      treatment: "Vitamin Supplement",
      notes: "Observed in 5% of the flock.",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<HealthCheck>({
    id: "",
    batchName: "",
    date: format(new Date(), "yyyy-MM-dd"),
    symptom: "",
    deaths: "",
    treatment: "",
    notes: "",
  });

  const openDialog = (data: HealthCheck | null = null) => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        id: "",
        batchName: "",
        date: format(new Date(), "yyyy-MM-dd"),
        symptom: "",
        deaths: "",
        treatment: "",
        notes: "",
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setHealthChecks((prev) => prev.filter((check) => check.id !== id));
      toast.success("Health check deleted successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id) {
      // Update existing record
      setHealthChecks((prev) =>
        prev.map((record) => (record.id === formData.id ? formData : record))
      );
      toast.success("Health check updated successfully!");
    } else {
      // Add new record
      setHealthChecks((prev) => [
        { ...formData, id: Math.random().toString(36).substring(2, 9) },
        ...prev,
      ]);
      toast.success("Health check added successfully!");
    }

    closeDialog();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <Dashsidebar />
      <div className="max-w-5xl mx-auto space-y-6">
        <HealthHeader />
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardCheckIcon className="h-6 w-6 text-blue-600" />
            Health Monitoring
          </h1>
          <button
            onClick={() => openDialog()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add Health Check
          </button>
        </div>

        {/* Health Checks List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Health Checks</h2>
          <AnimatePresence>
            {healthChecks.map((check) => (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b py-4 last:border-none"
              >
                <div className="p-6 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition">
                  {/* Header Section */}
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Batch A
                      </h3>
                      <p className="text-sm text-gray-500">December 5, 2024</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openDialog(check)}
                        className="flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 shadow-sm transition"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(check.id)}
                        className="flex items-center justify-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 shadow-sm transition"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-center">
                      <span className="inline-block bg-blue-50 text-blue-600 p-2 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.293 3.707a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 9.293 4.707a1 1 0 010-1.414z" />
                        </svg>
                      </span>
                      <p className="text-sm text-gray-700 ml-3">
                        <span className="font-medium">Symptom:</span> Lethargy
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block bg-red-50 text-red-600 p-2 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.293 3.707a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 9.293 4.707a1 1 0 010-1.414z" />
                        </svg>
                      </span>
                      <p className="text-sm text-gray-700 ml-3">
                        <span className="font-medium">Deaths count:</span> 10
                      </p>
                    </div>
                    <div className="flex items-center col-span-2">
                      <span className="inline-block bg-green-50 text-green-600 p-2 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.293 3.707a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 9.293 4.707a1 1 0 010-1.414z" />
                        </svg>
                      </span>
                      <p className="text-sm text-gray-700 ml-3">
                        <span className="font-medium">Treatment:</span> Vitamin
                        Supplement
                      </p>
                    </div>
                    <div className="flex items-center col-span-2">
                      <span className="inline-block bg-yellow-50 text-yellow-600 p-2 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.293 3.707a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 9.293 4.707a1 1 0 010-1.414z" />
                        </svg>
                      </span>
                      <p className="text-sm text-gray-700 ml-3">
                        <span className="font-medium">Notes:</span> Observed in
                        5% of the flock.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {healthChecks.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-4">
              No health checks available.
            </p>
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {formData.id ? "Edit Health Check" : "Add Health Check"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Batch Name
                  </label>
                  <input
                    value={formData.batchName}
                    onChange={(e) =>
                      setFormData({ ...formData, batchName: e.target.value })
                    }
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Symptom</label>
                  <input
                    value={formData.symptom}
                    onChange={(e) =>
                      setFormData({ ...formData, symptom: e.target.value })
                    }
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Deaths</label>
                  <input
                    value={formData.deaths}
                    onChange={(e) =>
                      setFormData({ ...formData, deaths: e.target.value })
                    }
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Treatment</label>
                  <input
                    value={formData.treatment}
                    onChange={(e) =>
                      setFormData({ ...formData, treatment: e.target.value })
                    }
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
