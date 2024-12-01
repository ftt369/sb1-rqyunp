import React from 'react';
import { EditorToolbarGroup } from './EditorToolbarGroup';
import { TextFormatting } from './toolbar-groups/TextFormatting';
import { ListFormatting } from './toolbar-groups/ListFormatting';
import { AlignmentControls } from './toolbar-groups/AlignmentControls';
import { InsertControls } from './toolbar-groups/InsertControls';
import { HistoryControls } from './toolbar-groups/HistoryControls';
import type { Editor } from '@tiptap/react';

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const handleAddLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleAddTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap gap-2">
      <EditorToolbarGroup>
        <TextFormatting editor={editor} />
      </EditorToolbarGroup>

      <EditorToolbarGroup>
        <ListFormatting editor={editor} />
      </EditorToolbarGroup>

      <EditorToolbarGroup>
        <AlignmentControls editor={editor} />
      </EditorToolbarGroup>

      <EditorToolbarGroup>
        <InsertControls 
          editor={editor}
          onAddLink={handleAddLink}
          onAddTable={handleAddTable}
        />
      </EditorToolbarGroup>

      <EditorToolbarGroup>
        <HistoryControls editor={editor} />
      </EditorToolbarGroup>
    </div>
  );
}