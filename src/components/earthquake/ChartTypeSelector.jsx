const CHART_TYPES = [
  { id: 'bar', label: 'Bar', icon: '📊' },
  { id: 'line', label: 'Line', icon: '📈' },
  { id: 'area', label: 'Area', icon: '📉' }
];

function ChartTypeSelector({ chartType = 'bar', onTypeChange }) {
  return (
    <div className="chart-type-selector" role="radiogroup" aria-label="Select visualization type">
      {CHART_TYPES.map((type) => {
        const isSelected = chartType === type.id;
        return (
          <button
            key={type.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`chart-type-btn ${isSelected ? 'active' : ''}`}
            onClick={() => onTypeChange(type.id)}
            title={`Switch to ${type.label} visualization`}
          >
            <span className="chart-type-icon" aria-hidden="true">{type.icon}</span>
            <span className="chart-type-label">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ChartTypeSelector;
