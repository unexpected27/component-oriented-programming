import './Select.css';

function Select({
  id,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  isInvalid = false,
  size = 'md',
  className = '',
  ...props
}) {
  const selectClasses = [
    'ds-select',
    `ds-select-${size}`,
    isInvalid ? 'ds-select-invalid' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="ds-select-wrapper">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClasses}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
