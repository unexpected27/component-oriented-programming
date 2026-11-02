function EventDrilldown({ event, depthUnit, onClose }) {
  if (!event) return null;

  const formatDepth = (depthKm) => {
    if (depthUnit === 'mi') {
      return `${(depthKm * 0.621371).toFixed(1)} mi`;
    }
    return `${depthKm.toFixed(1)} km`;
  };

  return (
    <div className="drilldown-panel">
      <div className="drilldown-header">
        <h4>Event drilldown: {event.place}</h4>
        <button
          type="button"
          className="btn-close-drilldown"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>
      </div>
      <div className="drilldown-grid">
        <div className="drilldown-item">
          <span className="drilldown-label">Coordinates</span>
          <span className="drilldown-value">
            {event.coordinates.latitude.toFixed(3)}° N, {event.coordinates.longitude.toFixed(3)}° E
          </span>
        </div>
        <div className="drilldown-item">
          <span className="drilldown-label">Hypocenter depth</span>
          <span className="drilldown-value">{formatDepth(event.depth)}</span>
        </div>
        <div className="drilldown-item">
          <span className="drilldown-label">Geographic region</span>
          <span className="drilldown-value">{event.region}</span>
        </div>
        <div className="drilldown-item">
          <span className="drilldown-label">Significance rating</span>
          <span className="drilldown-value">{event.significance} / 1000</span>
        </div>
        <div className="drilldown-item">
          <span className="drilldown-label">Tsunami alert</span>
          <span className={`drilldown-value ${event.tsunami ? 'tsunami-alert' : ''}`}>
            {event.tsunami ? 'YES (High Risk)' : 'NO'}
          </span>
        </div>
        <div className="drilldown-item">
          <span className="drilldown-label">Felt reports</span>
          <span className="drilldown-value">{event.felt.toLocaleString()} responses</span>
        </div>
        <div className="drilldown-item">
          <span className="drilldown-label">Processing status</span>
          <span className="drilldown-value status-badge-item">{event.status}</span>
        </div>
        <div className="drilldown-item">
          <span className="drilldown-label">Official USGS Page</span>
          <a
            href={event.usgsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="drilldown-link"
          >
            Open event report ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventDrilldown;
