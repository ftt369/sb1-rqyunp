import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { RichTextEditor } from './RichTextEditor';
import { FileUpload } from './FileUpload';
import type { NoteCategory } from '../../../types/note';

interface NoteFormProps {
  onSubmit: (data: { 
    content: string; 
    category: NoteCategory; 
    html_content: string;
    attachments?: File[];
  }) => Promise<void>;
  loading: boolean;
  initialContent?: string;
  initialCategory?: NoteCategory;
}

const categories: { value: NoteCategory; label: string }[] = [
  { value: 'General', label: 'General' },
  { value: 'Client Communication', label: 'Client Communication' },
  { value: 'Court Filing', label: 'Court Filing' },
  { value: 'Evidence', label: 'Evidence' },
  { value: 'Strategy', label: 'Strategy' },
  { value: 'Timeline', label: 'Timeline' },
];

export function NoteForm({ onSubmit, loading, initialContent = '', initialCategory = 'General' }: NoteFormProps) {
  const { register, handleSubmit, reset } = useForm<{ category: NoteCategory }>();
  const [content, setContent] = React.useState({ text: initialContent, html: '' });
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleFormSubmit = async (data: { category: NoteCategory }) => {
    await onSubmit({
      content: content.text,
      html_content: content.html,
      category: data.category,
      attachments: selectedFiles
    });
    reset();
    setContent({ text: '', html: '' });
    setSelectedFiles([]);
  };

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Select
        label="Category"
        options={categories}
        defaultValue={initialCategory}
        {...register('category')}
      />
      
      <RichTextEditor
        content={content.text}
        onChange={setContent}
      />

      <FileUpload
        onFilesSelected={handleFilesSelected}
        selectedFiles={selectedFiles}
        onRemoveFile={handleRemoveFile}
      />

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          <Plus className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Add Note'}
        </Button>
      </div>
    </form>
  );
}