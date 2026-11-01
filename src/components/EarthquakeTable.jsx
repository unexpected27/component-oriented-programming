import WidgetCard from './WidgetCard';
import CategoryFilter from './CategoryFilter';
import EarthquakeRow from './EarthquakeRow';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import useFilters from '../hooks/useFilters';

function EarthquakeTable({
  events = [],
  totalCount = 0,
  isLoading = false,
  error = null,
  depthUnit = 'km',
  sortConfig = { field: 'time', direction: 'desc' },
  onSort,
  onRetry,
  minMagnitude = 0
}) {
  const { filters, updateFilter, resetFilters } = useFilters();

  const getSortIcon = (field) => {
    if (sortConfig.field !== field) {
      return '↕';
    }
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  const getAriaSort = (field) => {
    if (sortConfig.field !== field) {
      return 'none';
    }
    return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
  };

  const renderSortableHeader = (field, label) => (
    <th
      className={`th-sortable ${sortConfig.field === field ? 'th-sorted' : ''}`}
      aria-sort={getAriaSort(field)}
    >
      <button
        type="button"
        className="sort-header-btn"
        onClick={() => onSort(field)}
        title={`Sort by ${label} (${sortConfig.field === field && sortConfig.direction === 'asc' ? 'descending' : 'ascending'})`}
      >
        <span>{label}</span>
        <span className="sort-indicator" aria-hidden="true">{getSortIcon(field)}</span>
      </button>
    </th>
  );

  const headerControls = (
    <div className="table-header-controls">
      <CategoryFilter
        value={filters.category}
        onChange={(val) => updateFilter('category', val)}
        totalCount={totalCount}
      />
      {onRetry && (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onRetry}
          disabled={isLoading}
          title="Reload USGS feed"
        >
          {isLoading ? 'Fetching...' : '↻ Refresh'}
        </button>
      )}
    </div>
  );

  return (
    <WidgetCard
      title="Recent earthquake events"
      description={`Real-time seismic activity feed from USGS API (showing ${events.length} of ${totalCount} events, min M ${minMagnitude.toFixed(1)}).`}
      headerActions={headerControls}
    >
      {isLoading && <LoadingState />}

      {!isLoading && error && (
        <ErrorState error={error} onRetry={onRetry} />
      )}

      {!isLoading && !error && totalCount === 0 && (
        <EmptyState
          title="No earthquake events reported"
          message="No seismic activity was recorded by USGS in the selected timeframe."
          actionLabel="Refresh feed"
          onAction={onRetry}
        />
      )}

      {!isLoading && !error && totalCount > 0 && (
        <div className="table-responsive">
          <table className="events-table">
            <thead>
              <tr>
                {renderSortableHeader('magnitude', 'Magnitude')}
                {renderSortableHeader('place', 'Location')}
                {renderSortableHeader('time', 'Time (UTC)')}
                {renderSortableHeader('depth', 'Depth')}
                {renderSortableHeader('region', 'Region')}
                {renderSortableHeader('significance', 'Impact')}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event) => (
                  <EarthquakeRow
                    key={event.id}
                    event={event}
                    depthUnit={depthUnit}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    <div className="table-no-data-content">
                      <p>No earthquakes match the current filters.</p>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={resetFilters}
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </WidgetCard>
  );
}

export default EarthquakeTable;
