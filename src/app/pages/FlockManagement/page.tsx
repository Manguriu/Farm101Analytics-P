"use client";

import { useState, useEffect } from "react";

// Define the type for a flock
interface Flock {
  id: number; // Unique identifier
  batchName: string;
  dateAcquired: string; // in YYYY-MM-DD format
  initialCount: number;
  breed?: string;
  metrics: DailyMetrics[];
}

interface DailyMetrics {
  date: string; // Date in YYYY-MM-DD format
  weight: number; // Average weight per bird on that day
  feedConsumption: number; // Total feed consumption on that day
  waterConsumption: number; // Total water consumption on that day
}


const FlockManagement = () => {
  const [flocks, setFlocks] = useState<Flock[]>([]);

  // Load flocks from localStorage on initial render
  useEffect(() => {
    const storedFlocks = localStorage.getItem("flocks");
    if (storedFlocks) {
      setFlocks(JSON.parse(storedFlocks));
    }
  }, []);

  // Save flocks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("flocks", JSON.stringify(flocks));
  }, [flocks]);

  const addFlock = (flock: Omit<Flock, "id" | "metrics">) => {
    const newFlock: Flock = {
      ...flock,
      id: Date.now(),
      metrics: [],
    };
    setFlocks([...flocks, newFlock]);
  };

  const deleteFlock = (id: number) => {
    if (window.confirm("Are you sure you want to delete this flock?")) {
      setFlocks(flocks.filter((flock) => flock.id !== id));
    }
  };

  const approveFlock = (id: number) => {
    const flock = flocks.find((f) => f.id === id);
    if (flock) {
      alert(`Flock "${flock.batchName}" approved!`);
      // Additional logic for approval can be added here
    }
  };

  const updateFlock = (updatedFlock: Flock) => {
    setFlocks(
      flocks.map((flock) => (flock.id === updatedFlock.id ? updatedFlock : flock))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Flock Management</h1>
      <AddFlockForm addFlock={addFlock} />
      {flocks.length > 0 ? (
        <FlockList
          flocks={flocks}
          onDelete={deleteFlock}
          onApprove={approveFlock}
          onUpdateFlock={updateFlock}
        />
      ) : (
        <div className="mt-8 text-gray-500">
          No flocks found. Add your first batch to start tracking!
        </div>
      )}
      <TotalFlockCount flocks={flocks} />
    </div>
  );
};

interface AddFlockFormProps {
  addFlock: (flock: Omit<Flock, "id" | "metrics">) => void;
}

