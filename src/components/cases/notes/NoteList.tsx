import React from 'react';
import { NoteCard } from './NoteCard';
import type { Note } from '../../../types/note';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export function NoteList({ notes, onDelete, onEdit }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No notes yet. Add one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}