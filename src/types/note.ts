export type NoteCategory = 'General' | 'Client Communication' | 'Court Filing' | 'Evidence' | 'Strategy' | 'Timeline';

export interface NoteAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
}

export interface Note {
  id: string;
  content: string;
  created_at: string;
  created_by: string;
  ai_insights?: string;
  tags?: string[];
  case_id: string;
  category: NoteCategory;
  html_content?: string;
  attachments?: NoteAttachment[];
}