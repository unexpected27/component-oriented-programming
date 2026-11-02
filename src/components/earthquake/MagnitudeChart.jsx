import { useMemo } from 'react';
import Card from '../ui/atoms/Card/Card';
import ChartTypeSelector from './ChartTypeSelector';
import MagnitudeChartVisualizer from './MagnitudeChartVisualizer';
import useChartSettings from '../../hooks/useChartSettings';
import { MAGNITUDE_BRACKET_COLORS } from '../../design-system/tokens';

const BRACKETS = [
  {
    category: 'Weak (< 3.5)',
    shortLabel: 'Weak (<3.5)',
    min: 0,
    max: 3.5,
    color: MAGNITUDE_BRACKET_COLORS.weak
  },
  {
    category: 'Light (3.5 – 4.9)',
    shortLabel: 'Light (3.5–4.9)',
    min: 3.5,
    max: 5.0,
    color: MAGNITUDE_BRACKET_COLORS.light
  },
  {
    category: 'Moderate (5.0 – 6.4)',
    shortLabel: 'Moderate (5.0–6.4)',
    min: 5.0,
    max: 6.5,
    color: MAGNITUDE_BRACKET_COLORS.moderate
  },
  {
    category: 'Strong (6.5+)',
    shortLabel: 'Strong (6.5+)',
    min: 6.5,
    max: 10.0,
    color: MAGNITUDE_BRACKET_COLORS.strong
  }
];

function MagnitudeChart({ events = [], chartType: propChartType, onTypeChange }) {
  const { chartType: storeChartType, setChartType: storeSetChartType } = useChartSettings();

  const currentChartType = propChartType || storeChartType;
  const handleTypeChange = onTypeChange || storeSetChartType;

  const totalEvents = events.length;

  const chartData = useMemo(() => {
    return BRACKETS.map((bracket) => {
      const matching = events.filter((e) => e.magnitude >= bracket.min && e.magnitude < bracket.max);
      const count = matching.length;
      const percentage = totalEvents > 0 ? Math.round((count / totalEvents) * 100) : 0;
      const totalDepth = matching.reduce((acc, curr) => acc + (Number(curr.depth) || 0), 0);
      const avgDepth = count > 0 ? Number((totalDepth / count).toFixed(1)) : 0;
      const maxMag = count > 0 ? Math.max(...matching.map((e) => Number(e.magnitude) || 0)).toFixed(1) : '0.0';

      return {
        category: bracket.category,
        shortLabel: bracket.shortLabel,
        count,
        percentage,
        avgDepth,
        maxMag,
        color: bracket.color
      };
    });
  }, [events, totalEvents]);

  const headerControls = (
    <div className="chart-header-controls">
      <ChartTypeSelector
        chartType={currentChartType}
        onTypeChange={handleTypeChange}
      />
    </div>
  );

  return (
    <Card
      title="Earthquake distribution by magnitude"
      description={`Interactive visual distribution of ${totalEvents} seismic events filtered by magnitude brackets.`}
      headerActions={headerControls}
    >
      <div className="chart-widget-content">
        <MagnitudeChartVisualizer
          data={chartData}
          chartType={currentChartType}
        />
        <div className="chart-summary-badges">
          {chartData.map((item) => (
            <div key={item.category} className="chart-stat-pill">
              <span className="stat-pill-indicator" style={{ backgroundColor: item.color }} />
              <span className="stat-pill-label">{item.shortLabel}:</span>
              <span className="stat-pill-count">{item.count}</span>
              <span className="stat-pill-pct">({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default MagnitudeChart;
