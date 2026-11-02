import './Card.css';

function Card({
  title,
  description,
  headerActions,
  footer,
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}) {
  const cardClasses = [
    'ds-card',
    `ds-card-${variant}`,
    `ds-card-padding-${padding}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const hasHeader = Boolean(title || description || headerActions);

  return (
    <div className={cardClasses} {...props}>
      {hasHeader && (
        <div className="ds-card-header">
          {(title || description) && (
            <div className="ds-card-title-group">
              {title && <h3 className="ds-card-title">{title}</h3>}
              {description && <p className="ds-card-description">{description}</p>}
            </div>
          )}
          {headerActions && <div className="ds-card-header-actions">{headerActions}</div>}
        </div>
      )}
      {children && <div className="ds-card-body">{children}</div>}
      {footer && <div className="ds-card-footer">{footer}</div>}
    </div>
  );
}

export default Card;
