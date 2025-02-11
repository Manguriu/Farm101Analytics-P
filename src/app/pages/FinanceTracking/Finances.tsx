"use client"
import React from "react";
import Dashsidebar from "../Dashboard/Dashsidebar";
import { ToastContainer } from "react-toastify";
import { ChartBarIcon } from "lucide-react";
import FinancialWorkings from "./FinancialWorkings";

export default function Finances() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Dashsidebar className="custom-class lg:w-64" />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-4">
        <ToastContainer />
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
              Financial Tracking{" "}
            </h1>
            <p className="text-gray-600 mt-2">
              Efficiently manage the working capital and the profits
            </p>
          </div>
          <FinancialWorkings />
      </div>
    </div>
    </div>
  );
}
