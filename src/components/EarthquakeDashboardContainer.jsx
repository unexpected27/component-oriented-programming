import { useState, useEffect, useMemo } from 'react';
import KpiCard from './KpiCard';
import Counter from './Counter';
import Toggle from './Toggle';
import WidgetCard from './WidgetCard';
import MagnitudeChart from './MagnitudeChart';
import EarthquakeTable from './EarthquakeTable';
import { fetchEarthquakes } from '../services/earthquakeService';
import { calculateKpis } from '../utils/kpiMetrics';

const DEFAULT_THRESHOLD = 1.0;

function EarthquakeDashboardContainer({ theme, onThemeChange }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const [depthUnit, setDepthUnit] = useState('km');
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [category, setCategory] = useState('all');
  const [sortConfig, setSortConfig] = useState({ field: 'time', direction: 'desc' });
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchEarthquakes()
      .then((data) => {
        if (isMounted) {
          setEvents(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch seismic events');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]);

  const liveKpis = useMemo(() => {
    return calculateKpis(events, depthUnit);
  }, [events, depthUnit]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (threshold > 0 && event.magnitude < threshold) {
        return false;
      }
      if (category === 'weak') return event.magnitude < 3.5;
      if (category === 'light') return event.magnitude >= 3.5 && event.magnitude < 5.0;
      if (category === 'moderate') return event.magnitude >= 5.0 && event.magnitude < 6.5;
      if (category === 'strong') return event.magnitude >= 6.5;
      return true;
    });
  }, [events, threshold, category]);

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

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <h1 className="page-title">Earthquake Analytics Dashboard</h1>
          <p className="page-subtitle">Real-time global seismic activity monitoring via USGS API</p>
        </div>
        <div className="header-status">
          {isLoading && <span className="status-badge-live status-badge-loading">Fetching USGS...</span>}
          {!isLoading && !error && <span className="status-badge-live">Live USGS Feed</span>}
          {!isLoading && error && <span className="status-badge-live status-badge-error">Feed Offline</span>}
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
          <MagnitudeChart events={events} />
        </section>

        <section className="list-section" aria-label="Events table">
          <EarthquakeTable
            events={sortedEvents}
            totalCount={events.length}
            isLoading={isLoading}
            error={error}
            depthUnit={depthUnit}
            category={category}
            onCategoryChange={setCategory}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedEventId={selectedEventId}
            onToggleSelect={handleToggleSelect}
            onRetry={handleRetry}
            minMagnitude={threshold}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>React + Vite • Component-Oriented Programming • Laboratory 02 • 2026</p>
      </footer>
    </div>
  );
}

export default EarthquakeDashboardContainer;
