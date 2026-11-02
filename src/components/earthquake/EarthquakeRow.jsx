import { useNavigate, Link } from 'react-router';
import MagnitudeBadge from '../ui/MagnitudeBadge';

function EarthquakeRow({ event, depthUnit = 'km' }) {
  const navigate = useNavigate();

  const formatDepth = (depthKm) => {
    if (depthUnit === 'mi') {
      return `${(depthKm * 0.621371).toFixed(1)} mi`;
    }
    return `${depthKm.toFixed(1)} km`;
  };

  const handleRowClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <tr
      className="table-row table-row-clickable"
      onClick={handleRowClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRowClick();
        }
      }}
      role="link"
      aria-label={`View details for earthquake at ${event.place}`}
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
        <Link
          to={`/event/${event.id}`}
          className="btn btn-secondary btn-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Details ↗
        </Link>
      </td>
    </tr>
  );
}

export default EarthquakeRow;
