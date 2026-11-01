import MagnitudeBadge from './MagnitudeBadge';

/**
 * EarthquakeRow Component
 * Presentational table row component for a single earthquake event.
 *
 * @param {Object} props
 * @param {Object} props.event - Earthquake event data object
 * @param {string} props.depthUnit - 'km' or 'mi'
 * @param {boolean} props.isSelected - Whether this row is currently selected
 * @param {() => void} props.onToggleSelect - Handler for selecting/toggling row
 */
function EarthquakeRow({ event, depthUnit, isSelected, onToggleSelect }) {
  const formatDepth = (depthKm) => {
    if (depthUnit === 'mi') {
      return `${(depthKm * 0.621371).toFixed(1)} mi`;
    }
    return `${depthKm.toFixed(1)} km`;
  };

  return (
    <tr
      className={`table-row ${isSelected ? 'row-selected' : ''}`}
      onClick={onToggleSelect}
    >
      <td>
        <MagnitudeBadge magnitude={event.magnitude} />
      </td>
      <td className="cell-place">{event.place}</td>
      <td className="cell-time">{event.time}</td>
      <td>{formatDepth(event.depth)}</td>
      <td>
        <span className="region-tag">{event.region}</span>
      </td>
      <td>
        <button
          type="button"
          className={`btn btn-secondary btn-sm ${isSelected ? 'btn-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect();
          }}
        >
          {isSelected ? 'Hide' : 'Details'}
        </button>
      </td>
    </tr>
  );
}

export default EarthquakeRow;
