import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { ChartBarIcon, BeakerIcon, HeartIcon } from '@heroicons/react/outline';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Stats() {
  const [birdsCount, setBirdsCount] = useState<number>(0);
  const [feedConsumption, setFeedConsumption] = useState<number>(0);
  const [waterUsage, setWaterUsage] = useState<number>(0);
  const [healthStatus, setHealthStatus] = useState<number>(0);

  const targetValues = {
    birds: 1234,
    feed: 2400, // Represented as 2.4 tons in display
    water: 4500,
    health: 98,
  };

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const increment = 30; // Increment interval in ms

    const animateValue = (setter: React.Dispatch<React.SetStateAction<number>>, target: number) => {
      const steps = duration / increment;
      let current = 0;
      const step = target / steps;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(Math.ceil(current));
      }, increment);
    };

    animateValue(setBirdsCount, targetValues.birds);
    animateValue(setFeedConsumption, targetValues.feed);
    animateValue(setWaterUsage, targetValues.water);
    animateValue(setHealthStatus, targetValues.health);
  }, [targetValues.birds, targetValues.feed, targetValues.health, targetValues.water]);

  // Graph data and options
  const birdsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Birds Added',
        data: [300, 500, 700, birdsCount],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const feedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Feed Consumption (Tons)',
        data: [1.8, 2.1, 2.3, 2.4, feedConsumption / 1000],
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.3)',
        tension: 0.4,
      },
    ],
  };

  const waterData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Water Usage (Liters)',
        data: [4000, 4200, 4300, 4400, waterUsage],
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
      },
    ],
  };

  const healthData = {
    labels: ['Healthy', 'Unhealthy'],
    datasets: [
      {
        label: 'Health Status (%)',
        data: [healthStatus, 100 - healthStatus],
        backgroundColor: ['rgba(239, 68, 68, 0.5)', 'rgba(156, 163, 175, 0.5)'],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Birds */}
      <div className="bg-blue-100 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BeakerIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-blue-700 truncate">Total Birds</dt>
                <dd>
                  <div className="text-lg font-bold text-blue-900">{birdsCount}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-3">
            <Bar data={birdsData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Feed Consumption */}
      <div className="bg-green-100 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-green-700 truncate">Feed Consumption</dt>
                <dd>
                  <div className="text-lg font-bold text-green-900">{(feedConsumption / 1000).toFixed(1)} tons</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-3">
            <Line data={feedData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Water Usage */}
      <div className="bg-yellow-100 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-yellow-700 truncate">Water Usage</dt>
                <dd>
                  <div className="text-lg font-bold text-yellow-900">{waterUsage} L</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-3">
            <Bar data={waterData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Health Status */}
      <div className="bg-red-100 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <HeartIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-red-700 truncate">Health Status</dt>
                <dd>
                  <div className="text-lg font-bold text-red-900">{healthStatus}%</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-3">
            <Bar data={healthData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
