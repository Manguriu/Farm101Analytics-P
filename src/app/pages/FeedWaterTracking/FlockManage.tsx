'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChartBarIcon, ExclamationCircleIcon } from '@heroicons/react/outline';

interface Flock {
  id: string;
  batchName: string;
  startDate: Date;
  currentCount: number;
  breed: string;
  feedLevel: number;
  waterLevel: number;
  dailyFeedIntake: number;
  dailyWaterIntake: number;
  lastUpdated: Date;
}

export default function Component() {
  const router = useRouter();

  const [flocks, setFlocks] = useState<Flock[]>([
    {
      id: '1',
      batchName: 'Spring Batch 2024',
      startDate: new Date(2024, 0, 1),
      currentCount: 16,
      breed: 'Broiler Ross 308',
      feedLevel: 75,
      waterLevel: 82,
      dailyFeedIntake: 120,
      dailyWaterIntake: 240,
      lastUpdated: new Date(),
    },
  ]);

  const handleDelete = (id: string) => {
    if (
      confirm(
        'Are you sure you want to delete this flock? This action cannot be undone.'
      )
    ) {
      setFlocks((prev) => prev.filter((flock) => flock.id !== id));
      toast.success('Flock deleted successfully');
    }
  };

  const handleFlockFeedAndWater = () => {
    router.push('/pages/FeedSubPage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-orange-50 p-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
            Feed & Watering Monitoring
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage resources for all your flocks
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Feed Stock */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Total Feed Stock
              </h3>
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2,450 kg</div>
            <p className="text-xs text-gray-500">+180 kg from last week</p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="absolute h-full bg-orange-500 rounded-full"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          {/* Water Storage */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Water Storage
              </h3>
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">5,200 L</div>
            <p className="text-xs text-gray-500">82% capacity</p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="absolute h-full bg-blue-500 rounded-full"
                style={{ width: '82%' }}
              />
            </div>
          </div>

          {/* Daily Consumption */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Daily Consumption
              </h3>
              <ChartBarIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">320 kg</div>
            <p className="text-xs text-gray-500">↑ 8% increase</p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="absolute h-full bg-emerald-500 rounded-full"
                style={{ width: '75%' }}
              />
            </div>
          </div>

          {/* Efficiency Score */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Efficiency Score
              </h3>
              <ExclamationCircleIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <p className="text-xs text-gray-500">Above target</p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="absolute h-full bg-purple-500 rounded-full"
                style={{ width: '94%' }}
              />
            </div>
          </div>
        </div>

        {/* Flock Cards */}
        <div className="flex gap-6 flex-wrap">
          <AnimatePresence>
            {flocks.map((flock) => (
              <motion.div
                key={flock.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-lg overflow-hidden min-w-[300px] flex-shrink-0"
              >
                <div className="bg-blue-50 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {flock.batchName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Age: {differenceInDays(new Date(), flock.startDate)} days
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                      {flock.currentCount} Birds
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    Feed Level: {flock.feedLevel}%, Daily Feed:{' '}
                    {flock.dailyFeedIntake}g/bird
                  </p>
                  <p className="text-sm text-gray-600">
                    Water Level: {flock.waterLevel}%, Daily Water:{' '}
                    {flock.dailyWaterIntake}ml/bird
                  </p>
                </div>
                <div className="flex justify-between p-4 bg-gray-50">
                  <button
                    onClick={handleFlockFeedAndWater}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => handleDelete(flock.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
