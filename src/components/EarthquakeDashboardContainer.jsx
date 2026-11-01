import { useState, useMemo } from 'react';
import KpiCard from './KpiCard';
import Counter from './Counter';
import Toggle from './Toggle';
import WidgetCard from './WidgetCard';
import MagnitudeChart from './MagnitudeChart';
import EarthquakeFilterBar from './EarthquakeFilterBar';
import EarthquakeTable from './EarthquakeTable';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import { buildEarthquakeQueryUrl, normalizeFeature } from '../services/earthquakeService';
import { calculateKpis } from '../utils/kpiMetrics';

const DEFAULT_THRESHOLD = 1.0;

const DEFAULT_FILTERS = {
  searchQuery: '',
  minMagnitude: '0',
  category: 'all',
  limit: '50',
  orderBy: 'time'
};

function EarthquakeDashboardContainer({ theme, onThemeChange }) {
  const [depthUnit, setDepthUnit] = useState('km');
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] = useState({ field: 'time', direction: 'desc' });
  const [selectedEventId, setSelectedEventId] = useState(null);

  const debouncedFilters = useDebounce(filters, 400);

  const apiUrl = useMemo(() => {
    return buildEarthquakeQueryUrl({
      limit: debouncedFilters.limit,
      minMagnitude: debouncedFilters.minMagnitude,
      orderBy: debouncedFilters.orderBy
    });
  }, [debouncedFilters.limit, debouncedFilters.minMagnitude, debouncedFilters.orderBy]);

  const { data, loading, error, refetch } = useFetch(apiUrl);

  const rawEvents = useMemo(() => {
    if (!data || !Array.isArray(data.features)) {
      return [];
    }
    return data.features.map(normalizeFeature);
  }, [data]);

  const filteredEvents = useMemo(() => {
    const query = debouncedFilters.searchQuery.trim().toLowerCase();
    const category = debouncedFilters.category;

    return rawEvents.filter((event) => {
      if (threshold > 0 && event.magnitude < threshold) {
        return false;
      }

      if (query) {
        const matchPlace = event.place.toLowerCase().includes(query);
        const matchRegion = event.region.toLowerCase().includes(query);
        if (!matchPlace && !matchRegion) {
          return false;
        }
      }

      if (category === 'weak') return event.magnitude < 3.5;
      if (category === 'light') return event.magnitude >= 3.5 && event.magnitude < 5.0;
      if (category === 'moderate') return event.magnitude >= 5.0 && event.magnitude < 6.5;
      if (category === 'strong') return event.magnitude >= 6.5;

      return true;
    });
  }, [rawEvents, threshold, debouncedFilters.searchQuery, debouncedFilters.category]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const { field, direction } = sortConfig;
      const valA = a[field];
      const valB = b[field];

      if (typeof valA === 'string' && typeof valB === 'string') {
        const comparison = valA.localeCompare(valB);
        return direction === 'asc' ? comparison : -comparison;
      }

      const numA = Number(valA) || 0;
      const numB = Number(valB) || 0;
      return direction === 'asc' ? numA - numB : numB - numA;
    });
  }, [filteredEvents, sortConfig]);

  const liveKpis = useMemo(() => {
    return calculateKpis(filteredEvents, depthUnit);
  }, [filteredEvents, depthUnit]);

  const isFiltered = useMemo(() => {
    return (
      filters.searchQuery !== DEFAULT_FILTERS.searchQuery ||
      filters.minMagnitude !== DEFAULT_FILTERS.minMagnitude ||
      filters.category !== DEFAULT_FILTERS.category ||
      filters.limit !== DEFAULT_FILTERS.limit ||
      filters.orderBy !== DEFAULT_FILTERS.orderBy
    );
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      const defaultAscFields = ['place', 'region'];
      return {
        field,
        direction: defaultAscFields.includes(field) ? 'asc' : 'desc'
      };
    });
  };

  const handleToggleSelect = (id) => {
    setSelectedEventId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <h1 className="page-title">Earthquake Analytics Dashboard</h1>
          <p className="page-subtitle">Real-time global seismic activity monitoring via USGS API</p>
        </div>
        <div className="header-status">
          {loading && <span className="status-badge-live status-badge-loading">Fetching USGS...</span>}
          {!loading && !error && <span className="status-badge-live">Live USGS Feed</span>}
          {!loading && error && <span className="status-badge-live status-badge-error">Feed Offline</span>}
        </div>
      </header>

      <main className="dashboard-content">
        <section className="kpi-grid" aria-label="KPI overview">
          {liveKpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              isPositive={kpi.isPositive}
              description={kpi.description}
            />
          ))}
        </section>

        <section className="filter-panel-section" aria-label="Earthquake search and filters">
          <EarthquakeFilterBar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            isFiltered={isFiltered}
            isLoading={loading}
            totalCount={rawEvents.length}
            filteredCount={filteredEvents.length}
          />
        </section>

        <section className="controls-grid" aria-label="Dashboard controls">
          <Counter
            initialValue={DEFAULT_THRESHOLD}
            min={0.0}
            max={9.0}
            step={0.5}
            onChange={setThreshold}
          />

          <WidgetCard
            title="Display settings"
            description="Customize measurement units and interface theme."
          >
            <div className="settings-controls">
              <Toggle
                label="Depth units"
                ariaLabel="Select depth unit"
                value={depthUnit}
                onChange={setDepthUnit}
                options={[
                  { value: 'km', label: 'Kilometers' },
                  { value: 'mi', label: 'Miles' }
                ]}
              />
              <Toggle
                label="Theme"
                ariaLabel="Select interface theme"
                value={theme}
                onChange={onThemeChange}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' }
                ]}
              />
            </div>
          </WidgetCard>
        </section>

        <section className="visualization-section" aria-label="Distribution chart">
          <MagnitudeChart events={filteredEvents} />
        </section>

        <section className="list-section" aria-label="Events table">
          <EarthquakeTable
            events={sortedEvents}
            totalCount={rawEvents.length}
            isLoading={loading}
            error={error}
            depthUnit={depthUnit}
            category={filters.category}
            onCategoryChange={(val) => handleFilterChange('category', val)}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedEventId={selectedEventId}
            onToggleSelect={handleToggleSelect}
            onRetry={refetch}
            minMagnitude={threshold}
            onResetFilters={handleResetFilters}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>React + Vite • Component-Oriented Programming • Laboratory 03 • 2026</p>
      </footer>
    </div>
  );
}

export default EarthquakeDashboardContainer;
