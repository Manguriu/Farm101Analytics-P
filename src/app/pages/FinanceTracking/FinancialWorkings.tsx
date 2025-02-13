"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FinancialRecord {
  id: string;
  batchName: string;
  expenses: {
    food: number;
    water: number;
    vaccination: number;
    medicine: number;
    labExpenses: number;
    initialBirds: number;
  };
  revenue: number;
  initialBirds: number;
  initialBirdPrice: number;
  remainingBirds: number;
  pricePerBird: number;
  date: string;
}

export default function FinancialWorkings() {
  const [expenses, setExpenses] = useState({
    food: "",
    water: "",
    vaccination: "",
    medicine: "",
    labExpenses: "",
  });
  const [initialBirds, setInitialBirds] = useState("");
  const [initialBirdPrice, setInitialBirdPrice] = useState("");
  const [remainingBirds, setRemainingBirds] = useState("");
  const [pricePerBird, setPricePerBird] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [savedRecords, setSavedRecords] = useState<FinancialRecord[]>([]);
  const [batchName, setBatchName] = useState("");

  const totalExpenses =
    Object.values(expenses).reduce(
      (sum, expense) => sum + (Number.parseFloat(expense) || 0),
      0
    ) +
    (Number.parseFloat(initialBirds) || 0) *
      (Number.parseFloat(initialBirdPrice) || 0);
  const profitMargin = revenue - totalExpenses;

  useEffect(() => {
    const calculatedRevenue =
      (Number.parseFloat(remainingBirds) || 0) *
      (Number.parseFloat(pricePerBird) || 0);
    setRevenue(calculatedRevenue);
  }, [remainingBirds, pricePerBird]);

  useEffect(() => {
    fetchSavedRecords();
  }, []);

  const fetchSavedRecords = async () => {
    // Simulating API call to fetch saved records
    const mockRecords: FinancialRecord[] = [
      {
        id: "1",
        batchName: "Batch 2",
        expenses: {
          food: 100,
          water: 50,
          vaccination: 200,
          medicine: 150,
          labExpenses: 300,
          initialBirds: 1000,
        },
        revenue: 5000,
        initialBirds: 100,
        initialBirdPrice: 10,
        remainingBirds: 95,
        pricePerBird: 52.63,
        date: new Date().toISOString(),
      },
      {
        id: "2",
        batchName: "Batch 1",
        expenses: {
          food: 100,
          water: 50,
          vaccination: 200,
          medicine: 150,
          labExpenses: 300,
          initialBirds: 1000,
        },
        revenue: 5000,
        initialBirds: 100,
        initialBirdPrice: 10,
        remainingBirds: 95,
        pricePerBird: 52.63,
        date: new Date().toISOString(),
      },
    ];
    setSavedRecords(mockRecords);
  };

  const handleExpenseChange = (
    expenseType: keyof typeof expenses,
    value: string
  ) => {
    setExpenses((prev) => ({ ...prev, [expenseType]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const newRecord: FinancialRecord = {
        id: Date.now().toString(),
        batchName,
        expenses: {
          ...Object.fromEntries(
            Object.entries(expenses).map(([key, value]) => [
              key,
              Number.parseFloat(value) || 0,
            ])
          ),
          initialBirds:
            (Number.parseFloat(initialBirds) || 0) *
            (Number.parseFloat(initialBirdPrice) || 0),
          food: 0,
          water: 0,
          vaccination: 0,
          medicine: 0,
          labExpenses: 0,
        },
        revenue,
        initialBirds: Number.parseFloat(initialBirds) || 0,
        initialBirdPrice: Number.parseFloat(initialBirdPrice) || 0,
        remainingBirds: Number.parseFloat(remainingBirds) || 0,
        pricePerBird: Number.parseFloat(pricePerBird) || 0,
        date: new Date().toISOString(),
      };

      setSavedRecords((prev) => [...prev, newRecord]);

      toast.success("Financial record saved successfully");
      // Reset the form fields
      setBatchName("");
      setExpenses({
        food: "",
        water: "",
        vaccination: "",
        medicine: "",
        labExpenses: "",
      });
      setInitialBirds("");
      setInitialBirdPrice("");
      setRemainingBirds("");
      setPricePerBird("");
      setRevenue(0);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to save financial record");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col md:grid-cols-2 gap-6 w-full">
        <div className="p-2 bg-blue-100 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-200 px-4 py-2">
            <h2 className="text-xl font-semibold text-blue-800">Expenses</h2>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label
                htmlFor="batchName"
                className="block text-sm font-medium text-blue-700"
              >
                Batch Name
              </label>
              <input
                id="batchName"
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="Enter batch name"
                className="p-2 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="initialBirds"
                className="block text-sm font-medium text-blue-700"
              >
                Number of Initial Birds
              </label>
              <input
                id="initialBirds"
                type="number"
                value={initialBirds}
                onChange={(e) => setInitialBirds(e.target.value)}
                placeholder="Enter number of initial birds"
                className="p-2 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="initialBirdPrice"
                className="block text-sm font-medium text-blue-700"
              >
                Price per Initial Bird
              </label>
              <input
                id="initialBirdPrice"
                type="number"
                value={initialBirdPrice}
                onChange={(e) => setInitialBirdPrice(e.target.value)}
                placeholder="Enter price per initial bird"
                className="p-2 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <span className="block text-sm font-medium text-blue-800">
                Total Initial Birds Cost
              </span>
              <p className="text-xl font-bold text-blue-600">
                <span className="text-gray-700 font-medium">KSH</span>

                {(
                  (Number.parseFloat(initialBirds) || 0) *
                  (Number.parseFloat(initialBirdPrice) || 0)
                ).toFixed(2)}
              </p>
            </div>
            <div className="border-t border-blue-200 my-4"></div>
            {Object.entries(expenses).map(([key, value]) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-blue-700"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  id={key}
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleExpenseChange(
                      key as keyof typeof expenses,
                      e.target.value
                    )
                  }
                  placeholder={`Enter ${key} expense`}
                  className="p-2 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 bg-green-100 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-green-200 px-4 py-2">
            <h2 className="text-xl font-semibold text-green-800">Revenue</h2>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label
                htmlFor="remainingBirds"
                className="block text-sm font-medium text-green-700"
              >
                Number of Remaining Birds
              </label>
              <input
                id="remainingBirds"
                type="number"
                value={remainingBirds}
                onChange={(e) => setRemainingBirds(e.target.value)}
                placeholder="Enter number of remaining birds"
                className="p-2 mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="pricePerBird"
                className="block text-sm font-medium text-green-700"
              >
                Selling Price per Bird
              </label>
              <input
                id="pricePerBird"
                type="number"
                value={pricePerBird}
                onChange={(e) => setPricePerBird(e.target.value)}
                placeholder="Enter selling price per bird"
                className="p-2 mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <span className="block text-sm font-medium text-green-800">
                Total Revenue
              </span>
              <p className="text-2xl font-bold text-green-600">
                <span className="text-gray-700 font-medium">KSH</span>{" "}
                {revenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-2xl rounded-xl overflow-hidden border border-yellow-200">
        <div className="bg-yellow-200 px-6 py-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-yellow-900">
            📊 Financial Summary
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-lg flex justify-between">
            <span className="font-medium text-gray-700">Total Expenses:</span>
            <span className="font-bold text-red-600">
              {" "}
              <span className="text-gray-700 font-medium">KSH</span>{" "}
              {totalExpenses.toFixed(2)}
            </span>
          </p>
          <p className="text-lg flex justify-between">
            <span className="font-medium text-gray-700">Total Revenue:</span>
            <span className="font-bold text-green-600">
              {" "}
              <span className="text-gray-700 font-medium">KSH</span>{" "}
              {revenue.toFixed(2)}
            </span>
          </p>
          <p className="text-xl flex justify-between">
            <span className="font-semibold text-gray-800">Profit Margin:</span>
            <span
              className={`font-bold ${
                profitMargin >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="text-gray-700 font-medium">KSH</span>{" "}
              {profitMargin.toFixed(2)}
            </span>
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
            >
              {isSaving ? "Saving..." : "💾 Save Financial Record"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-2 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Saved Financial Records
          </h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto p-4">
            <table className="min-w-full divide-y divide-gray-400">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Initial Birds
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remaining Birds
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Expenses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit Margin
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savedRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.batchName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.initialBirds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.remainingBirds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      KSH
                      {(
                        record.expenses.food +
                        record.expenses.water +
                        record.expenses.vaccination +
                        record.expenses.medicine +
                        record.expenses.labExpenses +
                        record.expenses.initialBirds
                      ).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${record.revenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      KSH
                      {(
                        record.revenue -
                        (record.expenses.food +
                          record.expenses.water +
                          record.expenses.vaccination +
                          record.expenses.medicine +
                          record.expenses.labExpenses +
                          record.expenses.initialBirds)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}
