import Select from '../ui/atoms/Select/Select';

function CategoryFilter({ value, onChange, totalCount }) {
  const options = [
    { value: 'all', label: `All (${totalCount})` },
    { value: 'weak', label: 'Weak (< 3.5)' },
    { value: 'light', label: 'Light (3.5 – 4.9)' },
    { value: 'moderate', label: 'Moderate (5.0 – 6.4)' },
    { value: 'strong', label: 'Strong (6.5+)' }
  ];

  return (
    <div className="filter-controls">
      <label htmlFor="category-select" className="filter-label">Category:</label>
      <Select
        id="category-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        size="sm"
      />
    </div>
  );
}

export default CategoryFilter;
