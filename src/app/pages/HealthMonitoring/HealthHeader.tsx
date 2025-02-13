import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  UserGroupIcon,
  CalendarIcon,
  IdentificationIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/app/lib/presentation/components/ui/button/Button";
import Dashsidebar from "../Dashboard/Dashsidebar";

// Define the HealthCheck type
type HealthCheck = {
  id: number;
  date: string;
  symptom: string;
  deaths: number;
  treatment: string;
  notes: string;
  batchId: number;
  batchName: string;
};

export default function HealthHeader() {
  const searchParams = useSearchParams();
  const batchName = searchParams.get("batchName") || "Unknown Batch";
  const batchId = parseInt(searchParams.get("batchId") || "0", 10);
  const initialCount = parseInt(searchParams.get("currentCount") || "0", 10);
  const breed = searchParams.get("breed") || "Not Specified";
  const startDate = searchParams.get("startDate") || "Unknown";

  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [currentCount, setCurrentCount] = useState(initialCount); // Updated count
  const [showModal, setShowModal] = useState(false);
  const [currentCheck, setCurrentCheck] = useState<HealthCheck | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch initial data (replace with API call if using a backend)
    setHealthChecks([
      {
        id: 1,
        date: "2025-01-20",
        symptom: "Fever",
        deaths: 0,
        treatment: "Medication",
        notes: "Monitoring closely",
        batchId,
        batchName,
      },
      {
        id: 3,
        date: "2025-01-20",
        symptom: "Fever",
        deaths: 8,
        treatment: "ghghghh",
        notes: "jkjk closely",
        batchId,
        batchName,
      },
    ]);
  }, [batchId, batchName]);
  const handleSave = (newCheck: HealthCheck) => {
    const newDeaths = parseInt(newCheck.deaths.toString(), 10);

    if (isNaN(newDeaths) || newDeaths < 0) {
      toast.error("Please enter a valid number of deaths.");
      return;
    }

    if (currentCheck) {
      // Edit existing check
      setHealthChecks((prev) =>
        prev.map((check) =>
          check.id === currentCheck.id ? { ...check, ...newCheck } : check
        )
      );

      // Adjust the count by adding back the old deaths and subtracting the new deaths
      const oldDeaths = currentCheck.deaths;
      setCurrentCount((prevCount) => prevCount + oldDeaths - newDeaths);

      toast.info("Health check updated successfully");
    } else {
      // Add new check and subtract deaths
      setHealthChecks((prev) => [
        ...prev,
        { ...newCheck, id: Date.now(), batchId, batchName },
      ]);
      setCurrentCount((prevCount) => prevCount - newDeaths);
      toast.success("Health check added successfully");
    }

    setShowModal(false);
    setCurrentCheck(null);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      setHealthChecks((prev) => prev.filter((check) => check.id !== deleteId));
      toast.success("Health check deleted successfully");
      setDeleteId(null);
    }
  };

  const handleEdit = (check: HealthCheck) => {
    setCurrentCheck(check);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Dashsidebar className="custom-class lg:w-64" />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-4">
        <ToastContainer />
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-7xl mx-auto flex flex-col">
          <ToastContainer />
          <div className="flex items-center gap-4 mb-4">
            <UserGroupIcon className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Batch Name: {batchName}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <IdentificationIcon className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">
                <span className="font-medium">Batch ID:</span> {batchId}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IdentificationIcon className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">
                <span className="font-medium">Current Count:</span>{" "}
                {currentCount} Birds
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IdentificationIcon className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">
                <span className="font-medium">Breed:</span> {breed}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <p className="text-gray-700">
                <span className="font-medium">Start Date:</span> {startDate}
              </p>
            </div>
          </div>

          {/* Add Health Checks */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Health Check
          </button>
          <div className="mt-6">
            {/* List Health Checks */}
            <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
              {healthChecks.map((check) => (
                <div
                  key={check.id}
                  className="flex flex-col lg:flex-row justify-between items-stretch gap-4 w-full p-4 border-b border-gray-200 dark:border-gray-700 bg-white shadow-sm rounded-lg"
                >
                  {/* Health Check Info */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Batch ID: {check.batchId}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Batch Name: {check.batchName}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Check Out Date{check.date}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Symptom: {check.symptom}
                    </p>
                    <div className="bg-red-200 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                      Deaths: {check.deaths}
                    </div>
                    <p className="text-sm text-gray-600">
                      Treatment: {check.treatment}
                    </p>
                    <p className="text-sm text-gray-600">
                      Notes: {check.notes || "N/A"}
                    </p>
                  </div>

                  {/* Actions Section */}
                  <div className="flex flex-row lg:flex-col gap-2 justify-center items-center lg:items-start">
                    <button
                      onClick={() => handleEdit(check)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition w-full lg:w-40"
                    >
                      <PencilIcon className="h-5 w-5" />
                      <span className="font-medium">Edit</span>
                    </button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setDeleteId(check.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition w-full lg:w-40"
                        >
                          <TrashIcon className="h-5 w-5" />
                          <span className="font-medium">Delete</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Delete</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this health check?
                            This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Cancel</Button>
                          </DialogClose>
                          <Button variant="destructive" onClick={handleDelete}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}

              {/* Total Row */}
              <div className="flex flex-row justify-between items-center p-4 bg-red-200 rounded-lg shadow-sm mt-4">
                <div className="text-lg font-semibold text-gray-800">
                  Total Deaths
                </div>
                <div className="bg-red-300 text-gray-800 text-sm font-medium px-4 py-2 rounded">
                  {healthChecks.reduce(
                    (sum, check) => sum + Number(check.deaths),
                    0
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Add/Edit */}
          {showModal && (
            <Modal
              batchName={batchName}
              batchId={batchId}
              initialData={currentCheck}
              onClose={() => {
                setShowModal(false);
                setCurrentCheck(null);
              }}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type ModalProps = {
  initialData: HealthCheck | null;
  batchName: string;
  batchId: number;
  onClose: () => void;
  onSave: (newCheck: HealthCheck) => void;
};

function Modal({
  initialData,
  batchName,
  batchId,
  onClose,
  onSave,
}: ModalProps) {
  const [form, setForm] = useState<HealthCheck>(
    initialData || {
      id: 0,
      date: "",
      symptom: "",
      deaths: 0,
      treatment: "",
      notes: "",
      batchName,
      batchId,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Health Check" : "Add Health Check"}
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Batch Name:</strong> {batchName}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Symptom</label>
            <input
              type="text"
              name="symptom"
              value={form.symptom}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Deaths</label>
            <input
              type="number"
              name="deaths"
              value={form.deaths}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Treatment</label>
            <input
              type="text"
              name="treatment"
              value={form.treatment}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
