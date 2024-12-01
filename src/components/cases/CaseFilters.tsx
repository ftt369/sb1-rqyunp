import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface CaseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewCase: () => void;
}

export function CaseFilters({
  searchTerm,
  onSearchChange,
  onNewCase,
}: CaseFiltersProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div className="relative flex-1 max-w-lg">
        <Input
          icon={Search}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search cases..."
          fullWidth
        />
      </div>
      <div className="ml-6 flex items-center space-x-3">
        <Button
          variant="secondary"
          icon={Filter}
        >
          Filter
        </Button>
        <Button
          onClick={onNewCase}
        >
          New Case
        </Button>
      </div>
    </div>
  );
}