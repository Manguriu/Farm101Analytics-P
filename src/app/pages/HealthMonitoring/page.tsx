
"use client";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashsidebar from "../Dashboard/Dashsidebar";
import HealthHeader from "./HealthHeader";


export default function HealthMonitoring() {

  return (
    <Suspense fallback={<div>Loading....</div>}>
    <div className="flex h-screen">
      <Dashsidebar className="custom-class lg:w-64" />
      <div className="flex-1 bg-gray-50 p-8">
        <ToastContainer />
        <HealthHeader />
    </div>
    </div>
    </Suspense>
  );
}
