import React from 'react';
import { toast } from 'react-hot-toast';
import { Search } from 'lucide-react';
import { NoteForm } from './notes/NoteForm';
import { NoteList } from './notes/NoteList';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { noteService } from '../../lib/services/noteService';
import type { Note, NoteCategory } from '../../types/note';

interface CaseNotesProps {
  caseId: string;
}

const categories: { value: NoteCategory | ''; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'General', label: 'General' },
  { value: 'Client Communication', label: 'Client Communication' },
  { value: 'Court Filing', label: 'Court Filing' },
  { value: 'Evidence', label: 'Evidence' },
  { value: 'Strategy', label: 'Strategy' },
  { value: 'Timeline', label: 'Timeline' },
];

export function CaseNotes({ caseId }: CaseNotesProps) {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [editingNote, setEditingNote] = React.useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<NoteCategory | ''>('');

  const fetchNotes = React.useCallback(async () => {
    try {
      const data = await noteService.getByCaseId(caseId);
      setNotes(data);
    } catch (error) {
      toast.error('Failed to load notes');
    }
  }, [caseId]);

  React.useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSubmit = async ({ content, category, html_content }: { content: string; category: NoteCategory; html_content: string }) => {
    try {
      setLoading(true);
      if (editingNote) {
        await noteService.update({
          id: editingNote.id,
          content,
          html_content,
          category
        });
        setEditingNote(null);
      } else {
        await noteService.create({
          content,
          html_content,
          category,
          caseId
        });
      }
      toast.success(editingNote ? 'Note updated successfully' : 'Note added successfully');
      await fetchNotes();
    } catch (error) {
      toast.error(editingNote ? 'Failed to update note' : 'Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await noteService.delete(id);
      toast.success('Note deleted successfully');
      await fetchNotes();
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Case Notes
        </h3>
        
        <div className="mb-6">
          <NoteForm
            onSubmit={handleSubmit}
            loading={loading}
            initialContent={editingNote?.content}
            initialCategory={editingNote?.category}
          />
        </div>

        <div className="mb-6 flex space-x-4">
          <div className="flex-1">
            <Input
              icon={Search}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              fullWidth
            />
          </div>
          <div className="w-64">
            <Select
              options={categories}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as NoteCategory | '')}
              placeholder="Filter by category"
            />
          </div>
        </div>

        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}