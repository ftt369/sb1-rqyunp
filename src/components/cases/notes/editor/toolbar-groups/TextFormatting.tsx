import React from 'react';
import { Bold, Italic, Underline as UnderlineIcon } from 'lucide-react';
import { Button } from '../../../../ui/Button';
import type { Editor } from '@tiptap/react';

interface TextFormattingProps {
  editor: Editor;
}

export function TextFormatting({ editor }: TextFormattingProps) {
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-200' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-200' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-gray-200' : ''}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
    </>
  );
}