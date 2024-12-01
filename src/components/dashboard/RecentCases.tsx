import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Case } from '../../lib/store/types';

interface RecentCasesProps {
  cases: Case[];
}

export function RecentCases({ cases }: RecentCasesProps) {
  const navigate = useNavigate();
  const recentCases = cases.slice(0, 5);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Recent Cases</h2>
        <button
          onClick={() => navigate('/cases')}
          className="text-sm text-indigo-600 hover:text-indigo-900 flex items-center"
        >
          View all
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <div className="space-y-4">
        {recentCases.map((case_) => (
          <div
            key={case_.id}
            onClick={() => navigate(`/cases/${case_.id}`)}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {case_.title}
              </p>
              <p className="text-sm text-gray-500">Case #{case_.id.slice(0, 8)}</p>
            </div>
            <Badge variant={case_.status === 'Active' ? 'success' : 'warning'}>
              {case_.status}
            </Badge>
          </div>
        ))}
        
        {recentCases.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No cases found
          </p>
        )}
      </div>
    </div>
  );
}