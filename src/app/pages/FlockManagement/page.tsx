"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashsidebar from "../Dashboard/Dashsidebar";
import axios from "../../lib/axios";
import { useRouter } from "next/navigation";
import React from "react";
import FarmerPoultryLoader from "../Loading/page";
import Mainprofile from "../Login/Mainprofile";
import { CiUser } from "react-icons/ci";
import AddOrEditFlockForm from "./AddOrEditFlockForm";
import FlockList from "./FlockList";
import { useFlockStore } from "@/app/lib/flockStore";

interface Flock {
  id: string;
  batch_id: string;
  batch_name: string;
  date_acquired: string;
  initial_count: number;
  breed?: string;
  metrics: DailyMetrics[];
}

interface DailyMetrics {
  date: string;
  weight: number;
  feedConsumption: number;
  waterConsumption: number;
}

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const logout = (router: any) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

export default function FlockManagement() {
  const router = useRouter();
  const [flocks, setFlocks] = useState<Flock[]>([]);
  const [editFlock, setEditFlock] = useState<Flock | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const setTotalBirds = useFlockStore((state: { setTotalBirds: any; }) => state.setTotalBirds);

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("Please log in to access flock management.");
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (isAuthenticated()) {
      const fetchFlocks = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get("/flock/flocks/");
          setFlocks(response.data);
          const total = response.data.reduce(
            (acc: number, flock: Flock) => acc + flock.initial_count,
            0
          );
          setTotalBirds(total);
        } catch (error: any) {
          const errorMessage = error.response?.data?.detail || error.message || "Unknown error";
          if (error.response?.status === 401) {
            toast.error("Session expired. Please log in again.");
            logout(router);
          } else {
            toast.error(`Failed to fetch flocks: ${errorMessage}`);
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchFlocks();
    }
  }, [router, setTotalBirds]);

  const addFlock = useCallback(
    async (flock: Omit<Flock, "id" | "metrics" | "batch_id">) => {
      if (!isAuthenticated()) {
        toast.error("You must be logged in to add a flock.");
        router.push("/login");
        return;
      }
      try {
        const payload = {
          batch_name: flock.batch_name,
          date_acquired: flock.date_acquired,
          initial_count: flock.initial_count,
          breed: flock.breed || "",
          metrics: [],
        };
        const response = await axios.post("/flock/flocks/", payload);
        const newFlocks = [response.data, ...flocks];
        setFlocks(newFlocks);
        const total = newFlocks.reduce((acc, f) => acc + f.initial_count, 0);
        setTotalBirds(total);
        toast.success("Flock added successfully!");
      } catch (error: any) {
        const errorMessage = error.response?.data?.detail || error.message || "Unknown error";
        toast.error(`Failed to add flock: ${errorMessage}`);
      }
    },
    [router, flocks, setTotalBirds]
  );

  const deleteFlock = useCallback(
    async (id: string) => {
      if (!isAuthenticated()) {
        toast.error("You must be logged in to delete a flock.");
        router.push("/login");
        return;
      }
      if (window.confirm("Are you sure you want to delete this flock?")) {
        try {
          await axios.delete(`/flock/flocks/${id}/`);
          const newFlocks = flocks.filter((flock) => flock.id !== id);
          setFlocks(newFlocks);
          const total = newFlocks.reduce((acc, f) => acc + f.initial_count, 0);
          setTotalBirds(total);
          toast.success("Flock deleted successfully.");
        } catch (error: any) {
          const errorMessage = error.response?.data?.detail || error.message || "Unknown error";
          toast.error(`Failed to delete flock: ${errorMessage}`);
        }
      }
    },
    [router, flocks, setTotalBirds]
  );

  const saveFlock = useCallback(
    async (updatedFlock: Flock) => {
      if (!isAuthenticated()) {
        toast.error("You must be logged in to edit a flock.");
        router.push("/login");
        return;
      }
      try {
        const payload = {
          batch_name: updatedFlock.batch_name,
          date_acquired: updatedFlock.date_acquired,
          initial_count: updatedFlock.initial_count,
          breed: updatedFlock.breed || "",
          metrics: updatedFlock.metrics,
        };
        await axios.put(`/flock/flocks/${updatedFlock.id}/`, payload);
        const newFlocks = flocks.map((f) =>
          f.id === updatedFlock.id ? updatedFlock : f
        );
        setFlocks(newFlocks);
        const total = newFlocks.reduce((acc, f) => acc + f.initial_count, 0);
        setTotalBirds(total);
        setEditFlock(null);
        toast.success("Flock updated successfully!");
      } catch (error: any) {
        const errorMessage = error.response?.data?.detail || error.message || "Unknown error";
        toast.error(`Failed to update flock: ${errorMessage}`);
      }
    },
    [router, flocks, setTotalBirds]
  );

  const calculateFlockAge = useCallback((dateAcquired: string): number => {
    const today = new Date();
    const acquiredDate = new Date(dateAcquired);
    return Math.floor((today.getTime() - acquiredDate.getTime()) / (1000 * 60 * 60 * 24));
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100 justify-center items-center">
        <div className="text-xl text-gray-600"><FarmerPoultryLoader /></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Dashsidebar className="w-full lg:w-64 flex-shrink-0" />
      <div className="flex-1 p-4">
        <Mainprofile />
        <div className="max-w-7xl mt-2 mx-auto">
          <div className="my-4 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center lg:justify-start gap-2">
              <CiUser className="h-8 w-8 text-blue-600" />
              Flock Management
            </h1>
            <p className="text-gray-600 mt-2">Efficiently manage and monitor your poultry flocks</p>
          </div>

          <AddOrEditFlockForm
            addFlock={addFlock}
            editFlock={editFlock}
            saveFlock={saveFlock}
            cancelEdit={() => setEditFlock(null)}
          />

          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Current Flocks</h2>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
                <CiUser className="h-5 w-5" />
                Total Birds: {flocks.reduce((acc, f) => acc + f.initial_count, 0)}
              </div>
            </div>
            <FlockList
              flocks={flocks}
              onDelete={deleteFlock}
              onEdit={setEditFlock}
              calculateFlockAge={calculateFlockAge}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
