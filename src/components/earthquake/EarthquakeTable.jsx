import Card from '../ui/atoms/Card/Card';
import Button from '../ui/atoms/Button/Button';
import Table from '../ui/molecules/Table/Table';
import CategoryFilter from './CategoryFilter';
import EarthquakeRow from './EarthquakeRow';
import LoadingState from '../ui/molecules/LoadingState/LoadingState';
import ErrorState from '../ui/molecules/ErrorState/ErrorState';
import EmptyState from '../ui/molecules/EmptyState/EmptyState';
import useFilters from '../../hooks/useFilters';

const TABLE_COLUMNS = [
  { key: 'favorite', label: '★', sortable: false, width: '48px' },
  { key: 'magnitude', label: 'Magnitude', sortable: true },
  { key: 'place', label: 'Location', sortable: true },
  { key: 'time', label: 'Time (UTC)', sortable: true },
  { key: 'depth', label: 'Depth', sortable: true },
  { key: 'region', label: 'Region', sortable: true },
  { key: 'significance', label: 'Impact', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
];

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

  const headerControls = (
    <div className="table-header-controls">
      <CategoryFilter
        value={filters.category}
        onChange={(val) => updateFilter('category', val)}
        totalCount={totalCount}
      />
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          disabled={isLoading}
          title="Reload USGS feed"
        >
          {isLoading ? 'Fetching...' : '↻ Refresh'}
        </Button>
      )}
    </div>
  );

  return (
    <Card
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
          <Table
            columns={TABLE_COLUMNS}
            sortConfig={sortConfig}
            onSort={onSort}
            ariaLabel="Earthquake events list"
          >
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
                <td colSpan="8" className="no-data">
                  <div className="table-no-data-content">
                    <p>No earthquakes match the current filters.</p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={resetFilters}
                    >
                      Reset filters
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </Table>
        </div>
      )}
    </Card>
  );
}

export default EarthquakeTable;
