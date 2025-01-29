"use client";

import { Suspense } from "react";
import GrowthMonitoringMain from "./GrowthMonitoringMain";
import { ToastContainer } from "react-toastify";


export default function GrowthMonitoring() {

  return (
    <Suspense fallback={<div>Loading....</div>}>
 
            <ToastContainer />
        <GrowthMonitoringMain />
    
    </Suspense>
  );
}
