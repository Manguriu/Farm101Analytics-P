/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';

// Define interfaces for daily and weekly summaries
interface DailySummary {
  id: number;
  day: number;
  date: string; // in YYYY-MM-DD format
  avgWeight: number; // in kg
  totalFeed: number; // in kg
  totalWater: number; // in liters
  deaths: number;
}

interface WeeklySummary {
  weekNumber: number;
  startDate: string;
  endDate: string;
  averageWeight: number; // in kg
  totalFeed: number; // in kg
  totalWater: number; // in liters
  totalDeaths: number;
}

// Define a separate interface for form state where numeric fields are strings
interface DailySummaryFormState {
  day: string;
  date: string;
  avgWeight: string;
  totalFeed: string;
  totalWater: string;
  deaths: string;
}

// Main Component
export default function FeedAndWaterManagement() {
  const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]);
  const [weeklySummaries, setWeeklySummaries] = useState<WeeklySummary[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentSummary, setCurrentSummary] = useState<DailySummary | null>(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedDaily = localStorage.getItem('dailySummaries');
    if (storedDaily) {
      setDailySummaries(JSON.parse(storedDaily));
    }
  }, []);

  // Save daily summaries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dailySummaries', JSON.stringify(dailySummaries));
    calculateWeeklySummaries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailySummaries]);

  // Function to calculate weekly summaries based on daily data
  const calculateWeeklySummaries = () => {
    if (dailySummaries.length === 0) {
      setWeeklySummaries([]);
      return;
    }

    // Sort daily summaries by date
    const sortedDaily = [...dailySummaries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const weeks: { [key: number]: DailySummary[] } = {};
    const startDate = new Date(sortedDaily[0].date);

    sortedDaily.forEach((summary) => {
      const currentDate = new Date(summary.date);
      const diffInTime = currentDate.getTime() - startDate.getTime();
      const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
      const weekNumber = Math.floor(diffInDays / 7) + 1;

      if (!weeks[weekNumber]) {
        weeks[weekNumber] = [];
      }
      weeks[weekNumber].push(summary);
    });

    const summaries: WeeklySummary[] = Object.keys(weeks).map((weekNumStr) => {
      const weekNum = parseInt(weekNumStr);
      const weekData = weeks[weekNum];

      const totalWeight = weekData.reduce((sum, day) => sum + day.avgWeight, 0);
      const totalFeed = weekData.reduce((sum, day) => sum + day.totalFeed, 0);
      const totalWater = weekData.reduce((sum, day) => sum + day.totalWater, 0);
      const totalDeaths = weekData.reduce((sum, day) => sum + day.deaths, 0);
      const averageWeight = totalWeight / weekData.length;

      const weekStartDate = new Date(startDate);
      weekStartDate.setDate(weekStartDate.getDate() + (weekNum - 1) * 7);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6);

      return {
        weekNumber: weekNum,
        startDate: weekStartDate.toISOString().split('T')[0],
        endDate: weekEndDate.toISOString().split('T')[0],
        averageWeight: parseFloat(averageWeight.toFixed(2)),
        totalFeed: parseFloat(totalFeed.toFixed(2)),
        totalWater: parseFloat(totalWater.toFixed(2)),
        totalDeaths: totalDeaths,
      };
    });

    setWeeklySummaries(summaries);
  };

  // Add new daily summary
  const addDailySummary = (summary: Omit<DailySummary, 'id'>) => {
    const newSummary: DailySummary = {
      id: Date.now(),
      ...summary,
    };
    setDailySummaries([...dailySummaries, newSummary]);
  };

  // Update existing daily summary
  const updateDailySummary = (updatedSummary: DailySummary) => {
    const updatedSummaries = dailySummaries.map((summary) =>
      summary.id === updatedSummary.id ? updatedSummary : summary
    );
    setDailySummaries(updatedSummaries);
    setIsEditing(false);
    setCurrentSummary(null);
  };

  // Delete daily summary
  const deleteDailySummary = (id: number) => {
    if (window.confirm('Are you sure you want to delete this summary?')) {
      const updatedSummaries = dailySummaries.filter((summary) => summary.id !== id);
      setDailySummaries(updatedSummaries);
    }
  };

  // Initiate edit
  const editDailySummary = (summary: DailySummary) => {
    setIsEditing(true);
    setCurrentSummary(summary);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Form to Add or Edit Daily Summary */}
      <DailySummaryForm
        isEditing={isEditing}
        currentSummary={currentSummary}
        addDailySummary={addDailySummary}
        updateDailySummary={updateDailySummary}
        cancelEdit={() => {
          setIsEditing(false);
          setCurrentSummary(null);
        }}
      />

      {/* Daily Summaries Table */}
      <DailySummariesTable
        dailySummaries={dailySummaries}
        editDailySummary={editDailySummary}
        deleteDailySummary={deleteDailySummary}
      />

      {/* Weekly Summaries Table */}
      <WeeklySummariesTable weeklySummaries={weeklySummaries} />
    </div>
  );
}

