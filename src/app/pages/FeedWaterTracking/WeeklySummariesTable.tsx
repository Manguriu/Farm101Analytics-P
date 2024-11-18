// /* eslint-disable react/display-name */

// import React, { forwardRef } from 'react';

// // Define the WeeklySummary interface
// interface WeeklySummary {
//   weekNumber: number;
//   startDate: string;
//   endDate: string;
//   averageWeight: number; // in kg
//   totalFeed: number; // in kg
//   totalWater: number; // in liters
//   totalDeaths: number;
// }

// // Define the component's props interface
// interface WeeklySummariesTableProps {
//   weeklySummaries: WeeklySummary[];
// }

// // Use forwardRef to allow parent components to reference this component
// const WeeklySummariesTable = forwardRef<HTMLDivElement, WeeklySummariesTableProps>(
//   ({ weeklySummaries }, ref) => {
//     return (
//       <div ref={ref} id="weekly-summaries" className="mb-8">
//         <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-center sm:text-left">Weekly Summaries</h2>
//         {weeklySummaries.length === 0 ? (
//           <p className="text-gray-500 text-center sm:text-left">No weekly summaries available.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border">
//               <thead>
//                 <tr>
//                   <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Week Number</th>
//                   <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Start Date</th>
//                   <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">End Date</th>
//                   <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Avg Weight (kg)</th>
//                   <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Feed (kg)</th>
//                   <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Water (liters)</th>
//                   <th className="border px-2 sm:px-4 py-2 text-sm sm:text-base">Total Deaths</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {weeklySummaries.map((summary) => (
//                   <tr key={summary.weekNumber}>
//                     <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.weekNumber}</td>
//                     <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.startDate}</td>
//                     <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.endDate}</td>
//                     <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.averageWeight.toFixed(2)}</td>
//                     <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalFeed.toFixed(2)}</td>
//                     <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalWater.toFixed(2)}</td>
//                     <td className="border px-2 sm:px-4 py-2 text-center sm:text-left">{summary.totalDeaths}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// export default WeeklySummariesTable;
