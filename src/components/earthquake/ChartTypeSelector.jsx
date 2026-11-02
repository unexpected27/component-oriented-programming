import Toggle from '../ui/atoms/Toggle/Toggle';

const CHART_TYPES = [
  { value: 'bar', label: 'Bar', icon: '📊' },
  { value: 'line', label: 'Line', icon: '📈' },
  { value: 'area', label: 'Area', icon: '📉' }
];

function ChartTypeSelector({ chartType = 'bar', onTypeChange }) {
  return (
    <Toggle
      value={chartType}
      onChange={onTypeChange}
      options={CHART_TYPES}
      ariaLabel="Select visualization type"
      size="sm"
    />
  );
}

export default ChartTypeSelector;
