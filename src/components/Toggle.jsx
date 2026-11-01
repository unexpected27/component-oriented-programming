/**
 * Toggle / SegmentedControl Component
 * Reusable controlled component for switching between discrete modes or values.
 * Follows Single Responsibility Principle and controlled input contract.
 *
 * @param {Object} props
 * @param {string} [props.label] - Label for the setting
 * @param {Array<{value: string, label: string}>} props.options - Available toggle choices
 * @param {string} props.value - Currently selected value
 * @param {(value: string) => void} props.onChange - Selection change callback
 * @param {string} [props.ariaLabel] - Accessibility label for radiogroup
 */
function Toggle({ label, options = [], value, onChange, ariaLabel }) {
  return (
    <div className="setting-group">
      {label && <span className="setting-label">{label}</span>}
      <div 
        className="segmented-control" 
        role="radiogroup" 
        aria-label={ariaLabel || label || 'Toggle selection'}
      >
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`segmented-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (!isActive && onChange) {
                  onChange(option.value);
                }
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Toggle;
