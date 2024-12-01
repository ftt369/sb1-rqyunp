import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, FileText, UserPlus, Scale } from 'lucide-react';

interface Activity {
  id: string;
  type: 'note' | 'document' | 'client' | 'case';
  title: string;
  timestamp: Date;
  user: {
    name: string;
    avatar: string;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'note':
        return MessageSquare;
      case 'document':
        return FileText;
      case 'client':
        return UserPlus;
      case 'case':
        return Scale;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
      
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            
            return (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                        <Icon className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {activity.user.name}
                        </div>
                        <p className="mt-0.5 text-gray-500">
                          {activity.title}
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}