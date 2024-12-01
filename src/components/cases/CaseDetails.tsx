import React from 'react';
import { Clock, User, FileText, Tag, Calendar } from 'lucide-react';
import { Case, Client } from '../../lib/store/types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils/formatters';
import { CaseNotes } from './CaseNotes';

interface CaseDetailsProps {
  case_: Case;
  client?: Client;
  onStatusChange: (newStatus: string) => void;
  onEdit: () => void;
}

export function CaseDetails({ case_, client, onStatusChange, onEdit }: CaseDetailsProps) {
  const statusOptions = ['Active', 'Pending', 'Closed', 'On Hold'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{case_.title}</h2>
          <p className="text-sm text-gray-500">Case #{case_.id.slice(0, 8)}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <select
              value={case_.status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Badge variant={case_.status === 'Active' ? 'success' : 'warning'}>
              {case_.status}
            </Badge>
          </div>
          <Button onClick={onEdit}>Edit Case</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Case Details</h3>
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <Tag className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-500 mr-2">Type:</span>
              <span className="font-medium">{case_.type}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-500 mr-2">Created:</span>
              <span className="font-medium">{formatDate(case_.created_at)}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-500 mr-2">Last Updated:</span>
              <span className="font-medium">{formatDate(case_.created_at)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
          {client ? (
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-500 mr-2">Name:</span>
                <span className="font-medium">{client.name}</span>
              </div>
              <div className="flex items-center text-sm">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-500 mr-2">Email:</span>
                <span className="font-medium">{client.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-500 mr-2">Phone:</span>
                <span className="font-medium">{client.phone}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No client assigned</p>
          )}
        </div>
      </div>

      {case_.description && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{case_.description}</p>
        </div>
      )}

      <CaseNotes caseId={case_.id} />
    </div>
  );
}