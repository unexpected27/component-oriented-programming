import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import MagnitudeBadge from '../components/ui/MagnitudeBadge';
import Badge from '../components/ui/atoms/Badge/Badge';
import Button from '../components/ui/atoms/Button/Button';
import Card from '../components/ui/atoms/Card/Card';
import Toggle from '../components/ui/atoms/Toggle/Toggle';
import LoadingState from '../components/ui/molecules/LoadingState/LoadingState';
import ErrorState from '../components/ui/molecules/ErrorState/ErrorState';
import useFetch from '../hooks/useFetch';
import useFavorites from '../hooks/useFavorites';
import { normalizeDetailFeature } from '../services/earthquakeService';

function EventDetailsPage() {
  const { id } = useParams();
  const [depthUnit, setDepthUnit] = useState('km');
  const { isFavorite, toggleFavorite } = useFavorites();

  const detailUrl = useMemo(() => {
    return id ? `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${encodeURIComponent(id)}.geojson` : null;
  }, [id]);

  const { data, loading, error, refetch } = useFetch(detailUrl);

  const event = useMemo(() => {
    if (!data) return null;
    return normalizeDetailFeature(data);
  }, [data]);

  const isFav = event ? isFavorite(event.id) : false;

  const formatDepth = (depthKm) => {
    if (depthUnit === 'mi') {
      return `${(depthKm * 0.621371).toFixed(2)} mi`;
    }
    return `${depthKm.toFixed(2)} km`;
  };

  if (loading) {
    return (
      <div className="details-page-wrapper">
        <div className="details-nav-bar">
          <Link to="/" className="ds-button ds-button-secondary ds-button-sm">
            ← Back to Dashboard
          </Link>
        </div>
        <Card title="Loading event details...">
          <LoadingState message="Querying USGS event repository..." />
        </Card>
      </div>
    );
  }

  if (error || !id) {
    const isNotFound = !id || (typeof error === 'string' && error.includes('404')) || (error && error.status === 404);

    return (
      <div className="details-page-wrapper">
        <div className="details-nav-bar">
          <Link to="/" className="ds-button ds-button-secondary ds-button-sm">
            ← Back to Dashboard
          </Link>
        </div>

        {isNotFound ? (
          <div className="not-found-card">
            <div className="not-found-icon" aria-hidden="true">⚠️</div>
            <h2 className="not-found-title">Earthquake Event Not Found</h2>
            <p className="not-found-message">
              No seismic event matching ID <code>{id}</code> exists in the USGS database. It may have been a temporary test record, an unconfirmed tremor, or the ID was mistyped.
            </p>
            <div className="not-found-actions">
              <Link to="/" className="ds-button ds-button-primary ds-button-md">
                Return to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <Card title="Error loading event">
            <ErrorState error={error} onRetry={refetch} />
          </Card>
        )}
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const mapUrl = `https://www.google.com/maps?q=${event.coordinates.latitude},${event.coordinates.longitude}`;

  return (
    <div className="details-page-wrapper">
      <div className="details-nav-bar">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Dashboard</Link>
          <span className="breadcrumb-separator" aria-hidden="true">/</span>
          <span className="breadcrumb-current">Event {event.id}</span>
        </nav>
        <Link to="/" className="ds-button ds-button-secondary ds-button-sm">
          ← Back to Dashboard
        </Link>
      </div>

      <header className="details-hero-card">
        <div className="details-hero-top">
          <div className="details-title-group">
            <div className="details-badge-row">
              <MagnitudeBadge magnitude={event.magnitude} />
              <Badge variant="neutral" size="sm">{event.type.toUpperCase()}</Badge>
              <Badge variant={event.status === 'reviewed' ? 'primary' : 'neutral'} size="sm">
                {event.status.toUpperCase()}
              </Badge>
              {event.alert && (
                <Badge variant="warning" size="sm">
                  ALERT {event.alert.toUpperCase()}
                </Badge>
              )}
              {event.tsunami === 1 && (
                <Badge variant="danger" size="sm">
                  TSUNAMI WARNING
                </Badge>
              )}
            </div>
            <h1 className="details-hero-title">{event.place}</h1>
            <p className="details-hero-subtitle">
              Recorded at {event.formattedTime} • Region: {event.region}
            </p>
          </div>

          <div className="details-hero-controls">
            <Button
              variant={isFav ? 'primary' : 'secondary'}
              size="md"
              onClick={() => toggleFavorite(event.id)}
              ariaLabel={isFav ? 'Remove from favorites' : 'Add to favorites'}
              title={isFav ? 'Remove from favorites' : 'Save to favorites'}
            >
              <span className="fav-star-icon" aria-hidden="true">{isFav ? '★' : '☆'}</span>
              <span>{isFav ? 'Favorited' : 'Add to favorites'}</span>
            </Button>
            <Toggle
              label="Depth unit"
              ariaLabel="Select depth unit"
              value={depthUnit}
              onChange={setDepthUnit}
              options={[
                { value: 'km', label: 'Kilometers' },
                { value: 'mi', label: 'Miles' }
              ]}
            />
          </div>
        </div>
      </header>

      <div className="details-grid-layout">
        <Card
          title="Geographical epicenter"
          description="Spatial location, coordinates, hypocenter depth, and satellite positioning."
        >
          <div className="details-metrics-list">
            <div className="details-metric-item">
              <span className="metric-label">Latitude</span>
              <span className="metric-val">{event.coordinates.latitude.toFixed(4)}° N</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Longitude</span>
              <span className="metric-val">{event.coordinates.longitude.toFixed(4)}° E</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Hypocenter depth</span>
              <span className="metric-val">{formatDepth(event.depth)}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Region</span>
              <span className="metric-val">{event.region}</span>
            </div>
            <div className="details-metric-item details-metric-full">
              <span className="metric-label">Map navigation</span>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="details-action-link"
              >
                Open epicenter coordinates in Google Maps ↗
              </a>
            </div>
          </div>
        </Card>

        <Card
          title="Seismic wave mechanics"
          description="Calculated wave parameters, seismic station coverage, and estimation precision."
        >
          <div className="details-metrics-list">
            <div className="details-metric-item">
              <span className="metric-label">Magnitude scale</span>
              <span className="metric-val">{event.magType ? event.magType.toUpperCase() : 'N/A'}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Reporting stations (nst)</span>
              <span className="metric-val">{event.nst != null ? `${event.nst} stations` : 'Not reported'}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Azimuthal gap</span>
              <span className="metric-val">{event.gap != null ? `${event.gap}°` : 'N/A'}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Nearest station (dmin)</span>
              <span className="metric-val">{event.dmin != null ? `${event.dmin}°` : 'N/A'}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">RMS residual</span>
              <span className="metric-val">{event.rms != null ? `${event.rms} s` : 'N/A'}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Event category</span>
              <span className="metric-val">{event.type}</span>
            </div>
          </div>
        </Card>

        <Card
          title="Impact & community reports"
          description="Observed ground shaking, community responses, and intensity ratings."
        >
          <div className="details-metrics-list">
            <div className="details-metric-item">
              <span className="metric-label">Significance rating</span>
              <span className="metric-val">{event.significance} / 1000</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Did you feel it?</span>
              <span className="metric-val">{event.felt > 0 ? `${event.felt.toLocaleString()} reports` : 'None reported'}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Community intensity (CDI)</span>
              <span className="metric-val">{event.cdi != null ? `${event.cdi} / 10` : 'N/A'}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Mercalli intensity (MMI)</span>
              <span className="metric-val">{event.mmi != null ? `${event.mmi} / 10` : 'N/A'}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Tsunami threat</span>
              <span className={`metric-val ${event.tsunami ? 'tsunami-alert' : ''}`}>
                {event.tsunami ? 'High risk flagged' : 'No tsunami warning'}
              </span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">PAGER alert level</span>
              <span className="metric-val">{event.alert ? event.alert.toUpperCase() : 'None'}</span>
            </div>
          </div>
        </Card>

        <Card
          title="Data source & audit"
          description="USGS network identification, verification pipeline, and timestamps."
        >
          <div className="details-metrics-list">
            <div className="details-metric-item">
              <span className="metric-label">Network code</span>
              <span className="metric-val">{event.net}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Event code</span>
              <span className="metric-val">{event.code}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Data sources</span>
              <span className="metric-val">{event.sources}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Processing pipeline</span>
              <span className="metric-val">{event.status}</span>
            </div>
            <div className="details-metric-item">
              <span className="metric-label">Updated timestamp</span>
              <span className="metric-val">{event.formattedUpdated}</span>
            </div>
            <div className="details-metric-item details-metric-full">
              <span className="metric-label">USGS official repository</span>
              <a
                href={event.usgsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="details-action-link"
              >
                Open official USGS earthquake summary page ↗
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default EventDetailsPage;
