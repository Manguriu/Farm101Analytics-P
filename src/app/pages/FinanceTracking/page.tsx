"use client";
import React from "react";
import Dashsidebar from "../Dashboard/Dashsidebar";
import { ToastContainer } from "react-toastify";
import { ChartBarIcon } from "lucide-react";
import FinancialWorkings from "./FinancialWorkings";
import Breadcrumb from "../Dashboard/Breadcrumb";

export default function page() {
  return (
    <div className="flex flex-col md:flex-row h-screen mt-2">
      {/* Sidebar */}
      <Dashsidebar className="custom-class lg:w-64" />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-4">
        <ToastContainer />
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          {/* Header Section */}
          <div className="mt-4 mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center lg:justify-start gap-2 max-sm:text-lg">
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
