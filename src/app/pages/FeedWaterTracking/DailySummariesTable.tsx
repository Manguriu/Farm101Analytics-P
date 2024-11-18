// // src/components/DailySummariesTable.tsx

// import React from 'react';

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

// // Define the component's props interface
// interface DailySummariesTableProps {
//   dailySummaries: DailySummary[];
//   editDailySummary: (summary: DailySummary) => void;
//   deleteDailySummary: (id: number) => void;
// }

// const DailySummariesTable: React.FC<DailySummariesTableProps> = ({
//   dailySummaries,
//   editDailySummary,
//   deleteDailySummary,
// }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center sm:text-left">Daily Summaries</h2>
//       {dailySummaries.length === 0 ? (
//         <p className="text-gray-500 text-center sm:text-left">No daily summaries available. Please add some.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border">
//             <thead>
//               <tr>
//                 <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Day</th>
//                 <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Date</th>
//                 <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Avg Weight (kg)</th>
//                 <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Feed (kg)</th>
//                 <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Water (liters)</th>
//                 <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">No of Deaths</th>
//                 <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dailySummaries.map((summary) => (
//                 <tr key={summary.id}>
//                   <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.day}</td>
//                   <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.date}</td>
//                   <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.avgWeight.toFixed(2)}</td>
//                   <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalFeed.toFixed(2)}</td>
//                   <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalWater.toFixed(2)}</td>
//                   <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.deaths}</td>
//                   <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">
//                     <button
//                       onClick={() => editDailySummary(summary)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteDailySummary(summary.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailySummariesTable;
