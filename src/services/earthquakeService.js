const USGS_FEED_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export async function fetchEarthquakes(url = USGS_FEED_URL) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch seismic events (${response.status}: ${response.statusText})`);
  }
  const data = await response.json();
  if (!data || !Array.isArray(data.features)) {
    throw new Error('Received malformed GeoJSON payload from USGS API');
  }
  return data.features.map(normalizeFeature);
}

export function normalizeFeature(feature) {
  const properties = feature.properties || {};
  const geometry = feature.geometry || {};
  const coords = Array.isArray(geometry.coordinates) ? geometry.coordinates : [0, 0, 0];
  const place = properties.place || 'Unknown Location';

  return {
    id: feature.id || String(Math.random()),
    place,
    region: extractRegion(place),
    magnitude: typeof properties.mag === 'number' ? properties.mag : 0,
    time: properties.time || Date.now(),
    formattedTime: formatUtcTime(properties.time),
    depth: typeof coords[2] === 'number' ? coords[2] : 0,
    coordinates: {
      longitude: coords[0] || 0,
      latitude: coords[1] || 0
    },
    significance: properties.sig || 0,
    tsunami: properties.tsunami || 0,
    status: properties.status || 'unknown',
    felt: properties.felt || 0,
    alert: properties.alert || null,
    usgsUrl: properties.url || `https://earthquake.usgs.gov/earthquakes/eventpage/${feature.id}`
  };
}

function extractRegion(place) {
  if (!place || typeof place !== 'string') return 'Global';
  const parts = place.split(',');
  if (parts.length > 1) {
    return parts[parts.length - 1].trim();
  }
  return place.trim();
}

function formatUtcTime(timestamp) {
  if (!timestamp) return 'Unknown';
  const d = new Date(timestamp);
  return d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}