// Component for Adding or Editing Daily Summary
interface DailySummaryFormProps {
  isEditing: boolean;
  currentSummary: DailySummary | null;
  addDailySummary: (summary: Omit<DailySummary, 'id'>) => void;
  updateDailySummary: (summary: DailySummary) => void;
  cancelEdit: () => void;
}

const DailySummaryForm: React.FC<DailySummaryFormProps> = ({
  isEditing,
  currentSummary,
  addDailySummary,
  updateDailySummary,
  cancelEdit,
}) => {
  const [form, setForm] = useState<DailySummaryFormState>({
    day: '',
    date: '',
    avgWeight: '',
    totalFeed: '',
    totalWater: '',
    deaths: '',
  });

  useEffect(() => {
    if (isEditing && currentSummary) {
      setForm({
        day: currentSummary.day.toString(),
        date: currentSummary.date,
        avgWeight: currentSummary.avgWeight.toString(),
        totalFeed: currentSummary.totalFeed.toString(),
        totalWater: currentSummary.totalWater.toString(),
        deaths: currentSummary.deaths.toString(),
      });
    } else {
      setForm({
        day: '',
        date: '',
        avgWeight: '',
        totalFeed: '',
        totalWater: '',
        deaths: '',
      });
    }
  }, [isEditing, currentSummary]);

  // Helper function to safely parse number inputs
  const parseNumber = (value: string, defaultValue: number = 0): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  };

  // Handle input focus to clear the field
  const handleFocus = (field: keyof DailySummaryFormState) => {
    setForm({ ...form, [field]: '' });
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DailySummaryFormState
  ) => {
    const value = e.target.value;
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation: Check if all fields are filled
    if (
      form.day.trim() === '' ||
      form.date.trim() === '' ||
      form.avgWeight.trim() === '' ||
      form.totalFeed.trim() === '' ||
      form.totalWater.trim() === '' ||
      form.deaths.trim() === ''
    ) {
      alert('Please fill all fields correctly.');
      return;
    }

    // Parse form fields to numbers
    const day = parseNumber(form.day);
    const avgWeight = parseNumber(form.avgWeight);
    const totalFeed = parseNumber(form.totalFeed);
    const totalWater = parseNumber(form.totalWater);
    const deaths = parseNumber(form.deaths);

    // Further validation
    if (day < 1) {
      alert('Day must be at least 1.');
      return;
    }
    if (avgWeight <= 0) {
      alert('Average Weight must be greater than 0.');
      return;
    }
    if (totalFeed < 0) {
      alert('Total Feed cannot be negative.');
      return;
    }
    if (totalWater < 0) {
      alert('Total Water cannot be negative.');
      return;
    }
    if (deaths < 0) {
      alert('Number of Deaths cannot be negative.');
      return;
    }

    if (isEditing && currentSummary) {
      updateDailySummary({
        id: currentSummary.id,
        day,
        date: form.date,
        avgWeight,
        totalFeed,
        totalWater,
        deaths,
      });
    } else {
      addDailySummary({
        day,
        date: form.date,
        avgWeight,
        totalFeed,
        totalWater,
        deaths,
      });
    }

    // Reset form
    setForm({
      day: '',
      date: '',
      avgWeight: '',
      totalFeed: '',
      totalWater: '',
      deaths: '',
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl lg:text-xl font-semibold mb-4 text-center sm:text-left">
        {isEditing ? 'Edit Daily Summary' : 'Add Daily Summary'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Day Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Day</label>
          <input
            type="number"
            value={form.day}
            onFocus={() => handleFocus('day')}
            onChange={(e) => handleChange(e, 'day')}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
            placeholder="Enter day number"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onFocus={() => handleFocus('date')}
            onChange={(e) => handleChange(e, 'date')}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Select date"
          />
        </div>

        {/* Avg Weight Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Avg Weight (kg)</label>
          <input
            type="number"
            value={form.avgWeight}
            onFocus={() => handleFocus('avgWeight')}
            onChange={(e) => handleChange(e, 'avgWeight')}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
            min="0.01"
            required
            placeholder="Enter average weight"
          />
        </div>

        {/* Total Feed Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Total Feed (kg)</label>
          <input
            type="number"
            value={form.totalFeed}
            onFocus={() => handleFocus('totalFeed')}
            onChange={(e) => handleChange(e, 'totalFeed')}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
            min="0"
            required
            placeholder="Enter total feed"
          />
        </div>

        {/* Total Water Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Total Water (liters)</label>
          <input
            type="number"
            value={form.totalWater}
            onFocus={() => handleFocus('totalWater')}
            onChange={(e) => handleChange(e, 'totalWater')}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
            min="0"
            required
            placeholder="Enter total water"
          />
        </div>

        {/* No of Deaths Input */}
        <div>
          <label className="block text-sm font-medium mb-1">No of Deaths</label>
          <input
            type="number"
            value={form.deaths}
            onFocus={() => handleFocus('deaths')}
            onChange={(e) => handleChange(e, 'deaths')}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            required
            placeholder="Enter number of deaths"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex items-end">
          <button
            type="submit"
            className={`bg-${isEditing ? 'yellow' : 'green'}-500 hover:bg-${isEditing ? 'yellow' : 'green'}-600 text-white px-4 py-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-${isEditing ? 'yellow' : 'green'}-500`}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Component to Display Daily Summaries Table
interface DailySummariesTableProps {
  dailySummaries: DailySummary[];
  editDailySummary: (summary: DailySummary) => void;
  deleteDailySummary: (id: number) => void;
}

const DailySummariesTable: React.FC<DailySummariesTableProps> = ({
  dailySummaries,
  editDailySummary,
  deleteDailySummary,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center sm:text-left">Daily Summaries</h2>
      {dailySummaries.length === 0 ? (
        <p className="text-gray-500 text-center sm:text-left">No daily summaries available. Please add some.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Day</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Date</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Avg Weight (kg)</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Feed (kg)</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Water (liters)</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">No of Deaths</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dailySummaries.map((summary) => (
                <tr key={summary.id}>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.day}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.date}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.avgWeight.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalFeed.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalWater.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.deaths}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">
                    <button
                      onClick={() => editDailySummary(summary)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDailySummary(summary.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Component to Display Weekly Summaries Table
interface WeeklySummariesTableProps {
  weeklySummaries: WeeklySummary[];
}

const WeeklySummariesTable: React.FC<WeeklySummariesTableProps> = ({
  weeklySummaries,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center sm:text-left">Weekly Summaries</h2>
      {weeklySummaries.length === 0 ? (
        <p className="text-gray-500 text-center sm:text-left">No weekly summaries available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Week Number</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Start Date</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">End Date</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Avg Weight (kg)</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Feed (kg)</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Water (liters)</th>
                <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Deaths</th>
              </tr>
            </thead>
            <tbody>
              {weeklySummaries.map((summary) => (
                <tr key={summary.weekNumber}>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.weekNumber}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.startDate}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.endDate}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.averageWeight.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalFeed.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalWater.toFixed(2)}</td>
                  <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalDeaths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};





