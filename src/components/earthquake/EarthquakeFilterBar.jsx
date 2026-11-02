import useFilters from '../../hooks/useFilters';
import useFavorites from '../../hooks/useFavorites';
import Card from '../ui/atoms/Card/Card';
import Badge from '../ui/atoms/Badge/Badge';
import Button from '../ui/atoms/Button/Button';
import Input from '../ui/atoms/Input/Input';
import Select from '../ui/atoms/Select/Select';
import FormField from '../ui/molecules/FormField/FormField';

const MIN_MAG_OPTIONS = [
  { value: '0', label: 'All magnitudes (0+)' },
  { value: '1.0', label: 'M 1.0+ (Micro)' },
  { value: '2.5', label: 'M 2.5+ (Minor / Felt)' },
  { value: '4.5', label: 'M 4.5+ (Moderate)' },
  { value: '6.0', label: 'M 6.0+ (Strong)' }
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All categories' },
  { value: 'weak', label: 'Weak (< 3.5)' },
  { value: 'light', label: 'Light (3.5 – 4.9)' },
  { value: 'moderate', label: 'Moderate (5.0 – 6.4)' },
  { value: 'strong', label: 'Strong (6.5+)' }
];

const ORDER_BY_OPTIONS = [
  { value: 'time', label: 'Newest first' },
  { value: 'time-asc', label: 'Oldest first' },
  { value: 'magnitude', label: 'Highest magnitude' },
  { value: 'magnitude-asc', label: 'Lowest magnitude' }
];

const LIMIT_OPTIONS = [
  { value: '25', label: '25 events' },
  { value: '50', label: '50 events' },
  { value: '100', label: '100 events' },
  { value: '200', label: '200 events' }
];

function EarthquakeFilterBar({
  isLoading = false,
  totalCount = 0,
  filteredCount = 0
}) {
  const { filters, updateFilter, resetFilters, isFiltered } = useFilters();
  const { count: favoritesCount } = useFavorites();

  const handleTextChange = (e) => {
    updateFilter('searchQuery', e.target.value);
  };

  const handleClearSearch = () => {
    updateFilter('searchQuery', '');
  };

  const headerActions = (
    <div className="filter-bar-header-meta">
      <Badge variant="neutral" size="sm" shape="pill">
        {filteredCount} of {totalCount} events
      </Badge>
      {isLoading && <span className="filter-loading-dot" aria-label="Loading query updates" />}
    </div>
  );

  return (
    <Card
      title="Filter and query panel"
      description="Refine earthquake data by location keyword, minimum magnitude, classification category, ordering, and event count."
      headerActions={headerActions}
    >
      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
        <div className="filter-row">
          <div className="filter-field filter-field-search">
            <FormField label="Search location" htmlFor="filter-search-input">
              <Input
                id="filter-search-input"
                name="searchQuery"
                type="text"
                placeholder="Search place or region (e.g. California, Japan, Alaska)..."
                value={filters.searchQuery}
                onChange={handleTextChange}
                onClear={handleClearSearch}
                autoComplete="off"
              />
            </FormField>
          </div>

          <div className="filter-field">
            <FormField label="Min magnitude" htmlFor="filter-min-mag">
              <Select
                id="filter-min-mag"
                name="minMagnitude"
                value={filters.minMagnitude}
                onChange={(e) => updateFilter('minMagnitude', e.target.value)}
                options={MIN_MAG_OPTIONS}
              />
            </FormField>
          </div>

          <div className="filter-field">
            <FormField label="Category" htmlFor="filter-category">
              <Select
                id="filter-category"
                name="category"
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                options={CATEGORY_OPTIONS}
              />
            </FormField>
          </div>

          <div className="filter-field">
            <FormField label="Sort by" htmlFor="filter-order-by">
              <Select
                id="filter-order-by"
                name="orderBy"
                value={filters.orderBy}
                onChange={(e) => updateFilter('orderBy', e.target.value)}
                options={ORDER_BY_OPTIONS}
              />
            </FormField>
          </div>

          <div className="filter-field">
            <FormField label="Limit" htmlFor="filter-limit">
              <Select
                id="filter-limit"
                name="limit"
                value={filters.limit}
                onChange={(e) => updateFilter('limit', e.target.value)}
                options={LIMIT_OPTIONS}
              />
            </FormField>
          </div>

          <div className="filter-actions-group">
            <Button
              variant={filters.onlyFavorites ? 'primary' : 'secondary'}
              size="md"
              onClick={() => updateFilter('onlyFavorites', !filters.onlyFavorites)}
              title="Filter to show only favorited earthquakes"
            >
              <span aria-hidden="true">{filters.onlyFavorites ? '★' : '☆'}</span>
              <span>Favorites only ({favoritesCount})</span>
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={resetFilters}
              disabled={!isFiltered}
              title={isFiltered ? 'Reset all filters to defaults' : 'Filters are already at default'}
            >
              ↺ Reset filters
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default EarthquakeFilterBar;
