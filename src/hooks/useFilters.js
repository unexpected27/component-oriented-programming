import useAppStore, { DEFAULT_FILTERS } from '../store/useAppStore';

export default function useFilters() {
  const filters = useAppStore((state) => state.filters);
  const updateFilter = useAppStore((state) => state.updateFilter);
  const resetFilters = useAppStore((state) => state.resetFilters);
  const isFilteredFn = useAppStore((state) => state.isFiltered);

  return {
    filters,
    updateFilter,
    resetFilters,
    isFiltered: isFilteredFn(),
    defaultFilters: DEFAULT_FILTERS
  };
}
