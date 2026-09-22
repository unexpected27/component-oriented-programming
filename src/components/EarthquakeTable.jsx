import { useState } from 'react';

/**
 * FilteredList / EarthquakeTable Component
 * Handles filtering by magnitude category and event drilldown details.
 * Props:
 * - events: array of earthquake objects from mockData
 * - depthUnit: 'km' | 'mi' (depth unit preference)
 */
function EarthquakeTable({ events = [], depthUnit = 'km' }) {
  const [category, setCategory] = useState('all');
  const [selectedEventId, setSelectedEventId] = useState(null);

  const filteredEvents = events.filter(event => {
    if (category === 'all') return true;
    if (category === 'weak') return event.magnitude < 3.5;
    if (category === 'light') return event.magnitude >= 3.5 && event.magnitude < 5.0;
    if (category === 'moderate') return event.magnitude >= 5.0 && event.magnitude < 6.5;
    if (category === 'strong') return event.magnitude >= 6.5;
    return true;
  });

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const formatDepth = (depthKm) => {
    if (depthUnit === 'mi') {
      return `${(depthKm * 0.621371).toFixed(1)} mi`;
    }
    return `${depthKm.toFixed(1)} km`;
  };

  const getMagBadge = (mag) => {
    if (mag >= 6.5) return <span className="badge badge-strong">M {mag.toFixed(1)}</span>;
    if (mag >= 5.0) return <span className="badge badge-moderate">M {mag.toFixed(1)}</span>;
    if (mag >= 3.5) return <span className="badge badge-light">M {mag.toFixed(1)}</span>;
    return <span className="badge badge-weak">M {mag.toFixed(1)}</span>;
  };

  return (
    <div className="widget-card">
      <div className="widget-header filter-header">
        <div>
          <h3 className="widget-title">Recent earthquake events</h3>
          <p className="widget-description">
            Interactive events table with category filtering and drilldown capability.
          </p>
        </div>

        <div className="filter-controls">
          <label htmlFor="category-select" className="filter-label">Category:</label>
          <select 
            id="category-select"
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All ({events.length})</option>
            <option value="weak">Weak (&lt; 3.5)</option>
            <option value="light">Light (3.5 – 4.9)</option>
            <option value="moderate">Moderate (5.0 – 6.4)</option>
            <option value="strong">Strong (6.5+)</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="events-table">
          <thead>
            <tr>
              <th>Magnitude</th>
              <th>Location</th>
              <th>Time (UTC)</th>
              <th>Depth</th>
              <th>Region</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr 
                  key={event.id}
                  className={`table-row ${selectedEventId === event.id ? 'row-selected' : ''}`}
                  onClick={() => setSelectedEventId(event.id)}
                >
                  <td>{getMagBadge(event.magnitude)}</td>
                  <td className="cell-place">{event.place}</td>
                  <td className="cell-time">{event.time}</td>
                  <td>{formatDepth(event.depth)}</td>
                  <td><span className="region-tag">{event.region}</span></td>
                  <td>
                    <button 
                      type="button"
                      className={`btn btn-secondary btn-sm ${selectedEventId === event.id ? 'btn-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEventId(selectedEventId === event.id ? null : event.id);
                      }}
                    >
                      {selectedEventId === event.id ? 'Hide' : 'Details'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No earthquakes found matching the selected category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <div className="drilldown-panel">
          <div className="drilldown-header">
            <h4>Event drilldown: {selectedEvent.place}</h4>
            <button 
              type="button" 
              className="btn-close-drilldown"
              onClick={() => setSelectedEventId(null)}
              aria-label="Close details"
            >
              ✕
            </button>
          </div>
          <div className="drilldown-grid">
            <div className="drilldown-item">
              <span className="drilldown-label">Coordinates</span>
              <span className="drilldown-value">
                {selectedEvent.coordinates.latitude.toFixed(2)}° N, {selectedEvent.coordinates.longitude.toFixed(2)}° E
              </span>
            </div>
            <div className="drilldown-item">
              <span className="drilldown-label">Hypocenter depth</span>
              <span className="drilldown-value">{formatDepth(selectedEvent.depth)}</span>
            </div>
            <div className="drilldown-item">
              <span className="drilldown-label">Geographic region</span>
              <span className="drilldown-value">{selectedEvent.region}</span>
            </div>
            <div className="drilldown-item">
              <span className="drilldown-label">Tsunami warning</span>
              <span className={`drilldown-value ${selectedEvent.tsunami ? 'tsunami-alert' : ''}`}>
                {selectedEvent.tsunami ? 'YES (High Risk)' : 'NO'}
              </span>
            </div>
            <div className="drilldown-item">
              <span className="drilldown-label">Felt reports</span>
              <span className="drilldown-value">{selectedEvent.felt} responses</span>
            </div>
            <div className="drilldown-item">
              <span className="drilldown-label">Processing status</span>
              <span className="drilldown-value status-badge-item">{selectedEvent.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EarthquakeTable;
