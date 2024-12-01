import React from 'react';
import { useStore } from '../../lib/store';
import { Clock } from 'lucide-react';
import { formatDate } from '../../lib/utils/formatters';

export function WelcomeSection() {
  const { user } = useStore();
  const currentTime = new Date();
  const hour = currentTime.getHours();

  const getGreeting = () => {
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {getGreeting()}, {user?.email?.split('@')[0]}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to your legal practice dashboard. Here's an overview of your current workload.
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatDate(currentTime.toISOString())}</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-indigo-50 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="rounded-md bg-indigo-500 p-2">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-indigo-800">Today's Schedule</h2>
              <p className="mt-1 text-sm text-indigo-600">
                You have 3 meetings scheduled for today
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-green-50 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="rounded-md bg-green-500 p-2">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-green-800">Tasks Due Today</h2>
              <p className="mt-1 text-sm text-green-600">
                5 tasks require your attention
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}