import { useState, useEffect } from 'react';
import KpiCard from './components/KpiCard';
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import FilteredList from './components/FilteredList';
import MagnitudeChart from './components/MagnitudeChart';
import WidgetCard from './components/WidgetCard';
import { mockEarthquakes, getKpiMetrics } from './data/mockData';
import './App.css';

const DEFAULT_THRESHOLD = 4.0;

/**
 * Root Dashboard Component (App)
 * Coordinates dashboard state, lifting state up, unidirectional data flow,
 * and high-level component composition.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [depthUnit, setDepthUnit] = useState('km');
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Dynamic KPI indicators computed from data
  const kpis = getKpiMetrics(mockEarthquakes);

  return (
    <div className="app-shell" data-theme={theme}>
      <div className="app-container">
        {/* Page Header */}
        <header className="app-header">
          <div className="header-brand">
            <h1 className="page-title">Earthquake Analytics Dashboard</h1>
            <p className="page-subtitle">Seismic activity monitoring & incident analytics</p>
          </div>
          <div className="header-status">
            <span className="status-badge-live">Mock Data Active</span>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="dashboard-content">
          {/* Reusable KPI Cards Grid */}
          <section className="kpi-grid" aria-label="KPI overview">
            {kpis.map((kpi) => (
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

          {/* Interactive Controls Section */}
          <section className="controls-grid" aria-label="Dashboard controls">
            <Counter 
              initialValue={DEFAULT_THRESHOLD}
              onChange={setThreshold}
            />

            {/* WidgetCard demonstrating composition via children */}
            <WidgetCard
              title="Display settings"
              description="Customize measurement units and application theme."
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
                  onChange={setTheme}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' }
                  ]}
                />
              </div>
            </WidgetCard>
          </section>

          {/* Visualization Section */}
          <section className="visualization-section" aria-label="Distribution chart">
            <MagnitudeChart events={mockEarthquakes} />
          </section>

          {/* Filtered List Section */}
          <section className="list-section" aria-label="Events table">
            <FilteredList 
              events={mockEarthquakes} 
              depthUnit={depthUnit}
              minMagnitude={threshold}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>React + Vite • Component-Oriented Programming • 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
