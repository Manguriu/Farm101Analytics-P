
// import React, { useState, useEffect } from 'react';

// // Define the DailySummary interface
// interface DailySummary {
//   id: number;
//   day: number;
//   date: string; // in YYYY-MM-DD format
//   avgWeight: number; // in kg
//   totalFeed: number; // in kg
//   totalWater: number; // in liters
//   deaths: number;
// }

// // Define the form state interface with string types
// interface DailySummaryFormState {
//   day: string;
//   date: string;
//   avgWeight: string;
//   totalFeed: string;
//   totalWater: string;
//   deaths: string;
// }

// // Define the component's props interface
// interface DailySummaryFormProps {
//   isEditing: boolean;
//   currentSummary: DailySummary | null;
//   addDailySummary: (summary: Omit<DailySummary, 'id'>) => void;
//   updateDailySummary: (summary: DailySummary) => void;
//   cancelEdit: () => void;
// }

// const DailySummaryForm: React.FC<DailySummaryFormProps> = ({
//   isEditing,
//   currentSummary,
//   addDailySummary,
//   updateDailySummary,
//   cancelEdit,
// }) => {
//   // Initialize form state
//   const [form, setForm] = useState<DailySummaryFormState>({
//     day: '',
//     date: '',
//     avgWeight: '',
//     totalFeed: '',
//     totalWater: '',
//     deaths: '',
//   });

//   // Populate form fields when editing
//   useEffect(() => {
//     if (isEditing && currentSummary) {
//       setForm({
//         day: currentSummary.day.toString(),
//         date: currentSummary.date,
//         avgWeight: currentSummary.avgWeight.toString(),
//         totalFeed: currentSummary.totalFeed.toString(),
//         totalWater: currentSummary.totalWater.toString(),
//         deaths: currentSummary.deaths.toString(),
//       });
//     } else {
//       // Reset form when not editing
//       setForm({
//         day: '',
//         date: '',
//         avgWeight: '',
//         totalFeed: '',
//         totalWater: '',
//         deaths: '',
//       });
//     }
//   }, [isEditing, currentSummary]);

//   // Helper function to safely parse numbers
//   const parseNumber = (value: string, defaultValue: number = 0): number => {
//     const parsed = parseFloat(value);
//     return isNaN(parsed) ? defaultValue : parsed;
//   };

//   // Handle input focus to clear the field
//   const handleFocus = (field: keyof DailySummaryFormState) => {
//     setForm({ ...form, [field]: '' });
//   };

//   // Handle input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: keyof DailySummaryFormState
//   ) => {
//     const value = e.target.value;
//     setForm({ ...form, [field]: value });
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation: Check if all fields are filled
//     if (
//       form.day.trim() === '' ||
//       form.date.trim() === '' ||
//       form.avgWeight.trim() === '' ||
//       form.totalFeed.trim() === '' ||
//       form.totalWater.trim() === '' ||
//       form.deaths.trim() === ''
//     ) {
//       alert('Please fill all fields correctly.');
//       return;
//     }

//     // Parse form fields to numbers
//     const day = parseNumber(form.day);
//     const avgWeight = parseNumber(form.avgWeight);
//     const totalFeed = parseNumber(form.totalFeed);
//     const totalWater = parseNumber(form.totalWater);
//     const deaths = parseNumber(form.deaths);

//     // Further validation
//     if (day < 1) {
//       alert('Day must be at least 1.');
//       return;
//     }
//     if (avgWeight <= 0) {
//       alert('Average Weight must be greater than 0.');
//       return;
//     }
//     if (totalFeed < 0) {
//       alert('Total Feed cannot be negative.');
//       return;
//     }
//     if (totalWater < 0) {
//       alert('Total Water cannot be negative.');
//       return;
//     }
//     if (deaths < 0) {
//       alert('Number of Deaths cannot be negative.');
//       return;
//     }

//     if (isEditing && currentSummary) {
//       // Update existing summary
//       updateDailySummary({
//         id: currentSummary.id,
//         day,
//         date: form.date,
//         avgWeight,
//         totalFeed,
//         totalWater,
//         deaths,
//       });
//     } else {
//       // Add new summary
//       addDailySummary({
//         day,
//         date: form.date,
//         avgWeight,
//         totalFeed,
//         totalWater,
//         deaths,
//       });
//     }

//     // Reset form after submission
//     setForm({
//       day: '',
//       date: '',
//       avgWeight: '',
//       totalFeed: '',
//       totalWater: '',
//       deaths: '',
//     });
//   };

//   return (
//     <div className="mb-8">
//       <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center sm:text-left">
//         {isEditing ? 'Edit Daily Summary' : 'Add Daily Summary'}
//       </h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* Day Input */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Day</label>
//           <input
//             type="number"
//             value={form.day}
//             onFocus={() => handleFocus('day')}
//             onChange={(e) => handleChange(e, 'day')}
//             className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             min="1"
//             required
//             placeholder="Enter day number"
//           />
//         </div>

//         {/* Date Input */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Date</label>
//           <input
//             type="date"
//             value={form.date}
//             onFocus={() => handleFocus('date')}
//             onChange={(e) => handleChange(e, 'date')}
//             className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//             placeholder="Select date"
//           />
//         </div>

//         {/* Avg Weight Input */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Avg Weight (kg)</label>
//           <input
//             type="number"
//             value={form.avgWeight}
//             onFocus={() => handleFocus('avgWeight')}
//             onChange={(e) => handleChange(e, 'avgWeight')}
//             className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             step="0.01"
//             min="0.01"
//             required
//             placeholder="Enter average weight"
//           />
//         </div>

//         {/* Total Feed Input */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Total Feed (kg)</label>
//           <input
//             type="number"
//             value={form.totalFeed}
//             onFocus={() => handleFocus('totalFeed')}
//             onChange={(e) => handleChange(e, 'totalFeed')}
//             className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             step="0.01"
//             min="0"
//             required
//             placeholder="Enter total feed"
//           />
//         </div>

//         {/* Total Water Input */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Total Water (liters)</label>
//           <input
//             type="number"
//             value={form.totalWater}
//             onFocus={() => handleFocus('totalWater')}
//             onChange={(e) => handleChange(e, 'totalWater')}
//             className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             step="0.01"
//             min="0"
//             required
//             placeholder="Enter total water"
//           />
//         </div>

//         {/* No of Deaths Input */}
//         <div>
//           <label className="block text-sm font-medium mb-1">No of Deaths</label>
//           <input
//             type="number"
//             value={form.deaths}
//             onFocus={() => handleFocus('deaths')}
//             onChange={(e) => handleChange(e, 'deaths')}
//             className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             min="0"
//             required
//             placeholder="Enter number of deaths"
//           />
//         </div>

//         {/* Submit and Cancel Buttons */}
//         <div className="flex items-end">
//           <button
//             type="submit"
//             className={`bg-${isEditing ? 'yellow' : 'green'}-500 hover:bg-${isEditing ? 'yellow' : 'green'}-600 text-white px-4 py-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-${isEditing ? 'yellow' : 'green'}-500`}
//           >
//             {isEditing ? 'Update' : 'Add'}
//           </button>
//           {isEditing && (
//             <button
//               type="button"
//               onClick={cancelEdit}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DailySummaryForm;
