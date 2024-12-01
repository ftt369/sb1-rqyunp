import { supabase } from '../supabase';
import { aiService } from './aiService';
import type { Note, NoteCategory } from '../../types/note';

interface CreateNoteParams {
  content: string;
  html_content: string;
  category: NoteCategory;
  caseId: string;
}

interface UpdateNoteParams {
  id: string;
  content: string;
  html_content: string;
  category: NoteCategory;
}

export const noteService = {
  async create({ content, html_content, category, caseId }: CreateNoteParams) {
    try {
      const [aiInsights, tags] = await Promise.all([
        aiService.analyzeNote(content),
        aiService.suggestTags(content)
      ]);

      const { data, error } = await supabase
        .from('case_notes')
        .insert([{
          case_id: caseId,
          content,
          html_content,
          category,
          ai_insights: aiInsights,
          tags
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error('Failed to create note');
    }
  },

  async update({ id, content, html_content, category }: UpdateNoteParams) {
    try {
      const [aiInsights, tags] = await Promise.all([
        aiService.analyzeNote(content),
        aiService.suggestTags(content)
      ]);

      const { data, error } = await supabase
        .from('case_notes')
        .update({
          content,
          html_content,
          category,
          ai_insights: aiInsights,
          tags
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error('Failed to update note');
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from('case_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      throw new Error('Failed to delete note');
    }
  },

  async getByCaseId(caseId: string): Promise<Note[]> {
    try {
      const { data, error } = await supabase
        .from('case_notes')
        .select('*')
        .eq('case_id', caseId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error('Failed to fetch notes');
    }
  }
};