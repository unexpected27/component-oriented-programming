import { useState } from 'react';
import WidgetCard from './WidgetCard';
import CategoryFilter from './CategoryFilter';
import EarthquakeRow from './EarthquakeRow';
import EventDrilldown from './EventDrilldown';

/**
 * FilteredList Widget Component
 * Implements the lab requirement for "Міні-список із фільтром (Filtered List)".
 * Manages category filter state, event drilldown state, and applies minMagnitude threshold.
 *
 * @param {Object} props
 * @param {Array} props.events - Array of earthquake event objects
 * @param {string} [props.depthUnit='km'] - Depth display unit ('km' | 'mi')
 * @param {number} [props.minMagnitude] - Minimum magnitude threshold from Counter widget
 */
function FilteredList({ events = [], depthUnit = 'km', minMagnitude = 1.0 }) {
  const [category, setCategory] = useState('all');
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Filter events by both category and the magnitude threshold from the counter
  const filteredEvents = events.filter((event) => {
    // Magnitude threshold filter (connected to Counter widget via lifted state)
    if (minMagnitude && event.magnitude < minMagnitude) {
      return false;
    }

    // Category filter
    if (category === 'weak') return event.magnitude < 3.5;
    if (category === 'light') return event.magnitude >= 3.5 && event.magnitude < 5.0;
    if (category === 'moderate') return event.magnitude >= 5.0 && event.magnitude < 6.5;
    if (category === 'strong') return event.magnitude >= 6.5;
    return true;
  });

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  const toggleSelect = (id) => {
    setSelectedEventId((prev) => (prev === id ? null : id));
  };

  const headerFilter = (
    <CategoryFilter
      value={category}
      onChange={setCategory}
      totalCount={events.length}
    />
  );

  return (
    <WidgetCard
      title="Recent earthquake events"
      description={`Interactive events list with category filtering and drilldown (min M ${minMagnitude.toFixed(1)}).`}
      headerActions={headerFilter}
    >
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
                <EarthquakeRow
                  key={event.id}
                  event={event}
                  depthUnit={depthUnit}
                  isSelected={selectedEventId === event.id}
                  onToggleSelect={() => toggleSelect(event.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No earthquakes found matching the selected category (≥ M {minMagnitude.toFixed(1)}).
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EventDrilldown
        event={selectedEvent}
        depthUnit={depthUnit}
        onClose={() => setSelectedEventId(null)}
      />
    </WidgetCard>
  );
}

export default FilteredList;
