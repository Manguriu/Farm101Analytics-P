
import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import Dashsidebar from '../Dashboard/Dashsidebar'
import { ChartBarIcon } from 'lucide-react'

ChartJS.register(...registerables)

const records = [
  { batchName: "Batch 2", date: "2025-02-11", initialBirds: 100, remainingBirds: 95, totalExpenses: 1800, revenue: 5000, profitMargin: 3200 },
  { batchName: "Batch 1", date: "2025-02-11", initialBirds: 100, remainingBirds: 95, totalExpenses: 1800, revenue: 5000, profitMargin: 3200 },
  { batchName: "Mona Young", date: "2025-02-11", initialBirds: 312, remainingBirds: 296, totalExpenses: 7800, revenue: 187664, profitMargin: 179864 },
  { batchName: "Mona 566", date: "2025-02-11", initialBirds: 312, remainingBirds: 296, totalExpenses: 7800, revenue: 187664, profitMargin: 179864 },
  { batchName: "Young", date: "2025-02-11", initialBirds: 312, remainingBirds: 296, totalExpenses: 7800, revenue: 18764, profitMargin: 17984 },
]

// Bar Chart (Financial Overview)
const barChartData = {
  labels: records.map(r => r.batchName),
  datasets: [
    { label: "Revenue", data: records.map(r => r.revenue), backgroundColor: "#6a0dad" },
    { label: "Total Expenses", data: records.map(r => r.totalExpenses), backgroundColor: "#008080" },
    { label: "Profit Margin", data: records.map(r => r.profitMargin), backgroundColor: "#ffd700" },
  ]
}

// Pie Chart (Expense Distribution)
const pieChartData = {
  labels: records.map(r => r.batchName),
  datasets: [{
    data: records.map(r => r.totalExpenses),
    backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FFA500", "#8A2BE2"],
  }]
}

// Line Chart (Profit Margin)
const lineChartData = {
  labels: records.map(r => r.batchName),
  datasets: [{
    label: "Profit Margin (KSH)",
    data: records.map(r => r.profitMargin),
    borderColor: "#2E8B57",
    fill: false,
    pointBackgroundColor: "#2E8B57",
  }]
}

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-gray-100 ">
    {/* Sidebar */}
    <Dashsidebar className="custom-class w-64" />

    {/* Main Content */}
    <div className="flex flex-col flex-1 gap-4 bg-gray-50 p-4 space-y-6 ">
   
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
            Reports and Insights {" "}
          </h1>
          <p className="text-gray-600 mt-2">
           Revenue and Expense Reports on all the Batches
          </p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Financial Overview */}
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">Financial Overview per Batch</h3>
          <p className="text-gray-500 text-sm text-center mb-4">
            This bar chart compares revenue, expenses, and profit margins for each batch.
          </p>
          <div className="h-[300px] w-full">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">Expense Distribution by Batch</h3>
          <p className="text-gray-500 text-sm text-center mb-4">
            This pie chart visualizes the total expenses incurred for each batch.
          </p>
          <div className="h-[300px] w-full flex justify-center">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Profit Margin */}
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">Profit Margin per Batch</h3>
          <p className="text-gray-500 text-sm text-center mb-4">
            The line chart tracks profit margins across different batches over time.
          </p>
          <div className="h-[300px] w-full">
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Detailed Table - Batch Performance */}
      <div className="p-6 mt-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Batch Performance</h3>
        <p className="text-gray-500 text-sm mb-4">
          This table provides a detailed breakdown of each batch’s performance, including initial and remaining birds, revenue, and profit.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr className="text-left border-b">
                <th className="py-3 px-4">Batch</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Initial Birds</th>
                <th className="py-3 px-4">Remaining</th>
                <th className="py-3 px-4">Revenue</th>
                <th className="py-3 px-4">Profit</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.batchName} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-4">{record.batchName}</td>
                  <td className="py-4 px-4">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="py-4 px-4">{record.initialBirds}</td>
                  <td className="py-4 px-4">{record.remainingBirds}</td>
                  <td className="py-4 px-4 font-medium text-blue-600">KSH {record.revenue.toLocaleString()}</td>
                  <td className={`py-4 px-4 font-medium ${
                    record.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    KSH {record.profitMargin.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}
