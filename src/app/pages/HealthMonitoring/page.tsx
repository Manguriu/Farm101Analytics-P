// // import React from 'react'


// // export default function page() {
// //   return (
// //     <div>page</div>
// //   )

// 'use client';

// import { SetStateAction, useState } from 'react';
// import { format } from 'date-fns';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/outline';

// export default function HealthMonitoring() {
//   const [healthChecks, setHealthChecks] = useState([
//     {
//       id: '1',
//       batchName: 'Batch A',
//       date: format(new Date(), 'yyyy-MM-dd'),
//       symptom: 'Lethargy',
//       treatment: 'Vitamin Supplement',
//       notes: 'Observed in 5% of the flock.',
//     },
//   ]);

//   const [showDialog, setShowDialog] = useState(false);
//   const [formData, setFormData] = useState({
//     id: '',
//     batchName: '',
//     date: format(new Date(), 'yyyy-MM-dd'),
//     symptom: '',
//     treatment: '',
//     notes: '',
//   });

//   const handleAdd = () => {
//     setFormData({
//       id: '',
//       batchName: '',
//       date: format(new Date(), 'yyyy-MM-dd'),
//       symptom: '',
//       treatment: '',
//       notes: '',
//     });
//     setShowDialog(true);
//   };

//   const handleEdit = (data: SetStateAction<{ id: string; batchName: string; date: string; symptom: string; treatment: string; notes: string; }>) => {
//     setFormData(data);
//     setShowDialog(true);
//   };

//   const handleDelete = (id: string) => {
//     if (confirm('Are you sure you want to delete this record?')) {
//       setHealthChecks((prev) => prev.filter((check) => check.id !== id));
//       toast.success('Health check deleted successfully!');
//     }
//   };

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     if (formData.id) {
//       setHealthChecks((prev) =>
//         prev.map((record) => (record.id === formData.id ? formData : record))
//       );
//       toast.success('Health check updated successfully!');
//     } else {
//       setHealthChecks((prev) => [
//         { ...formData, id: Math.random().toString(36).substring(2, 9) },
//         ...prev,
//       ]);
//       toast.success('Health check added successfully!');
//     }

//     setShowDialog(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-5xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold flex items-center gap-2">
//             <PencilIcon className="h-6 w-6 text-blue-600" />
//             Health Monitoring
//           </h1>
//           <button
//             onClick={handleAdd}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <PlusIcon className="h-5 w-5" />
//             Add Health Check
//           </button>
//         </div>

//         {/* Health Checks List */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-lg font-semibold mb-4">Health Checks</h2>
//           <AnimatePresence>
//             {healthChecks.map((check) => (
//               <motion.div
//                 key={check.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="border-b py-4 last:border-none"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-medium text-gray-800">{check.batchName}</h3>
//                     <p className="text-sm text-gray-500">{format(new Date(check.date), 'MMMM d, yyyy')}</p>
//                     <p className="text-sm mt-1">
//                       <span className="font-semibold">Symptom:</span> {check.symptom}
//                     </p>
//                     <p className="text-sm">
//                       <span className="font-semibold">Treatment:</span> {check.treatment}
//                     </p>
//                     {check.notes && (
//                       <p className="text-sm mt-1">
//                         <span className="font-semibold">Notes:</span> {check.notes}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEdit(check)}
//                       className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
//                     >
//                       <PencilIcon className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(check.id)}
//                       className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
//                     >
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Add/Edit Dialog */}
//       {showDialog && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">
//               {formData.id ? 'Edit Health Check' : 'Add Health Check'}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Batch Name</label>
//                 <input
//                   value={formData.batchName}
//                   onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Date</label>
//                 <input
//                   type="date"
//                   value={formData.date}
//                   onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Symptom</label>
//                 <input
//                   value={formData.symptom}
//                   onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Treatment</label>
//                 <input
//                   value={formData.treatment}
//                   onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Notes</label>
//                 <textarea
//                   value={formData.notes}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   className="w-full border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowDialog(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, TrashIcon, PlusIcon, ClipboardCheckIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the type for health check records
interface HealthCheck {
  id: string;
  batchName: string;
  date: string;
  symptom: string;
  treatment: string;
  notes: string;
}

export default function HealthMonitoring() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([
    {
      id: '1',
      batchName: 'Batch A',
      date: format(new Date(), 'yyyy-MM-dd'),
      symptom: 'Lethargy',
      treatment: 'Vitamin Supplement',
      notes: 'Observed in 5% of the flock.',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<HealthCheck>({
    id: '',
    batchName: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    symptom: '',
    treatment: '',
    notes: '',
  });

  const openDialog = (data: HealthCheck | null = null) => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        id: '',
        batchName: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        symptom: '',
        treatment: '',
        notes: '',
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setHealthChecks((prev) => prev.filter((check) => check.id !== id));
      toast.success('Health check deleted successfully!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id) {
      // Update existing record
      setHealthChecks((prev) =>
        prev.map((record) => (record.id === formData.id ? formData : record))
      );
      toast.success('Health check updated successfully!');
    } else {
      // Add new record
      setHealthChecks((prev) => [
        { ...formData, id: Math.random().toString(36).substring(2, 9) },
        ...prev,
      ]);
      toast.success('Health check added successfully!');
    }

    closeDialog();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardCheckIcon className="h-6 w-6 text-blue-600" />
            Health Monitoring
          </h1>
          <button
            onClick={() => openDialog()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5" />
            Add Health Check
          </button>
        </div>

        {/* Health Checks List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Health Checks</h2>
          <AnimatePresence>
            {healthChecks.map((check) => (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b py-4 last:border-none"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">{check.batchName}</h3>
                    <p className="text-sm text-gray-500">{format(new Date(check.date), 'MMMM d, yyyy')}</p>
                    <p className="text-sm mt-1">
                      <span className="font-semibold">Symptom:</span> {check.symptom}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Treatment:</span> {check.treatment}
                    </p>
                    {check.notes && (
                      <p className="text-sm mt-1">
                        <span className="font-semibold">Notes:</span> {check.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openDialog(check)}
                      className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(check.id)}
                      className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {healthChecks.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-4">No health checks available.</p>
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {formData.id ? 'Edit Health Check' : 'Add Health Check'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Batch Name</label>
                  <input
                    value={formData.batchName}
                    onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Symptom</label>
                  <input
                    value={formData.symptom}
                    onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Treatment</label>
                  <input
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
