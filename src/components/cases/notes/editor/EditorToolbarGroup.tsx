import React from 'react';

interface EditorToolbarGroupProps {
  children: React.ReactNode;
}

export function EditorToolbarGroup({ children }: EditorToolbarGroupProps) {
  return (
    <div className="flex space-x-1">
      {children}
    </div>
  );
}