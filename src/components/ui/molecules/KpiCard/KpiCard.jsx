import Card from '../../atoms/Card/Card';
import './KpiCard.css';

function KpiCard({
  title,
  value,
  change,
  isPositive = true,
  description,
  className = ''
}) {
  return (
    <Card className={`ds-kpi-card ${className}`.trim()} padding="md">
      <div className="ds-kpi-title">{title}</div>
      <div className="ds-kpi-body">
        <div className="ds-kpi-value">{value}</div>
        {change && (
          <div className={`ds-kpi-change ${isPositive ? 'ds-kpi-change-positive' : 'ds-kpi-change-negative'}`}>
            <span aria-hidden="true">{isPositive ? '↑' : '↓'}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
      {description && <div className="ds-kpi-description">{description}</div>}
    </Card>
  );
}

export default KpiCard;
