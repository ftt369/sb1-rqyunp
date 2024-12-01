import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Case } from '../../lib/store/types';

interface CaseChartProps {
  cases: Case[];
}

export function CaseChart({ cases }: CaseChartProps) {
  const data = React.useMemo(() => {
    const casesByMonth: Record<string, number> = {};
    
    cases.forEach(case_ => {
      const date = new Date(case_.created_at);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      casesByMonth[monthYear] = (casesByMonth[monthYear] || 0) + 1;
    });

    return Object.entries(casesByMonth).map(([month, count]) => ({
      month,
      cases: count,
    }));
  }, [cases]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Case Volume Trend</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cases" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}