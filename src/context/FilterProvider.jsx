import { useState, useMemo } from 'react';
import FilterContext, { DEFAULT_FILTERS } from './FilterContext';

export default function FilterProvider({ children }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const isFiltered = useMemo(() => {
    return (
      filters.searchQuery !== DEFAULT_FILTERS.searchQuery ||
      filters.minMagnitude !== DEFAULT_FILTERS.minMagnitude ||
      filters.category !== DEFAULT_FILTERS.category ||
      filters.limit !== DEFAULT_FILTERS.limit ||
      filters.orderBy !== DEFAULT_FILTERS.orderBy
    );
  }, [filters]);

  const updateFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const value = {
    filters,
    updateFilter,
    resetFilters,
    isFiltered,
    defaultFilters: DEFAULT_FILTERS
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}
