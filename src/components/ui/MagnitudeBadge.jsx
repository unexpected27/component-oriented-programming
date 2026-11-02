import Badge from './atoms/Badge/Badge';

function MagnitudeBadge({ magnitude, prefix = 'M ', size = 'md' }) {
  const getBadgeVariant = (val) => {
    if (val >= 6.5) return 'strong';
    if (val >= 5.0) return 'moderate';
    if (val >= 3.5) return 'light';
    return 'weak';
  };

  const getLabel = (val) => {
    if (val >= 6.5) return 'Strong';
    if (val >= 5.0) return 'Moderate';
    if (val >= 3.5) return 'Light';
    return 'Weak';
  };

  return (
    <Badge
      variant={getBadgeVariant(magnitude)}
      size={size}
      title={`Level: ${getLabel(magnitude)}`}
    >
      {prefix}{magnitude.toFixed(1)}
    </Badge>
  );
}

export default MagnitudeBadge;
