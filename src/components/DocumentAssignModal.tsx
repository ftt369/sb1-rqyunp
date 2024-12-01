import React from 'react';
import { toast } from 'react-hot-toast';
import Modal from './Modal';
import { documentService } from '../lib/services/documentService';
import { useStore } from '../lib/store';

interface DocumentAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
  documentName: string;
}

export default function DocumentAssignModal({
  isOpen,
  onClose,
  documentId,
  documentName,
}: DocumentAssignModalProps) {
  const { cases, fetchDocuments } = useStore();
  const [selectedCaseId, setSelectedCaseId] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaseId) return;

    try {
      setLoading(true);
      await documentService.assign({
        documentId,
        caseId: selectedCaseId,
      });
      await fetchDocuments();
      toast.success('Document assigned successfully');
      onClose();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Document to Case"
    >
      <form onSubmit={handleAssign} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Document
          </label>
          <p className="mt-1 text-sm text-gray-500">{documentName}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Case
          </label>
          <select
            required
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="">Choose a case</option>
            {cases.map((case_) => (
              <option key={case_.id} value={case_.id}>
                {case_.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !selectedCaseId}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </form>
    </Modal>
  );
}