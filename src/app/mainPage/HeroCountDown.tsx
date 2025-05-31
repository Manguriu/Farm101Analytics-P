import React, { useEffect, useState } from "react";

export default function HeroCountDown() {
  // State for stats
  const [farmsOptimized, setFarmsOptimized] = useState(0);
  const [systemUptime, setSystemUptime] = useState(0);
  const [costReduction, setCostReduction] = useState(0);

  useEffect(() => {
    // Countdown animation
    const duration = 2000; 
    const stepTime = 20; 

    const farmsTarget = 10000;
    const uptimeTarget = 99.9;
    const costTarget = 30;

    // Calculate steps
    const farmsStep = (farmsTarget / duration) * stepTime;
    const uptimeStep = (uptimeTarget / duration) * stepTime;
    const costStep = (costTarget / duration) * stepTime;

    // Interval to update states
    const interval = setInterval(() => {
      setFarmsOptimized((prev) => {
        if (prev + farmsStep >= farmsTarget) return farmsTarget;
        return Math.ceil(prev + farmsStep);
      });
      setSystemUptime((prev) => {
        if (prev + uptimeStep >= uptimeTarget) return uptimeTarget;
        return parseFloat((prev + uptimeStep).toFixed(1));
      });
      setCostReduction((prev) => {
        if (prev + costStep >= costTarget) return costTarget;
        return Math.ceil(prev + costStep);
      });
    }, stepTime);

    // Clear interval after animation is complete
    setTimeout(() => clearInterval(interval), duration);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="mt-12 flex flex-wrap justify-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500">
          {farmsOptimized.toLocaleString()}+
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">Farms Optimized</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500">
          {systemUptime}%
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">System Uptime</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500">
          {costReduction}%
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">Cost Reduction</p>
      </div>
    </div>
  );
}
