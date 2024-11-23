import React from 'react'


export default function MaindashStats() {
  return (
    <div className="grid gap-6">
  {/* Stats Overview */}
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {/* Total Birds */}
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-800">Total Birds</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7l1.664 4.992a2 2 0 001.872 1.392H17.464a2 2 0 001.872-1.392L21 7M5 17h14m-7 4h.01"
          />
        </svg>
      </div>
      <div className="text-2xl font-bold text-gray-900">1,234</div>
      <p className="text-xs text-gray-600 mt-1">+12% from last month</p>
      <div className="relative pt-2">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: "45%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
    </div>

    {/* Feed Consumption */}
    <div className="bg-gradient-to-br from-green-50 to-green-100 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-800">Feed Consumption</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16V7a4 4 0 014-4h8a4 4 0 014 4v9M4 20h16"
          />
        </svg>
      </div>
      <div className="text-2xl font-bold text-gray-900">2.4 tons</div>
      <p className="text-xs text-gray-600 mt-1">Average daily usage</p>
      <div className="relative pt-2">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
          <div
            style={{ width: "65%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
        </div>
      </div>
    </div>

    {/* Water Usage */}
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-800">Water Usage</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-teal-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 3h5a2 2 0 012 2v2a2 2 0 01-2 2h-5M3 7h3M4 21h16"
          />
        </svg>
      </div>
      <div className="text-2xl font-bold text-gray-900">4,500 L</div>
      <p className="text-xs text-gray-600 mt-1">Daily consumption</p>
      <div className="relative pt-2">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-teal-200">
          <div
            style={{ width: "80%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
          ></div>
        </div>
      </div>
    </div>

    {/* Health Status */}
    <div className="bg-gradient-to-br from-red-50 to-red-100 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-800">Health Status</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14"
          />
        </svg>
      </div>
      <div className="text-2xl font-bold text-gray-900">98%</div>
      <p className="text-xs text-gray-600 mt-1">Flock wellness score</p>
      <div className="relative pt-2">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
          <div
            style={{ width: "98%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
          ></div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}