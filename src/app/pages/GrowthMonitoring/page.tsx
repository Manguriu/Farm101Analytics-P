
"use client";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashsidebar from "../Dashboard/Dashsidebar";
import GrowthMonitoringMain from "./GrowthMonitoringMain";


export default function GrowthMonitoring() {

  return (
    <Suspense fallback={<div>Loading....</div>}>
    <div className="flex h-screen">
      <Dashsidebar className="custom-class" />
      <div className="flex-1 bg-gray-50 p-8">
        <ToastContainer />
        <GrowthMonitoringMain />
    </div>
    </div>
    </Suspense>
  );
}
