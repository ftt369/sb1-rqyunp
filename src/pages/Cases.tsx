import React, { useEffect } from 'react';
import { useStore } from '../lib/store';
import { Card } from '../components/ui/Card';
import { CaseList } from '../components/cases/CaseList';
import { CaseFilters } from '../components/cases/CaseFilters';
import { CaseStats } from '../components/cases/CaseStats';
import Modal from '../components/Modal';
import CaseForm from '../components/CaseForm';
import { CaseDetailsModal } from '../components/cases/CaseDetailsModal';
import { useSearch } from '../lib/hooks/useSearch';
import type { Case } from '../lib/store/types';

export default function Cases() {
  const { cases, clients, fetchCases, fetchClients } = useStore();
  const [isFormModalOpen, setIsFormModalOpen] = React.useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  const [selectedCase, setSelectedCase] = React.useState<Case | null>(null);
  const { searchTerm, setSearchTerm, filteredItems: filteredCases } = useSearch(
    cases,
    ['title', 'type']
  );

  useEffect(() => {
    fetchCases();
    fetchClients();
  }, [fetchCases, fetchClients]);

  const handleCaseClick = (case_: Case) => {
    setSelectedCase(case_);
    setIsDetailsModalOpen(true);
  };

  const handleEditCase = () => {
    setIsDetailsModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedCase(null);
    setIsFormModalOpen(false);
  };

  const handleCloseDetails = () => {
    setSelectedCase(null);
    setIsDetailsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Cases</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage and track all your legal cases in one place.
        </p>
      </div>

      <CaseStats cases={cases} />

      <Card>
        <CaseFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onNewCase={() => setIsFormModalOpen(true)}
        />
        <CaseList
          cases={filteredCases}
          clients={clients}
          onCaseClick={handleCaseClick}
        />
      </Card>

      {selectedCase && (
        <>
          <CaseDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={handleCloseDetails}
            case_={selectedCase}
            onEdit={handleEditCase}
          />
          <Modal
            isOpen={isFormModalOpen}
            onClose={handleCloseForm}
            title="Edit Case"
          >
            <CaseForm caseData={selectedCase} onClose={handleCloseForm} />
          </Modal>
        </>
      )}

      <Modal
        isOpen={isFormModalOpen && !selectedCase}
        onClose={handleCloseForm}
        title="New Case"
      >
        <CaseForm onClose={handleCloseForm} />
      </Modal>
    </div>
  );
}