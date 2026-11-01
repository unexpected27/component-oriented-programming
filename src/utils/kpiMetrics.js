export function calculateKpis(events = [], depthUnit = 'km') {
  const total = events.length;

  if (total === 0) {
    return [
      {
        id: 'kpi-total',
        title: 'Total earthquakes',
        value: '0',
        change: '0.0%',
        isPositive: true,
        description: 'Past 24 hours (USGS feed)'
      },
      {
        id: 'kpi-max-mag',
        title: 'Maximum magnitude',
        value: '0.0',
        change: '0.0%',
        isPositive: true,
        description: 'Peak magnitude recorded'
      },
      {
        id: 'kpi-avg-depth',
        title: 'Average depth',
        value: depthUnit === 'mi' ? '0.0 mi' : '0.0 km',
        change: '0.0%',
        isPositive: true,
        description: 'Mean hypocenter depth'
      },
      {
        id: 'kpi-significant',
        title: 'Significant events',
        value: '0',
        change: '0.0%',
        isPositive: true,
        description: 'Events with M >= 4.5 or Sig > 100'
      }
    ];
  }

  const maxMag = Math.max(...events.map((e) => e.magnitude));
  const avgDepthKm = events.reduce((acc, e) => acc + e.depth, 0) / total;
  const avgDepthFormatted = depthUnit === 'mi'
    ? `${(avgDepthKm * 0.621371).toFixed(1)} mi`
    : `${avgDepthKm.toFixed(1)} km`;

  const significantCount = events.filter((e) => e.magnitude >= 4.5 || e.significance > 100).length;
  const strongCount = events.filter((e) => e.magnitude >= 6.0).length;

  return [
    {
      id: 'kpi-total',
      title: 'Total earthquakes',
      value: String(total),
      change: 'Live USGS',
      isPositive: true,
      description: 'Recorded in past 24 hours'
    },
    {
      id: 'kpi-max-mag',
      title: 'Maximum magnitude',
      value: `M ${maxMag.toFixed(1)}`,
      change: strongCount > 0 ? `${strongCount} strong` : 'Moderate',
      isPositive: maxMag < 6.0,
      description: 'Peak intensity registered'
    },
    {
      id: 'kpi-avg-depth',
      title: 'Average depth',
      value: avgDepthFormatted,
      change: depthUnit.toUpperCase(),
      isPositive: true,
      description: 'Mean hypocenter depth'
    },
    {
      id: 'kpi-significant',
      title: 'Significant events',
      value: String(significantCount),
      change: significantCount > 0 ? `${significantCount} high impact` : 'Low activity',
      isPositive: significantCount === 0,
      description: 'Events with M >= 4.5 or Sig > 100'
    }
  ];
}
