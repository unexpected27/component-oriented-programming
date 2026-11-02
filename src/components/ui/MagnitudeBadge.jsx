function MagnitudeBadge({ magnitude, prefix = 'M ' }) {
  const getBadgeClass = (val) => {
    if (val >= 6.5) return 'badge badge-strong';
    if (val >= 5.0) return 'badge badge-moderate';
    if (val >= 3.5) return 'badge badge-light';
    return 'badge badge-weak';
  };

  const getLabel = (val) => {
    if (val >= 6.5) return 'Strong';
    if (val >= 5.0) return 'Moderate';
    if (val >= 3.5) return 'Light';
    return 'Weak';
  };

  return (
    <span className={getBadgeClass(magnitude)} title={`Level: ${getLabel(magnitude)}`}>
      {prefix}{magnitude.toFixed(1)}
    </span>
  );
}

export default MagnitudeBadge;
