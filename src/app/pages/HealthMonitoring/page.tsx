"use client";
import { Suspense } from "react";
import HealthHeader from "./HealthHeader";

export default function HealthMonitoring() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <HealthHeader />
    </Suspense>
  );
}
