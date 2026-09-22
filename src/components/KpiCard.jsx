/**
 * Reusable KPI Card Component
 * Receives title, value, change, isPositive, and description via props.
 */
function KpiCard({ title, value, change, isPositive = true, description }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
      </div>
      <div className="kpi-body">
        <div className="kpi-value">{value}</div>
        {change && (
          <div className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
            <span className="kpi-arrow">{isPositive ? '↑' : '↓'}</span> {change}
          </div>
        )}
      </div>
      {description && <div className="kpi-description">{description}</div>}
    </div>
  );
}

export default KpiCard;
