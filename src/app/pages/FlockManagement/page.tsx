"use client";

import { useState } from "react";

// Define the type for a flock
interface Flock {
  batchName: string;
  dateAcquired: string; // Keep as string to match the input value
  initialCount: number | null;
  breed?: string;
  age: number;
}

const FlockManagement = () => {
    const [flocks, setFlocks] = useState<Flock[]>([]);
  
    const addFlock = (flock: Omit<Flock, "age">) => {
      setFlocks([
        ...flocks,
        { ...flock, age: calculateAge(flock.dateAcquired) },
      ]);
    };
  
    const deleteFlock = (index: number) => {
      setFlocks(flocks.filter((_, i) => i !== index)); // Remove flock by index
    };
  
    const approveFlock = (index: number) => {
      alert(`Flock "${flocks[index].batchName}" approved!`);
      // Additional logic for approval can be added here
    };
  
    const calculateAge = (dateAcquired: string): number => {
      const today = new Date();
      const acquiredDate = new Date(dateAcquired);
      const diffInTime = today.getTime() - acquiredDate.getTime();
      const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
      return diffInDays + 1;
    };
  
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Flock Management</h1>
        <AddFlockForm addFlock={addFlock} />
        <FlockList flocks={flocks} onDelete={deleteFlock} onApprove={approveFlock} />
        <TotalFlockCount flocks={flocks} />
      </div>
    );
  };
  

interface AddFlockFormProps {
  addFlock: (flock: Omit<Flock, "age">) => void;
}

const AddFlockForm = ({ addFlock }: AddFlockFormProps) => {
  const [form, setForm] = useState<Omit<Flock, "age">>({
    batchName: "",
    dateAcquired: "",
    initialCount: 0,
    breed: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFlock(form);
    setForm({ batchName: "", dateAcquired: "", initialCount: 0, breed: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Batch Name</label>
        <input
          type="text"
          value={form.batchName}
          onChange={(e) => setForm({ ...form, batchName: e.target.value })}
          className="border rounded p-2 w-full"
          required
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
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Initial Count</label>
        <input
          type="number"
          value={form.initialCount !== null ? form.initialCount : ""}
          onFocus={() => {
            if (form.initialCount === 0) {
              setForm({ ...form, initialCount: null }); // Set to null to represent empty state
            }
          }}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setForm({
              ...form,
              initialCount: isNaN(value) ? 0 : value, // Default to 0 if empty
            });
          }}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Breed (Optional)</label>
        <input
          type="text"
          value={form.breed}
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
          className="border rounded p-2 w-full"
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
}

interface FlockListProps {
    flocks: Flock[];
    onDelete: (index: number) => void;
    onApprove: (index: number) => void;
  }
  
  const FlockList = ({ flocks, onDelete, onApprove }: FlockListProps) => (
    <div>
      <h2 className="text-xl font-bold mb-4">Flock List</h2>
      <ul>
        {flocks.map((flock, index) => (
          <li key={index} className="border p-4 rounded mb-2 flex justify-between items-center">
            <div>
              <strong>Batch Name:</strong> {flock.batchName} <br />
              <strong>Age:</strong> {flock.age} days <br />
              <strong>Current Count:</strong> {flock.initialCount || 0} <br />
              <strong>Breed:</strong> {flock.breed || "N/A"}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onApprove(index)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => onDelete(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  

interface TotalFlockCountProps {
  flocks: Flock[];
}

const TotalFlockCount = ({ flocks }: TotalFlockCountProps) => {
  const total = flocks.reduce((sum, flock) => sum + (flock.initialCount || 0), 0); // Handle null values

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold">Total Flock Count</h2>
      <p>{total} birds</p>
    </div>
  );
};

export default FlockManagement;
