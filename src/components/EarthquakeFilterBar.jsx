import WidgetCard from './WidgetCard';

function EarthquakeFilterBar({
  filters,
  onChange,
  onReset,
  isFiltered,
  isLoading,
  totalCount,
  filteredCount
}) {
  const handleTextChange = (e) => {
    onChange('searchQuery', e.target.value);
  };

  const handleClearSearch = () => {
    onChange('searchQuery', '');
  };

  const headerActions = (
    <div className="filter-bar-header-meta">
      <span className="filter-count-badge">
        {filteredCount} of {totalCount} events
      </span>
      {isLoading && <span className="filter-loading-dot" aria-label="Loading query updates" />}
    </div>
  );

  return (
    <WidgetCard
      title="Filter and query panel"
      description="Refine earthquake data by location keyword, minimum magnitude, classification category, ordering, and event count."
      headerActions={headerActions}
    >
      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
        <div className="filter-row">
          <div className="filter-field filter-field-search">
            <label htmlFor="filter-search-input" className="field-label">
              Search location
            </label>
            <div className="search-box-wrapper">
              <input
                id="filter-search-input"
                type="text"
                className="filter-text-input"
                placeholder="Search place or region (e.g. California, Japan, Alaska)..."
                value={filters.searchQuery}
                onChange={handleTextChange}
                autoComplete="off"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Clear search input"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="filter-field">
            <label htmlFor="filter-min-mag" className="field-label">
              Min magnitude
            </label>
            <select
              id="filter-min-mag"
              className="filter-select-input"
              value={filters.minMagnitude}
              onChange={(e) => onChange('minMagnitude', e.target.value)}
            >
              <option value="0">All magnitudes (0+)</option>
              <option value="1.0">M 1.0+ (Micro)</option>
              <option value="2.5">M 2.5+ (Minor / Felt)</option>
              <option value="4.5">M 4.5+ (Moderate)</option>
              <option value="6.0">M 6.0+ (Strong)</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="filter-category" className="field-label">
              Category
            </label>
            <select
              id="filter-category"
              className="filter-select-input"
              value={filters.category}
              onChange={(e) => onChange('category', e.target.value)}
            >
              <option value="all">All categories</option>
              <option value="weak">Weak (&lt; 3.5)</option>
              <option value="light">Light (3.5 – 4.9)</option>
              <option value="moderate">Moderate (5.0 – 6.4)</option>
              <option value="strong">Strong (6.5+)</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="filter-order-by" className="field-label">
              Sort by
            </label>
            <select
              id="filter-order-by"
              className="filter-select-input"
              value={filters.orderBy}
              onChange={(e) => onChange('orderBy', e.target.value)}
            >
              <option value="time">Newest first</option>
              <option value="time-asc">Oldest first</option>
              <option value="magnitude">Highest magnitude</option>
              <option value="magnitude-asc">Lowest magnitude</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="filter-limit" className="field-label">
              Limit
            </label>
            <select
              id="filter-limit"
              className="filter-select-input"
              value={filters.limit}
              onChange={(e) => onChange('limit', e.target.value)}
            >
              <option value="25">25 events</option>
              <option value="50">50 events</option>
              <option value="100">100 events</option>
              <option value="200">200 events</option>
            </select>
          </div>

          <div className="filter-actions-group">
            <button
              type="button"
              className="btn btn-secondary btn-reset-filters"
              onClick={onReset}
              disabled={!isFiltered}
              title={isFiltered ? 'Reset all filters to defaults' : 'Filters are already at default'}
            >
              ↺ Reset filters
            </button>
          </div>
        </div>
      </form>
    </WidgetCard>
  );
}

export default EarthquakeFilterBar;
