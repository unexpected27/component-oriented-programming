import { useState, useEffect } from 'react';
import KpiCard from './components/KpiCard';
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import EarthquakeTable from './components/EarthquakeTable';
import MagnitudeChart from './components/MagnitudeChart';
import { mockEarthquakes } from './data/mockData';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [depthUnit, setDepthUnit] = useState('km');
  const [threshold, setThreshold] = useState(4.0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const kpis = [
    {
      id: 'kpi-total',
      title: 'Total earthquakes',
      value: '42',
      change: '+8.4%',
      isPositive: true,
      description: 'Recorded in 24 hours'
    },
    {
      id: 'kpi-strong',
      title: 'Strong earthquakes',
      value: '6',
      change: '+2.1%',
      isPositive: true,
      description: 'Magnitude >= 6.5'
    },
    {
      id: 'kpi-avg',
      title: 'Average magnitude',
      value: '4.7',
      change: '-0.4%',
      isPositive: false,
      description: 'Daily mean magnitude'
    }
  ];

  return (
    <div className="app-shell" data-theme={theme}>
      <div className="app-container">
        {/* Page Header */}
        <header className="app-header">
          <div className="header-brand">
            <h1 className="page-title">Earthquake Analytics Dashboard</h1>
                      </div>
          <div className="header-status">
            <span className="status-badge-live">Mock Data Active</span>
          </div>
        </header>

        <main className="dashboard-content">
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

          <section className="controls-grid" aria-label="Dashboard controls">
            <Counter 
              initialValue={threshold}
              onThresholdChange={setThreshold}
            />
            <Toggle 
              onUnitChange={setDepthUnit}
              onThemeChange={setTheme}
            />
          </section>

          <section className="visualization-section" aria-label="Distribution chart">
            <MagnitudeChart events={mockEarthquakes} />
          </section>

          <section className="list-section" aria-label="Events table">
            <EarthquakeTable 
              events={mockEarthquakes} 
              depthUnit={depthUnit}
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
