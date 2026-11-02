import { create } from 'zustand';

export const DEFAULT_FILTERS = {
  searchQuery: '',
  minMagnitude: '0',
  category: 'all',
  limit: '50',
  orderBy: 'time',
  onlyFavorites: false
};

const getStoredFavorites = () => {
  try {
    const raw = localStorage.getItem('seismic-favorites');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getStoredTheme = () => {
  try {
    return localStorage.getItem('app-theme') || 'light';
  } catch {
    return 'light';
  }
};

const syncThemeToDocument = (theme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
  try {
    localStorage.setItem('app-theme', theme);
  } catch {
    void 0;
  }
};

const persistFavorites = (favorites) => {
  try {
    localStorage.setItem('seismic-favorites', JSON.stringify(favorites));
  } catch {
    void 0;
  }
};

const initialTheme = getStoredTheme();
syncThemeToDocument(initialTheme);

export const useAppStore = create((set, get) => ({
  filters: DEFAULT_FILTERS,
  updateFilter: (field, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [field]: value
      }
    }));
  },
  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS });
  },
  isFiltered: () => {
    const { filters } = get();
    return (
      filters.searchQuery !== DEFAULT_FILTERS.searchQuery ||
      filters.minMagnitude !== DEFAULT_FILTERS.minMagnitude ||
      filters.category !== DEFAULT_FILTERS.category ||
      filters.limit !== DEFAULT_FILTERS.limit ||
      filters.orderBy !== DEFAULT_FILTERS.orderBy ||
      filters.onlyFavorites !== DEFAULT_FILTERS.onlyFavorites
    );
  },

  favorites: getStoredFavorites(),
  toggleFavorite: (id) => {
    const current = get().favorites;
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    persistFavorites(updated);
    set({ favorites: updated });
  },
  isFavorite: (id) => {
    return get().favorites.includes(id);
  },
  clearFavorites: () => {
    persistFavorites([]);
    set({ favorites: [] });
  },

  theme: initialTheme,
  setTheme: (theme) => {
    syncThemeToDocument(theme);
    set({ theme });
  },
  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    syncThemeToDocument(nextTheme);
    set({ theme: nextTheme });
  },

  chartType: 'bar',
  setChartType: (chartType) => {
    set({ chartType });
  }
}));

export const selectFilters = (state) => state.filters;
export const selectUpdateFilter = (state) => state.updateFilter;
export const selectResetFilters = (state) => state.resetFilters;
export const selectFavorites = (state) => state.favorites;
export const selectToggleFavorite = (state) => state.toggleFavorite;
export const selectTheme = (state) => state.theme;
export const selectToggleTheme = (state) => state.toggleTheme;
export const selectChartType = (state) => state.chartType;
export const selectSetChartType = (state) => state.setChartType;

export default useAppStore;
