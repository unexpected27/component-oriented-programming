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
