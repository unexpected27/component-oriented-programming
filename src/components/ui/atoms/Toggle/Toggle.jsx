import './Toggle.css';

function Toggle({
  value,
  onChange,
  options = [],
  label,
  size = 'md',
  disabled = false,
  ariaLabel,
  className = ''
}) {
  return (
    <div className={`ds-toggle-wrapper ds-toggle-${size} ${className}`.trim()}>
      {label && <span className="ds-toggle-label">{label}</span>}
      <div
        className="ds-toggle-group"
        role="radiogroup"
        aria-label={ariaLabel || label || 'Toggle group'}
      >
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled || option.disabled}
              className={`ds-toggle-item ${isSelected ? 'ds-toggle-item-selected' : ''}`}
              onClick={() => onChange && onChange(option.value)}
            >
              {option.icon && <span aria-hidden="true">{option.icon}</span>}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Toggle;
