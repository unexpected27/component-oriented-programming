/**
 * WidgetCard Container Component
 * Demonstrates component composition via `children`.
 * Encapsulates standard card structure, header, title, description, and action slots.
 *
 * @param {Object} props
 * @param {string} props.title - Card header title
 * @param {string} [props.description] - Subtitle or explanation
 * @param {React.ReactNode} [props.headerActions] - Optional control/actions slot in header
 * @param {React.ReactNode} props.children - Child elements rendered inside card body
 * @param {string} [props.className] - Additional CSS class names
 */
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