const AddFlockForm = ({ addFlock }: AddFlockFormProps) => {
  const [form, setForm] = useState<Omit<Flock, "id" | "metrics">>({
    batchName: "",
    dateAcquired: "",
    initialCount: 0,
    breed: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (form.batchName.trim() === "") {
      alert("Batch name is required.");
      return;
    }

    if (form.initialCount <= 0) {
      alert("Initial count must be a positive number.");
      return;
    }

    if (new Date(form.dateAcquired) > new Date()) {
      alert("Date acquired cannot be in the future.");
      return;
    }

    addFlock(form);
    setForm({ batchName: "", dateAcquired: "", initialCount: 0, breed: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Batch Name</label>
        <input
          type="text"
          value={form.batchName}
          onChange={(e) => setForm({ ...form, batchName: e.target.value })}
          className="border rounded p-2 w-full"
          required
          placeholder="Enter batch name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Date Acquired</label>
        <input
          type="date"
          value={form.dateAcquired}
          onChange={(e) => setForm({ ...form, dateAcquired: e.target.value })}
          className="border rounded p-2 w-full"
          required
          max={new Date().toISOString().split("T")[0]} // Prevent future dates
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Initial Count</label>
        <input
          type="number"
          value={form.initialCount || ""}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setForm({
              ...form,
              initialCount: isNaN(value) ? 0 : value,
            });
          }}
          className="border rounded p-2 w-full"
          min="1"
          required
          placeholder="Enter number of chicks"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Breed (Optional)</label>
        <input
          type="text"
          value={form.breed}
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
          className="border rounded p-2 w-full"
          placeholder="Enter breed (optional)"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Flock
      </button>
    </form>
  );
};

interface FlockListProps {
  flocks: Flock[];
  onDelete: (id: number) => void;
  onApprove: (id: number) => void;
  onUpdateFlock: (updatedFlock: Flock) => void;
}

const FlockList = ({
  flocks,
  onDelete,
  onApprove,
  onUpdateFlock,
}: FlockListProps) => {
  const [editFlockId, setEditFlockId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Omit<Flock, "id" | "metrics">>({
    batchName: "",
    dateAcquired: "",
    initialCount: 0,
    breed: "",
  });

  const handleEdit = (flock: Flock) => {
    setEditFlockId(flock.id);
    setEditForm({
      batchName: flock.batchName,
      dateAcquired: flock.dateAcquired,
      initialCount: flock.initialCount,
      breed: flock.breed || "",
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editFlockId === null) return;

    // Validation
    if (editForm.batchName.trim() === "") {
      alert("Batch name is required.");
      return;
    }

    if (editForm.initialCount <= 0) {
      alert("Initial count must be a positive number.");
      return;
    }

    if (new Date(editForm.dateAcquired) > new Date()) {
      alert("Date acquired cannot be in the future.");
      return;
    }

    const updatedFlock: Flock = {
      ...editForm,
      id: editFlockId,
      metrics: flocks.find((f) => f.id === editFlockId)?.metrics || [],
    };

    onUpdateFlock(updatedFlock);
    setEditFlockId(null);
    setEditForm({
      batchName: "",
      dateAcquired: "",
      initialCount: 0,
      breed: "",
    });
  };

  const calculateAge = (dateAcquired: string): number => {
    const today = new Date();
    const acquiredDate = new Date(dateAcquired + "T00:00:00");
    const diffInTime = today.getTime() - acquiredDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    return diffInDays + 1;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Flock List</h2>
      <ul>
        {flocks.map((flock) => (
          <li key={flock.id} className="border p-4 rounded mb-2">
            {editFlockId === flock.id ? (
              // Edit Form
              <form onSubmit={handleEditSubmit} className="mb-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Batch Name</label>
                  <input
                    type="text"
                    value={editForm.batchName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, batchName: e.target.value })
                    }
                    className="border rounded p-2 w-full"
                    required
                    placeholder="Enter batch name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Date Acquired</label>
                  <input
                    type="date"
                    value={editForm.dateAcquired}
                    onChange={(e) =>
                      setEditForm({ ...editForm, dateAcquired: e.target.value })
                    }
                    className="border rounded p-2 w-full"
                    required
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Initial Count</label>
                  <input
                    type="number"
                    value={editForm.initialCount || ""}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setEditForm({
                        ...editForm,
                        initialCount: isNaN(value) ? 0 : value,
                      });
                    }}
                    className="border rounded p-2 w-full"
                    min="1"
                    required
                    placeholder="Enter number of chicks"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Breed (Optional)</label>
                  <input
                    type="text"
                    value={editForm.breed}
                    onChange={(e) =>
                      setEditForm({ ...editForm, breed: e.target.value })
                    }
                    className="border rounded p-2 w-full"
                    placeholder="Enter breed (optional)"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditFlockId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Display Flock Details
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <strong>Batch Name:</strong> {flock.batchName} <br />
                    <strong>Age:</strong> {calculateAge(flock.dateAcquired)} days <br />
                    <strong>Current Count:</strong> {flock.initialCount} <br />
                    <strong>Breed:</strong> {flock.breed || "N/A"}
                  </div>
                  <div className="space-x-2 mt-2">
                    <button
                      onClick={() => onApprove(flock.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onDelete(flock.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(flock)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                {/* Buttons for tracking options */}
                <div className="mt-4 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      alert(`Proceeding to Feed & Water Tracking for ${flock.batchName}`)
                    }
                  >
                    Feed & Water Tracking
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      alert(`Proceeding to Growth Monitoring for ${flock.batchName}`)
                    }
                  >
                    Growth Monitoring
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      alert(`Proceeding to Expense Tracking for ${flock.batchName}`)
                    }
                  >
                    Expense Tracking
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      alert(`Proceeding to Health Monitoring for ${flock.batchName}`)
                    }
                  >
                    Health Monitoring
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};



interface TotalFlockCountProps {
  flocks: Flock[];
}

const TotalFlockCount = ({ flocks }: TotalFlockCountProps) => {
  const total = flocks.reduce(
    (sum, flock) => sum + (flock.initialCount || 0),
    0
  ); // Handle null values

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold">Total Flock Count</h2>
      <p>{total} birds</p>
    </div>
  );
};

export default FlockManagement;
