"use client";

import React from "react";
import FlockManage from "./FlockManage";

export default function page() {
  return (
    <div className="p-4 items-center justify-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:text-center sm:text-left">
        Feed & Watering monitoring
      </h1>
      <div className="p-4">
        <h1 className="lg:text-center lg:text-2xl">Flocks Available</h1>
        <FlockManage />
      </div>
    </div>
  );
}
