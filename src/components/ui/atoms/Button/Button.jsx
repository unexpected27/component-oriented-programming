import './Button.css';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  isActive = false,
  fullWidth = false,
  onClick,
  className = '',
  title,
  ariaLabel,
  ...props
}) {
  const classNames = [
    'ds-button',
    `ds-button-${variant}`,
    `ds-button-${size}`,
    isActive ? 'ds-button-active' : '',
    fullWidth ? 'ds-button-full-width' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
