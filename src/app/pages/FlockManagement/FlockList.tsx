// "use client";

// import React from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { BsMenuButtonWideFill } from "react-icons/bs";
// import { CiUser } from "react-icons/ci";
// import { SlCalender } from "react-icons/sl";
// import { PiClockCountdownFill } from "react-icons/pi";
// import { MdDriveFileRenameOutline } from "react-icons/md";
// import { FaDatabase } from "react-icons/fa";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsAlphabet } from "react-icons/bs";

// interface DailyMetrics {
//   date: string;
//   weight: number;
//   feedConsumption: number;
//   waterConsumption: number;
// }

// interface Flock {
//   id: string;
//   batch_id: string;
//   batch_name: string;
//   date_acquired: string;
//   initial_count: number;
//   breed?: string;
//   metrics: DailyMetrics[];
// }

// interface FlockListProps {
//   flocks: Flock[];
//   onDelete: (id: string) => void;
//   onEdit: (flock: Flock) => void;
//   calculateFlockAge: (date: string) => number;
// }

// export default function FlockList({ flocks, onDelete, onEdit, calculateFlockAge }: FlockListProps) {
//   return (
//     <AnimatePresence>
//      {flocks.map((flock) => (
//        <motion.div
//          key={flock.id}
//          initial={{ opacity: 0, x: -20 }}
//          animate={{ opacity: 1, x: 0 }}
//          exit={{ opacity: 0, x: 20 }}
//          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-4 shadow-md hover:shadow-lg"
//        >
//          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//            <div className="flex-1">
//              <div className="flex items-center gap-4 mb-4">
//                <div className="bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold">
//                 {flock.batch_name[0]}
//                </div>
//                <h3 className="text-xl font-bold text-gray-800">
//                  <span className="text-blue-600">{flock.batch_name}</span>
//                </h3>
//              </div>
//              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                <p className="text-gray-700 flex items-center gap-2">
//                  <BsMenuButtonWideFill className="h-5 w-5 text-blue-600" />
//                  <span>
//                    <span className="font-semibold">Batch ID:</span> {flock.batch_id}
//                  </span>
//                </p>
//                <p className="text-gray-700 flex items-center gap-2">
//                  <SlCalender className="h-5 w-5 text-blue-600" />
//                  <span>
//                    <span className="font-semibold">Acquired:</span>{" "}
//                    {new Date(flock.date_acquired).toLocaleDateString()}
//                  </span>
//                </p>
//                <p className="text-gray-700 flex items-center gap-2">
//                  <PiClockCountdownFill className="h-5 w-5 text-blue-600" />
//                  <span>
//                    <span className="font-semibold">Current Age:</span>{" "}
//                    {calculateFlockAge(flock.date_acquired)} days
//                  </span>
//                </p>
//                <p className="text-gray-700 flex items-center gap-2">
//                  <BsAlphabet className="h-5 w-5 text-yellow-600" />
//                  <span>
//                    <span className="font-semibold">Breed:</span>{" "}
//                    {flock.breed || <span className="italic text-gray-500">Not specified</span>}
//                  </span>
//                </p>
//                <p className="text-gray-700 flex items-center gap-2">
//                  <FaDatabase className="h-5 w-5 text-red-600" />
//                  <span>
//                    <span className="font-semibold">Current Count:</span> {flock.initial_count}
//                  </span>
//                </p>
//              </div>
//            </div>
//            <div className="flex gap-4">
//             <button
//                onClick={() => onEdit(flock)}
//                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//              >
//                <AiOutlineEdit className="h-5 w-5" />
//                Edit
//              </button>
//              <button
//                onClick={() => onDelete(flock.id)}
//                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//              >
//                <FaRegTrashAlt className="h-5 w-5" />
//                Delete
//              </button>
//            </div>
//          </div>
//        </motion.div>
//      ))}
//      {flocks.length === 0 && (
//        <div className="text-center py-8 text-gray-500">
//          <SlCalender className="h-12 w-12 mx-auto mb-4 text-gray-400" />
//          <p>No flocks available. Add a new flock to start tracking!</p>
//        </div>
//      )}
//    </AnimatePresence>
//   );
// }

"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { PiClockCountdownFill } from "react-icons/pi";
import { BsAlphabet } from "react-icons/bs";
import { FaDatabase } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";

interface DailyMetrics {
  date: string;
  weight: number;
  feedConsumption: number;
  waterConsumption: number;
}

interface Flock {
  id: string;
  batch_id: string;
  batch_name: string;
  date_acquired: string;
  initial_count: number;
  breed?: string;
  metrics: DailyMetrics[];
}

interface FlockListProps {
  flocks: Flock[];
  onDelete: (id: string) => void;
  onEdit: (flock: Flock) => void;
  calculateFlockAge: (date: string) => number;
}

export default function FlockList({ flocks, onDelete, onEdit, calculateFlockAge }: FlockListProps) {
  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {flocks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-center py-12 bg-white rounded-2xl shadow-md"
          role="alert"
          aria-live="polite"
        >
          <SlCalender className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg text-gray-500 font-medium">
            No flocks available. Add a new flock to start tracking!
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {flocks.map((flock, index) => (
            <motion.div
              key={flock.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              role="region"
              aria-labelledby={`flock-${flock.id}-title`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className="bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {flock.batch_name[0].toUpperCase()}
                    </motion.div>
                    <h3
                      id={`flock-${flock.id}-title`}
                      className="text-xl font-bold text-gray-800"
                    >
                      <span className="text-blue-600">{flock.batch_name}</span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p className="text-gray-600 flex items-center gap-2">
                      <BsMenuButtonWideFill className="h-5 w-5 text-blue-500" />
                      <span>
                        <span className="font-semibold">Batch ID:</span> {flock.batch_id}
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <SlCalender className="h-5 w-5 text-blue-500" />
                      <span>
                        <span className="font-semibold">Acquired:</span>{" "}
                        {new Date(flock.date_acquired).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <PiClockCountdownFill className="h-5 w-5 text-blue-500" />
                      <span>
                        <span className="font-semibold">Current Age:</span>{" "}
                        {calculateFlockAge(flock.date_acquired)} days
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <BsAlphabet className="h-5 w-5 text-yellow-500" />
                      <span>
                        <span className="font-semibold">Breed:</span>{" "}
                        {flock.breed || (
                          <span className="italic text-gray-400">Not specified</span>
                        )}
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FaDatabase className="h-5 w-5 text-red-500" />
                      <span>
                        <span className="font-semibold">Current Count:</span>{" "}
                        {flock.initial_count}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => onEdit(flock)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Edit ${flock.batch_name}`}
                  >
                    <AiOutlineEdit className="h-5 w-5" />
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => onDelete(flock.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Delete ${flock.batch_name}`}
                  >
                    <FaRegTrashAlt className="h-5 w-5" />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}