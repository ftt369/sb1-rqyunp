import { supabase } from '../supabase';
import { toast } from 'react-hot-toast';

export interface DocumentUploadParams {
  file: File;
  caseId?: string;
}

export interface DocumentDeleteParams {
  id: string;
  filePath: string;
}

export interface DocumentAssignParams {
  documentId: string;
  caseId: string;
}

export const documentService = {
  async upload({ file, caseId }: DocumentUploadParams) {
    const fileExt = file.name.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase
      .from('documents')
      .insert([{
        name: file.name,
        size: file.size,
        type: file.type,
        url: publicUrl,
        case_id: caseId || null
      }]);

    if (dbError) throw dbError;
  },

  async delete({ id, filePath }: DocumentDeleteParams) {
    const { error: storageError } = await supabase.storage
      .from('documents')
      .remove([filePath]);

    if (storageError) throw storageError;

    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;
  },

  async assign({ documentId, caseId }: DocumentAssignParams) {
    const { error } = await supabase
      .from('documents')
      .update({ case_id: caseId })
      .eq('id', documentId);

    if (error) throw error;
  }
};