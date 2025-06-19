"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface FlockFormProps {
  addFlock: (flock: Omit<Flock, "id" | "metrics" | "batch_id">) => void;
  editFlock: Flock | null;
  saveFlock: (flock: Flock) => void;
  cancelEdit: () => void;
}

interface Flock {
  id: string;
  batch_id: string;
  batch_name: string;
  date_acquired: string;
  initial_count: number;
  breed?: string;
  metrics: DailyMetric[];
}

interface DailyMetric {
  date: string;
  weight: number;
  feedConsumption: number;
  waterConsumption: number;
}

const AddOrEditFlockForm: React.FC<FlockFormProps> = ({
  addFlock,
  editFlock,
  saveFlock,
  cancelEdit,
}) => {
  const [formData, setFormData] = useState({
    batch_name: "",
    date_acquired: "",
    initial_count: 0,
    breed: "",
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (editFlock) {
      setFormData({
        batch_name: editFlock.batch_name,
        date_acquired: editFlock.date_acquired,
        initial_count: editFlock.initial_count,
        breed: editFlock.breed || "",
      });
    }
  }, [editFlock]);

  useEffect(() => {
    const isFormValid =
      formData.batch_name.trim() !== "" &&
      formData.date_acquired !== "" &&
      formData.initial_count > 0;
    setIsValid(isFormValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "initial_count" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    if (editFlock) {
      saveFlock({ ...editFlock, ...formData });
    } else {
      addFlock(formData);
    }

    setFormData({
      batch_name: "",
      date_acquired: "",
      initial_count: 0,
      breed: "",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl space-y-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="form"
      aria-labelledby="form-title"
    >
      <motion.h2
        id="form-title"
        className="text-2xl font-bold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {editFlock ? "Edit Flock" : "Add New Flock"}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          className="relative"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <input
            type="text"
            name="batch_name"
            placeholder="Batch Name"
            value={formData.batch_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-800 placeholder-gray-400"
            aria-required="true"
            aria-label="Batch Name"
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <input
            type="date"
            name="date_acquired"
            value={formData.date_acquired}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-800"
            aria-required="true"
            aria-label="Date Acquired"
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <input
            type="number"
            name="initial_count"
            placeholder="Initial Count"
            value={formData.initial_count || ""}
            onChange={handleChange}
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-800 placeholder-gray-400"
            aria-required="true"
            aria-label="Initial Count"
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <input
            type="text"
            name="breed"
            placeholder="Breed (optional)"
            value={formData.breed}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-gray-800 placeholder-gray-400"
            aria-label="Breed"
          />
        </motion.div>
      </div>
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.button
          type="submit"
          disabled={!isValid}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            isValid
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.95 } : {}}
          aria-label={editFlock ? "Save Changes" : "Add Flock"}
        >
          {editFlock ? "Save Changes" : "Add Flock"}
        </motion.button>
        {editFlock && (
          <motion.button
            type="button"
            onClick={cancelEdit}
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Cancel"
          >
            Cancel
          </motion.button>
        )}
      </motion.div>
    </motion.form>
  );
};

export default AddOrEditFlockForm;