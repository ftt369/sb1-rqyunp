import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch<T>(items: T[], searchKeys: (keyof T)[], delay = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm) return items;

    return items.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return value && 
          String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      })
    );
  }, [items, searchKeys, debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}