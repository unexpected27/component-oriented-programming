function WidgetCard({ title, description, headerActions, children, className = '' }) {
  return (
    <div className={`widget-card ${className}`.trim()}>
      {(title || description || headerActions) && (
        <div className="widget-header">
          <div>
            {title && <h3 className="widget-title">{title}</h3>}
            {description && <p className="widget-description">{description}</p>}
          </div>
          {headerActions && <div className="widget-header-actions">{headerActions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export default WidgetCard;
