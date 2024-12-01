import React from 'react';
import { List, ListOrdered, Quote } from 'lucide-react';
import { Button } from '../../../../ui/Button';
import type { Editor } from '@tiptap/react';

interface ListFormattingProps {
  editor: Editor;
}

export function ListFormatting({ editor }: ListFormattingProps) {
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
      >
        <Quote className="h-4 w-4" />
      </Button>
    </>
  );
}