import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

function ChartTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) {
    return null;
  }
  const item = payload[0].payload;
  return (
    <div className="custom-chart-tooltip">
      <div className="tooltip-title">{item.category}</div>
      <div className="tooltip-row">
        <span className="tooltip-label">Events:</span>
        <span className="tooltip-value">{item.count} ({item.percentage}%)</span>
      </div>
      <div className="tooltip-row">
        <span className="tooltip-label">Avg Depth:</span>
        <span className="tooltip-value">{item.avgDepth} km</span>
      </div>
      <div className="tooltip-row">
        <span className="tooltip-label">Max Magnitude:</span>
        <span className="tooltip-value">M {item.maxMag}</span>
      </div>
    </div>
  );
}

function MagnitudeChartVisualizer({ data = [], chartType = 'bar' }) {
  if (!data || data.length === 0 || data.every((d) => d.count === 0)) {
    return (
      <div className="chart-empty-placeholder">
        <p>No earthquake events available for the selected filters.</p>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
            <XAxis dataKey="shortLabel" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} allowDecimals={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              name="Earthquakes"
              stroke="var(--accent-primary, #0969da)"
              strokeWidth={3}
              dot={{ r: 5, fill: 'var(--accent-primary, #0969da)' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-primary, #0969da)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--accent-primary, #0969da)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
            <XAxis dataKey="shortLabel" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} allowDecimals={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="count"
              name="Earthquakes"
              stroke="var(--accent-primary, #0969da)"
              fill="url(#areaGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
            <XAxis dataKey="shortLabel" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} allowDecimals={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Bar dataKey="count" name="Earthquakes" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        );
    }
  };

  return (
    <div className="chart-visualizer-container" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

export default MagnitudeChartVisualizer;
