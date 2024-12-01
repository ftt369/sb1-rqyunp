import React from 'react';
import { Case } from '../../lib/store/types';

interface CaseStatsProps {
  cases: Case[];
}

export function CaseStats({ cases }: CaseStatsProps) {
  const stats = React.useMemo(() => {
    const total = cases.length;
    const active = cases.filter((c) => c.status === 'Active').length;
    const closed = total - active;
    const activePercentage = total > 0 ? (active / total) * 100 : 0;

    return {
      total,
      active,
      closed,
      activePercentage: activePercentage.toFixed(1),
    };
  }, [cases]);

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow px-5 py-6">
        <div className="text-sm font-medium text-gray-500">Total Cases</div>
        <div className="mt-2 flex items-baseline">
          <div className="text-2xl font-semibold text-gray-900">
            {stats.total}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow px-5 py-6">
        <div className="text-sm font-medium text-gray-500">Active Cases</div>
        <div className="mt-2 flex items-baseline">
          <div className="text-2xl font-semibold text-green-600">
            {stats.active}
          </div>
          <div className="ml-2 text-sm text-gray-500">
            ({stats.activePercentage}%)
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow px-5 py-6">
        <div className="text-sm font-medium text-gray-500">Closed Cases</div>
        <div className="mt-2 flex items-baseline">
          <div className="text-2xl font-semibold text-gray-600">
            {stats.closed}
          </div>
        </div>
      </div>
    </div>
  );
}