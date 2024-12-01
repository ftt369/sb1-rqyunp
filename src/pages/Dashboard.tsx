import React from 'react';
import { BarChart, Users, Briefcase, Clock } from 'lucide-react';
import { useStore } from '../lib/store';
import { WelcomeSection } from '../components/dashboard/WelcomeSection';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentCases } from '../components/dashboard/RecentCases';
import { DeadlinesList } from '../components/dashboard/DeadlinesList';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { CaseChart } from '../components/dashboard/CaseChart';

// Mock data for demonstration
const mockDeadlines = [
  {
    id: '1',
    title: 'File Motion for Summary Judgment',
    dueDate: new Date('2024-03-20'),
    caseId: '1',
    caseTitle: 'Smith vs. Johnson Corp',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Client Meeting',
    dueDate: new Date('2024-03-22'),
    caseId: '2',
    caseTitle: 'Estate of Brown',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Document Review',
    dueDate: new Date('2024-03-25'),
    caseId: '3',
    caseTitle: 'Thompson LLC Merger',
    priority: 'low',
  },
] as const;

const mockActivities = [
  {
    id: '1',
    type: 'note',
    title: 'Added case notes for Smith vs. Johnson Corp',
    timestamp: new Date('2024-03-15T10:00:00'),
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: '2',
    type: 'document',
    title: 'Uploaded new evidence documents',
    timestamp: new Date('2024-03-15T09:30:00'),
    user: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: '3',
    type: 'client',
    title: 'Added new client: Thompson LLC',
    timestamp: new Date('2024-03-15T09:00:00'),
    user: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
  },
] as const;

export default function Dashboard() {
  const { cases, clients } = useStore();
  
  const activeCases = cases.filter(c => c.status === 'Active').length;
  const totalCases = cases.length;
  const successRate = totalCases > 0 ? Math.round((activeCases / totalCases) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <WelcomeSection />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Cases"
          value={totalCases.toString()}
          icon={Briefcase}
          change="+12.3%"
          trend="up"
        />
        <StatCard
          title="Active Clients"
          value={clients.length.toString()}
          icon={Users}
          change="+8.2%"
          trend="up"
        />
        <StatCard
          title="Case Success Rate"
          value={`${successRate}%`}
          icon={BarChart}
          change="+3.1%"
          trend="up"
        />
        <StatCard
          title="Avg. Resolution Time"
          value="48 days"
          icon={Clock}
          change="-5.4%"
          trend="down"
        />
      </div>

      <CaseChart cases={cases} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentCases cases={cases} />
        <DeadlinesList deadlines={mockDeadlines} />
      </div>

      <ActivityFeed activities={mockActivities} />
    </div>
  );
}