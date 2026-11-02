import './Input.css';

function Input({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  isInvalid = false,
  size = 'md',
  onClear,
  className = '',
  autoComplete,
  ...props
}) {
  const showClear = Boolean(onClear && value && !disabled);

  const inputClasses = [
    'ds-input',
    `ds-input-${size}`,
    isInvalid ? 'ds-input-invalid' : '',
    showClear ? 'ds-input-with-clear' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="ds-input-wrapper">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        autoComplete={autoComplete}
        {...props}
      />
      {showClear && (
        <button
          type="button"
          className="ds-input-clear-btn"
          onClick={onClear}
          aria-label="Clear input value"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Input;
