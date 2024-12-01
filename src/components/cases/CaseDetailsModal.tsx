import React from 'react';
import Modal from '../Modal';
import { CaseDetails } from './CaseDetails';
import { Case, Client } from '../../lib/store/types';
import { useStore } from '../../lib/store';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';

interface CaseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  case_: Case;
  onEdit: () => void;
}

export function CaseDetailsModal({
  isOpen,
  onClose,
  case_,
  onEdit,
}: CaseDetailsModalProps) {
  const { clients, fetchCases } = useStore();
  const client = clients.find((c) => c.id === case_.client_id);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const { error } = await supabase
        .from('cases')
        .update({ status: newStatus })
        .eq('id', case_.id);

      if (error) throw error;

      await fetchCases();
      toast.success('Case status updated successfully');
    } catch (error) {
      toast.error('Failed to update case status');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Case Details"
    >
      <CaseDetails
        case_={case_}
        client={client}
        onStatusChange={handleStatusChange}
        onEdit={onEdit}
      />
    </Modal>
  );
}