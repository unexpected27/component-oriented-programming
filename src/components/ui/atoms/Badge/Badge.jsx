import './Badge.css';

function Badge({
  children,
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  className = '',
  title,
  ...props
}) {
  const classNames = [
    'ds-badge',
    `ds-badge-${variant}`,
    `ds-badge-${size}`,
    `ds-badge-${shape}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} title={title} {...props}>
      {children}
    </span>
  );
}

export default Badge;
