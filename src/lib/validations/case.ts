import { z } from 'zod';

export const caseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.string().min(1, 'Type is required'),
  client_id: z.string().min(1, 'Client is required'),
  description: z.string().optional(),
});

export type CaseFormData = z.infer<typeof caseSchema>;