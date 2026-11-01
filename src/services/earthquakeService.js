const USGS_FEED_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
const USGS_QUERY_BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
const USGS_DETAIL_BASE_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail';

export function buildEarthquakeQueryUrl({
  limit = 50,
  minMagnitude = 0,
  orderBy = 'time'
} = {}) {
  const params = new URLSearchParams();
  params.set('format', 'geojson');

  const parsedLimit = Number(limit);
  if (parsedLimit > 0) {
    params.set('limit', String(parsedLimit));
  }

  const parsedMinMag = Number(minMagnitude);
  if (parsedMinMag > 0) {
    params.set('minmagnitude', String(parsedMinMag));
  }

  if (orderBy) {
    params.set('orderby', orderBy);
  }

  return `${USGS_QUERY_BASE_URL}?${params.toString()}`;
}

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

export async function fetchEarthquakeById(id) {
  if (!id) {
    const error = new Error('Earthquake event ID is missing.');
    error.status = 400;
    throw error;
  }

  const detailUrl = `${USGS_DETAIL_BASE_URL}/${encodeURIComponent(id)}.geojson`;
  const response = await fetch(detailUrl);

  if (response.status === 404) {
    const queryUrl = `${USGS_QUERY_BASE_URL}?eventid=${encodeURIComponent(id)}&format=geojson`;
    const fallbackResponse = await fetch(queryUrl);
    if (!fallbackResponse.ok) {
      const error = new Error(`Earthquake event "${id}" was not found.`);
      error.status = 404;
      throw error;
    }
    const fallbackData = await fallbackResponse.json();
    return normalizeDetailFeature(fallbackData);
  }

  if (!response.ok) {
    const error = new Error(`Failed to load event details (${response.status}: ${response.statusText})`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return normalizeDetailFeature(data);
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

export function normalizeDetailFeature(feature) {
  const properties = feature.properties || {};
  const geometry = feature.geometry || {};
  const coords = Array.isArray(geometry.coordinates) ? geometry.coordinates : [0, 0, 0];
  const place = properties.place || 'Unknown Location';

  return {
    id: feature.id || properties.code || 'unknown',
    place,
    region: extractRegion(place),
    magnitude: typeof properties.mag === 'number' ? properties.mag : 0,
    magType: properties.magType || 'N/A',
    type: properties.type || 'earthquake',
    title: properties.title || place,
    time: properties.time || Date.now(),
    formattedTime: formatUtcTime(properties.time),
    updated: properties.updated || null,
    formattedUpdated: formatUtcTime(properties.updated),
    tz: properties.tz,
    depth: typeof coords[2] === 'number' ? coords[2] : 0,
    coordinates: {
      longitude: coords[0] || 0,
      latitude: coords[1] || 0
    },
    significance: properties.sig || 0,
    tsunami: properties.tsunami || 0,
    status: properties.status || 'unknown',
    felt: properties.felt || 0,
    cdi: properties.cdi != null ? properties.cdi : null,
    mmi: properties.mmi != null ? properties.mmi : null,
    alert: properties.alert || null,
    net: properties.net || 'N/A',
    code: properties.code || feature.id || 'N/A',
    ids: properties.ids || '',
    sources: properties.sources || 'N/A',
    nst: properties.nst != null ? properties.nst : null,
    dmin: properties.dmin != null ? properties.dmin : null,
    rms: properties.rms != null ? properties.rms : null,
    gap: properties.gap != null ? properties.gap : null,
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
