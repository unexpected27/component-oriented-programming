import './Spinner.css';

function Spinner({
  size = 'md',
  label = 'Loading...',
  className = '',
  ...props
}) {
  const spinnerClasses = [
    'ds-spinner',
    `ds-spinner-${size}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div role="status" aria-label={label} className="ds-spinner-container" {...props}>
      <span className={spinnerClasses} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Spinner;
