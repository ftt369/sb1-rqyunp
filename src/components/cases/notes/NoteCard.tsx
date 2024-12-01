import React from 'react';
import { MessageSquare, Tag as TagIcon, Trash2, Edit2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { AttachmentList } from './AttachmentList';
import type { Note, NoteAttachment } from '../../../types/note';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
  onDeleteAttachment: (noteId: string, attachment: NoteAttachment) => void;
}

export function NoteCard({ note, onDelete, onEdit, onDeleteAttachment }: NoteCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="info">{note.category}</Badge>
          </div>
          {note.html_content ? (
            <div 
              className="text-sm text-gray-900 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: note.html_content }}
            />
          ) : (
            <p className="text-sm text-gray-900">{note.content}</p>
          )}
          <div className="mt-2 flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(note)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(note.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="mt-3 flex items-center space-x-2">
          <TagIcon className="h-4 w-4 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <Badge key={index} variant="info">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {note.attachments && (
        <AttachmentList
          attachments={note.attachments}
          onDelete={(attachment) => onDeleteAttachment(note.id, attachment)}
        />
      )}

      {note.ai_insights && (
        <div className="mt-3 bg-blue-50 rounded p-3">
          <p className="text-xs text-blue-700">{note.ai_insights}</p>
        </div>
      )}
    </div>
  );
}