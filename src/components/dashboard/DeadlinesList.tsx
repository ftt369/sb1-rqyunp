import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Deadline {
  id: string;
  title: string;
  dueDate: Date;
  caseId: string;
  caseTitle: string;
  priority: 'high' | 'medium' | 'low';
}

interface DeadlinesListProps {
  deadlines: Deadline[];
}

export function DeadlinesList({ deadlines }: DeadlinesListProps) {
  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600',
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-900 flex items-center">
          View calendar
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md"
          >
            <div className="flex items-start space-x-3">
              <Calendar className={`h-5 w-5 mt-0.5 ${priorityColors[deadline.priority]}`} />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {deadline.title}
                </p>
                <p className="text-sm text-gray-500">
                  {deadline.caseTitle}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(deadline.dueDate, { addSuffix: true })}
            </span>
          </div>
        ))}

        {deadlines.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No upcoming deadlines
          </p>
        )}
      </div>
    </div>
  );
}