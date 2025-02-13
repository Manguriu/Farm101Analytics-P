import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import Dashsidebar from '../Dashboard/Dashsidebar'
import { ChartBarIcon } from 'lucide-react'
import Breadcrumb from '../Dashboard/Breadcrumb'

ChartJS.register(...registerables)

const records = [
  { batchName: "Batch 2", date: "2025-02-11", initialBirds: 100, remainingBirds: 95, totalExpenses: 1800, revenue: 5000, profitMargin: 3200 },
  { batchName: "Batch 1", date: "2025-02-11", initialBirds: 100, remainingBirds: 95, totalExpenses: 1800, revenue: 5000, profitMargin: 3200 },
  { batchName: "Mona Young", date: "2025-02-11", initialBirds: 312, remainingBirds: 296, totalExpenses: 7800, revenue: 187664, profitMargin: 179864 },
  { batchName: "Mona 566", date: "2025-02-11", initialBirds: 312, remainingBirds: 296, totalExpenses: 7800, revenue: 187664, profitMargin: 179864 },
  { batchName: "Young", date: "2025-02-11", initialBirds: 312, remainingBirds: 296, totalExpenses: 7800, revenue: 18764, profitMargin: 17984 },
]

// Chart Data
const barChartData = {
  labels: records.map(r => r.batchName),
  datasets: [
    { label: "Revenue", data: records.map(r => r.revenue), backgroundColor: "#6a0dad" },
    { label: "Total Expenses", data: records.map(r => r.totalExpenses), backgroundColor: "#008080" },
    { label: "Profit Margin", data: records.map(r => r.profitMargin), backgroundColor: "#ffd700" },
  ]
}

const pieChartData = {
  labels: records.map(r => r.batchName),
  datasets: [{
    data: records.map(r => r.totalExpenses),
    backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FFA500", "#8A2BE2"],
  }]
}

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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 mt-2">
      {/* Sidebar */}
      <Dashsidebar className="w-full lg:w-64 flex-shrink-0" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 p-4">
        <div className="max-w-7xl mx-auto w-full">
        <Breadcrumb />

          {/* Header Section */}
          <div className=" mt-4 mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center lg:justify-start gap-2 max-sm:text-lg">
              <ChartBarIcon className="h-8 w-8 text-blue-600 " />
              Reports and Insights
            </h1>
            <p className="text-gray-600 mt-2">
              Revenue and Expense Reports on all the Batches
            </p>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Financial Overview */}
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-center mb-2">Financial Overview</h3>
              <div className="h-[250px] sm:h-[300px] w-full">
                <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Expense Distribution */}
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-center mb-2">Expense Distribution</h3>
              <div className="h-[250px] sm:h-[300px] flex justify-center">
                <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Profit Margin */}
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-center mb-2">Profit Margin</h3>
              <div className="h-[250px] sm:h-[300px] w-full">
                <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          {/* Detailed Table - Batch Performance */}
          <div className="p-4 mt-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Batch Performance</h3>
            <p className="text-gray-600 text-sm mb-4">
              This table provides a breakdown of each batch’s financial performance.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                  <tr className="text-left border-b">
                    <th className="py-2 px-3">Batch</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Initial Birds</th>
                    <th className="py-2 px-3">Remaining</th>
                    <th className="py-2 px-3">Revenue</th>
                    <th className="py-2 px-3">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(record => (
                    <tr key={record.batchName} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-3">{record.batchName}</td>
                      <td className="py-3 px-3">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="py-3 px-3">{record.initialBirds}</td>
                      <td className="py-3 px-3">{record.remainingBirds}</td>
                      <td className="py-3 px-3 font-medium text-blue-600">
                        KSH {record.revenue.toLocaleString()}
                      </td>
                      <td className={`py-3 px-3 font-medium ${
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
