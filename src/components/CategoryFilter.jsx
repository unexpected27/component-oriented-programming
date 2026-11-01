/**
 * CategoryFilter Component
 * Controlled select input for selecting magnitude category.
 *
 * @param {Object} props
 * @param {string} props.value - Currently selected category
 * @param {(category: string) => void} props.onChange - Selection change handler
 * @param {number} props.totalCount - Total number of available events
 */
function CategoryFilter({ value, onChange, totalCount }) {
  return (
    <div className="filter-controls">
      <label htmlFor="category-select" className="filter-label">Category:</label>
      <select
        id="category-select"
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All ({totalCount})</option>
        <option value="weak">Weak (&lt; 3.5)</option>
        <option value="light">Light (3.5 – 4.9)</option>
        <option value="moderate">Moderate (5.0 – 6.4)</option>
        <option value="strong">Strong (6.5+)</option>
      </select>
    </div>
  );
}

export default CategoryFilter;
