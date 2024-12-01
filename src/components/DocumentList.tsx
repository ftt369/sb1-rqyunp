import React from 'react';
import { FileText, Trash2, Link2 } from 'lucide-react';
import { Table } from './ui/Table';
import { Badge } from './ui/Badge';
import { formatFileSize } from '../lib/utils/formatters';
import type { Document } from '../lib/store/types';

interface DocumentListProps {
  documents: Document[];
  cases: any[];
  onAssign: (document: Document) => void;
  onDelete: (document: Document) => void;
}

export function DocumentList({
  documents,
  cases,
  onAssign,
  onDelete,
}: DocumentListProps) {
  const columns = [
    {
      header: 'Name',
      accessor: (doc: Document) => (
        <div className="col-span-5 flex items-center">
          <FileText className="h-5 w-5 text-gray-400 mr-3" />
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
          >
            {doc.name}
          </a>
        </div>
      ),
      className: 'col-span-5',
    },
    {
      header: 'Size',
      accessor: (doc: Document) => formatFileSize(doc.size),
      className: 'col-span-2',
    },
    {
      header: 'Case',
      accessor: (doc: Document) => {
        const case_ = cases.find((c) => c.id === doc.case_id);
        return case_?.title || 'Unassigned';
      },
      className: 'col-span-3',
    },
    {
      header: 'Actions',
      accessor: (doc: Document) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAssign(doc);
            }}
            className="text-gray-600 hover:text-gray-900"
            title="Assign to case"
          >
            <Link2 className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(doc);
            }}
            className="text-red-600 hover:text-red-900"
            title="Delete document"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
      className: 'col-span-2',
    },
  ];

  return <Table columns={columns} data={documents} />;
}