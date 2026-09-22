/**
 * MagnitudeChart Component
 * Redesigned clean card showing earthquake distribution by magnitude.
 * Uses thin (~8px) progress bars with labels placed outside.
 */
function MagnitudeChart({ events = [] }) {
  const brackets = [
    { label: 'Weak (< 3.5)', min: 0, max: 3.5, color: 'var(--color-weak, #0969da)' },
    { label: 'Light (3.5 - 4.9)', min: 3.5, max: 5.0, color: 'var(--color-light, #d97706)' },
    { label: 'Moderate (5.0 - 6.4)', min: 5.0, max: 6.5, color: 'var(--color-moderate, #c2410c)' },
    { label: 'Strong (6.5+)', min: 6.5, max: 10.0, color: 'var(--color-strong, #cf222e)' }
  ];

  const totalEvents = events.length || 1;

  const bracketCounts = brackets.map(b => {
    const count = events.filter(e => e.magnitude >= b.min && e.magnitude < b.max).length;
    const percentage = Math.round((count / totalEvents) * 100);
    return {
      ...b,
      count,
      percentage
    };
  });

  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3 className="widget-title">Earthquake distribution by magnitude</h3>
      </div>
      <p className="widget-description">
        Breakdown of recorded seismic activity by intensity levels.
      </p>

      <div className="distribution-list">
        {bracketCounts.map(b => (
          <div key={b.label} className="distribution-item">
            <div className="distribution-info">
              <span className="distribution-category">{b.label}</span>
              <span className="distribution-meta">
                {b.count} {b.count === 1 ? 'event' : 'events'} · {b.percentage}%
              </span>
            </div>
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill"
                style={{ 
                  width: `${b.percentage}%`,
                  backgroundColor: b.color 
                }}
                role="progressbar"
                aria-valuenow={b.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MagnitudeChart;
