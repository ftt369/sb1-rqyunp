import React from 'react';
import { Table } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/utils/formatters';
import type { Case, Client } from '../../lib/store/types';

interface CaseListProps {
  cases: Case[];
  clients: Client[];
  onCaseClick: (case_: Case) => void;
}

export function CaseList({ cases, clients, onCaseClick }: CaseListProps) {
  const columns = [
    {
      header: 'Case ID',
      accessor: (case_: Case) => (
        <span className="text-sm font-medium text-gray-900">
          #{case_.id.slice(0, 8)}
        </span>
      ),
      className: 'col-span-1',
    },
    {
      header: 'Title',
      accessor: (case_: Case) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{case_.title}</div>
          <div className="text-sm text-gray-500">{case_.type}</div>
        </div>
      ),
      className: 'col-span-4',
    },
    {
      header: 'Client',
      accessor: (case_: Case) => {
        const client = clients.find((c) => c.id === case_.client_id);
        return (
          <span className="text-sm text-gray-900">{client?.name || 'N/A'}</span>
        );
      },
      className: 'col-span-3',
    },
    {
      header: 'Status',
      accessor: (case_: Case) => (
        <Badge
          variant={case_.status === 'Active' ? 'success' : 'warning'}
        >
          {case_.status}
        </Badge>
      ),
      className: 'col-span-2',
    },
    {
      header: 'Date',
      accessor: (case_: Case) => (
        <span className="text-sm text-gray-900">
          {formatDate(case_.created_at)}
        </span>
      ),
      className: 'col-span-2',
    },
  ];

  return <Table columns={columns} data={cases} onRowClick={onCaseClick} />;
}