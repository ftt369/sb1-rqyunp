import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useStore } from '../lib/store';
import { caseSchema, type CaseFormData } from '../lib/validations/case';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

const caseTypes = [
  { value: 'Corporate Litigation', label: 'Corporate Litigation' },
  { value: 'Estate Planning', label: 'Estate Planning' },
  { value: 'Administrative Law', label: 'Administrative Law' },
  { value: 'Criminal Defense', label: 'Criminal Defense' },
  { value: 'Family Law', label: 'Family Law' },
];

interface CaseFormProps {
  caseData?: {
    id: string;
    title: string;
    type: string;
    client_id: string;
    description: string;
  };
  onClose: () => void;
}

export default function CaseForm({ caseData, onClose }: CaseFormProps) {
  const { clients, fetchCases } = useStore();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: caseData || {
      title: '',
      type: '',
      client_id: '',
      description: '',
    },
  });

  const onSubmit = async (data: CaseFormData) => {
    setLoading(true);

    try {
      if (caseData?.id) {
        const { error } = await supabase
          .from('cases')
          .update(data)
          .eq('id', caseData.id);
        if (error) throw error;
        toast.success('Case updated successfully');
      } else {
        const { error } = await supabase
          .from('cases')
          .insert([{ ...data, status: 'Active' }]);
        if (error) throw error;
        toast.success('Case created successfully');
      }
      
      await fetchCases();
      onClose();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        {...register('title')}
        error={errors.title?.message}
        fullWidth
      />

      <Select
        label="Type"
        {...register('type')}
        options={caseTypes}
        error={errors.type?.message}
        fullWidth
      />

      <Select
        label="Client"
        {...register('client_id')}
        options={clients.map((client) => ({
          value: client.id,
          label: client.name,
        }))}
        error={errors.client_id?.message}
        fullWidth
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {loading ? 'Saving...' : caseData ? 'Update Case' : 'Create Case'}
        </Button>
      </div>
    </form>
  );
}