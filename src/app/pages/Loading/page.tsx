"use client";

import React from "react";

const FarmerPoultryLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Chicken and analysis meter container */}
      <div className="relative flex flex-col items-center justify-center max-w-sm w-full h-32">
        {/* Animated chicken */}
        <div className="absolute top-0 text-8xl animate-peck">🐔</div>

        {/* Analysis meter (progress bar) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-gray-200 rounded-full overflow-hidden border border-gray-400 shadow-sm">
          <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-analyze"></div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes peck {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }
        @keyframes analyze {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-peck {
          animation: peck 1.3s infinite;
        }
        .animate-analyze {
          animation: analyze 2.5s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default FarmerPoultryLoader;
