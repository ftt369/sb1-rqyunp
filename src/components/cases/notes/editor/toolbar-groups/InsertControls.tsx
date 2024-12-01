import React from 'react';
import { Link as LinkIcon, Table as TableIcon, Highlighter } from 'lucide-react';
import { Button } from '../../../../ui/Button';
import type { Editor } from '@tiptap/react';

interface InsertControlsProps {
  editor: Editor;
  onAddLink: () => void;
  onAddTable: () => void;
}

export function InsertControls({ editor, onAddLink, onAddTable }: InsertControlsProps) {
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={onAddLink}
        className={editor.isActive('link') ? 'bg-gray-200' : ''}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={onAddTable}
      >
        <TableIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? 'bg-gray-200' : ''}
      >
        <Highlighter className="h-4 w-4" />
      </Button>
    </>
  );
}