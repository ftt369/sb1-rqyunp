import React from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { formatFileSize } from '../../../lib/utils/formatters';
import type { NoteAttachment } from '../../../types/note';

interface AttachmentListProps {
  attachments: NoteAttachment[];
  onDelete?: (attachment: NoteAttachment) => void;
}

export function AttachmentList({ attachments, onDelete }: AttachmentListProps) {
  if (!attachments?.length) return null;

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Attachments</h4>
      <div className="space-y-2">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {attachment.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(attachment.size)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(attachment.url, '_blank')}
              >
                <Download className="h-4 w-4" />
              </Button>
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(attachment)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}