import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  UserGroupIcon,
  CalendarIcon,
  IdentificationIcon,
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
  const batchId = parseInt(searchParams.get("batchId") || "0", 10); // Assuming batchId is passed as a query parameter
  const currentCount = searchParams.get("currentCount") || "N/A";
  const breed = searchParams.get("breed") || "Not Specified";
  const startDate = searchParams.get("startDate") || "Unknown";

  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCheck, setCurrentCheck] = useState<HealthCheck | null>(null);

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
        id: 2,
        date: "2025-01-20",
        symptom: "Fever",
        deaths: 0,
        treatment: "Medidsdsdcation",
        notes: "Monitoring clossasasaely",
        batchId,
        batchName,
      },
    ]);
  }, [batchId, batchName]);

  const handleSave = (newCheck: HealthCheck) => {
    if (currentCheck) {
      // Edit existing check
      setHealthChecks((prev) =>
        prev.map((check) =>
          check.id === currentCheck.id
            ? { ...currentCheck, ...newCheck }
            : check
        )
      );
      toast.info("Health check updated successfully");
    } else {
      // Add new check
      setHealthChecks((prev) => [
        ...prev,
        { ...newCheck, id: Date.now(), batchId, batchName },
      ]);
      toast.success("Health check added successfully");
    }
    setShowModal(false);
    setCurrentCheck(null);
  };
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // const handleDelete = (id: number) => {
  //   setHealthChecks((prev) => prev.filter((check) => check.id !== id));
  //   toast.error("Deleted successfully")
  // };
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
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
            <span className="font-medium">Initial Count:</span> {currentCount}
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
      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Health Check
        </button>

        {/* List Health Checks */}
        <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr className="bg-gray-200">
        <th className="border border-gray-500 px-4 py-2 bg-blue-200">Date</th>
        <th className="border border-gray-500 px-4 py-2">Symptom</th>
        <th className="border border-gray-500 px-4 py-2 bg-blue-200">Deaths</th>
        <th className="border border-gray-500 px-4 py-2">Treatment</th>
        <th className="border border-gray-500 px-4 py-2 bg-blue-200">Notes</th>
        <th className="border border-gray-500 px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {healthChecks.map((check) => (
        <tr key={check.id} className="border-b border-gray-200 dark:border-gray-700">
          <td className="border border-gray-500 px-4 py-2 bg-blue-200">
            {check.date}
          </td>
          <td className="border border-gray-500 px-4 py-2">{check.symptom}</td>
          <td className="border border-gray-500 px-4 py-2 bg-blue-200">
            {check.deaths}
          </td>
          <td className="border border-gray-500 px-4 py-2">{check.treatment}</td>
          <td className="border border-gray-500 px-4 py-2 bg-blue-200">
            {check.notes}
          </td>
          <td className="border border-gray-500 px-4 py-2">
            <button
              onClick={() => handleEdit(check)}
              className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
            >
              Edit
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  onClick={() => setDeleteId(check.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded-lg"
                >
                  Delete
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this health check? This
                    action cannot be undone.
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
          </td>
        </tr>
      ))}
      {/* Total Row */}
      <tr className="bg-gray-100">
        <td
          colSpan={2}
          className="border border-gray-500 px-4 py-2 font-bold text-right bg-blue-200"
        >
          Total Deaths
        </td>
        <td className="border border-gray-500 px-4 py-2 font-bold bg-blue-200">
          {healthChecks.reduce((sum, check) => sum + Number(check.deaths), 0)}
        </td>
        <td colSpan={3} className="border border-gray-500 px-4 py-2 bg-blue-200"></td>
      </tr>
    </tbody>
  </table>
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
