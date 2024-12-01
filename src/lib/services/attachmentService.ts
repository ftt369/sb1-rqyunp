import { supabase } from '../supabase';
import type { NoteAttachment } from '../../types/note';

export const attachmentService = {
  async upload(file: File, noteId: string): Promise<NoteAttachment> {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${noteId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('note-attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('note-attachments')
        .getPublicUrl(filePath);

      const { data, error } = await supabase
        .from('note_attachments')
        .insert([{
          note_id: noteId,
          name: file.name,
          size: file.size,
          type: file.type,
          url: publicUrl,
          path: filePath
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error('Failed to upload attachment');
    }
  },

  async delete(attachment: NoteAttachment) {
    try {
      const { error: storageError } = await supabase.storage
        .from('note-attachments')
        .remove([attachment.path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('note_attachments')
        .delete()
        .eq('id', attachment.id);

      if (dbError) throw dbError;
    } catch (error) {
      throw new Error('Failed to delete attachment');
    }
  },

  async getByNoteId(noteId: string): Promise<NoteAttachment[]> {
    try {
      const { data, error } = await supabase
        .from('note_attachments')
        .select('*')
        .eq('note_id', noteId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error('Failed to fetch attachments');
    }
  }
};