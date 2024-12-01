import React from 'react';
import { Undo, Redo } from 'lucide-react';
import { Button } from '../../../../ui/Button';
import type { Editor } from '@tiptap/react';

interface HistoryControlsProps {
  editor: Editor;
}

export function HistoryControls({ editor }: HistoryControlsProps) {
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </>
  );
}