// Mock data for USGS Earthquakes dashboard
export const mockEarthquakes = [
  {
    id: 'us7000m1a1',
    place: '14 km SW of Searles Valley, California',
    magnitude: 6.4,
    time: '2026-09-22 18:45:12 UTC',
    depth: 10.5,
    coordinates: { latitude: 35.71, longitude: -117.43 },
    region: 'North America',
    tsunami: 1,
    status: 'reviewed',
    felt: 1420
  },
  {
    id: 'us7000m1a2',
    place: '48 km ENE of Sendai, Japan',
    magnitude: 7.2,
    time: '2026-09-22 16:12:05 UTC',
    depth: 42.0,
    coordinates: { latitude: 38.32, longitude: 141.45 },
    region: 'Asia-Pacific',
    tsunami: 1,
    status: 'reviewed',
    felt: 5230
  },
  {
    id: 'us7000m1a3',
    place: '12 km N of Kahramanmaraş, Turkey',
    magnitude: 5.8,
    time: '2026-09-22 14:02:40 UTC',
    depth: 8.2,
    coordinates: { latitude: 37.58, longitude: 36.93 },
    region: 'Europe & Mediterranean',
    tsunami: 0,
    status: 'reviewed',
    felt: 890
  },
  {
    id: 'us7000m1a4',
    place: '85 km WNW of Anchorage, Alaska',
    magnitude: 3.9,
    time: '2026-09-22 11:20:18 UTC',
    depth: 115.8,
    coordinates: { latitude: 61.21, longitude: -150.88 },
    region: 'North America',
    tsunami: 0,
    status: 'automatic',
    felt: 45
  },
  {
    id: 'us7000m1a5',
    place: '32 km S of Ovalle, Chile',
    magnitude: 6.1,
    time: '2026-09-22 09:55:00 UTC',
    depth: 54.0,
    coordinates: { latitude: -30.86, longitude: -71.20 },
    region: 'South America',
    tsunami: 0,
    status: 'reviewed',
    felt: 1100
  },
  {
    id: 'us7000m1a6',
    place: '5 km ENE of Ridgecrest, California',
    magnitude: 2.7,
    time: '2026-09-22 08:14:33 UTC',
    depth: 7.1,
    coordinates: { latitude: 35.63, longitude: -117.61 },
    region: 'North America',
    tsunami: 0,
    status: 'automatic',
    felt: 12
  },
  {
    id: 'us7000m1a7',
    place: '102 km SE of Hihifo, Tonga',
    magnitude: 5.2,
    time: '2026-09-22 06:40:22 UTC',
    depth: 180.0,
    coordinates: { latitude: -16.52, longitude: -173.10 },
    region: 'Asia-Pacific',
    tsunami: 0,
    status: 'reviewed',
    felt: 0
  },
  {
    id: 'us7000m1a8',
    place: '18 km W of Heraklion, Greece',
    magnitude: 4.3,
    time: '2026-09-22 04:15:10 UTC',
    depth: 15.3,
    coordinates: { latitude: 35.33, longitude: 24.93 },
    region: 'Europe & Mediterranean',
    tsunami: 0,
    status: 'reviewed',
    felt: 210
  },
  {
    id: 'us7000m1a9',
    place: '7 km SSW of Volcano, Hawaii',
    magnitude: 3.1,
    time: '2026-09-22 02:08:44 UTC',
    depth: 2.4,
    coordinates: { latitude: 19.38, longitude: -155.25 },
    region: 'North America',
    tsunami: 0,
    status: 'automatic',
    felt: 85
  },
  {
    id: 'us7000m1b0',
    place: '50 km N of Florence, Italy',
    magnitude: 4.7,
    time: '2026-09-22 01:02:15 UTC',
    depth: 10.0,
    coordinates: { latitude: 44.20, longitude: 11.25 },
    region: 'Europe & Mediterranean',
    tsunami: 0,
    status: 'reviewed',
    felt: 640
  }
];

export const mockKpiData = {
  totalCount: mockEarthquakes.length,
  totalChange: '+12.5%',
  maxMagnitude: Math.max(...mockEarthquakes.map(e => e.magnitude)).toFixed(1),
  magChange: '+0.4',
  avgDepth: (mockEarthquakes.reduce((acc, e) => acc + e.depth, 0) / mockEarthquakes.length).toFixed(1),
  depthChange: '-2.1 км'
};
