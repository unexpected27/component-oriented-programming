import { createContext } from 'react';

export const DEFAULT_FILTERS = {
  searchQuery: '',
  minMagnitude: '0',
  category: 'all',
  limit: '50',
  orderBy: 'time'
};

export const FilterContext = createContext(null);
export default FilterContext;
