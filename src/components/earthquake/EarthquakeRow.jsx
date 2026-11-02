import { useNavigate, Link } from 'react-router';
import MagnitudeBadge from '../ui/MagnitudeBadge';
import Badge from '../ui/atoms/Badge/Badge';
import useFavorites from '../../hooks/useFavorites';

function EarthquakeRow({ event, depthUnit = 'km' }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(event.id);

  const formatDepth = (depthKm) => {
    if (depthUnit === 'mi') {
      return `${(depthKm * 0.621371).toFixed(1)} mi`;
    }
    return `${depthKm.toFixed(1)} km`;
  };

  const handleRowClick = () => {
    navigate(`/event/${event.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(event.id);
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
      <td className="cell-favorite">
        <button
          type="button"
          className={`btn-favorite ${isFav ? 'is-favorite' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFav ? `Remove ${event.place} from favorites` : `Add ${event.place} to favorites`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span aria-hidden="true">{isFav ? '★' : '☆'}</span>
        </button>
      </td>
      <td>
        <MagnitudeBadge magnitude={event.magnitude} />
      </td>
      <td className="cell-place">{event.place}</td>
      <td className="cell-time">{event.formattedTime || event.time}</td>
      <td>{formatDepth(event.depth)}</td>
      <td>
        <Badge variant="neutral" size="sm">
          {event.region}
        </Badge>
      </td>
      <td>
        <Badge
          variant={event.significance > 500 ? 'danger' : 'neutral'}
          size="sm"
          title={`Significance score: ${event.significance}`}
        >
          Sig {event.significance}
        </Badge>
      </td>
      <td>
        <Link
          to={`/event/${event.id}`}
          className="ds-button ds-button-secondary ds-button-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Details ↗
        </Link>
      </td>
    </tr>
  );
}

export default EarthquakeRow;
