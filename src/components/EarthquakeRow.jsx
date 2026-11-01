import MagnitudeBadge from './MagnitudeBadge';

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
      <td className="cell-time">{event.formattedTime || event.time}</td>
      <td>{formatDepth(event.depth)}</td>
      <td>
        <span className="region-tag">{event.region}</span>
      </td>
      <td>
        <span className="significance-tag" title={`Significance score: ${event.significance}`}>
          Sig {event.significance}
        </span>
      </td>
      <td>
        <button
          type="button"
          className={`btn btn-secondary btn-sm ${isSelected ? 'btn-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect();
          }}
          aria-expanded={isSelected}
        >
          {isSelected ? 'Hide' : 'Details'}
        </button>
      </td>
    </tr>
  );
}

export default EarthquakeRow;
