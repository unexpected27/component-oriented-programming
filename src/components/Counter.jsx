import { useState } from 'react';
import WidgetCard from './WidgetCard';
import MagnitudeBadge from './MagnitudeBadge';

function Counter({
  initialValue = 1.0,
  min = 0.0,
  max = 9.0,
  step = 0.5,
  onChange
}) {
  const [threshold, setThreshold] = useState(initialValue);

  const updateThreshold = (nextVal) => {
    setThreshold(nextVal);
    if (onChange) {
      onChange(nextVal);
    }
  };

  const handleIncrement = () => {
    const next = Math.min(max, +(threshold + step).toFixed(1));
    updateThreshold(next);
  };

  const handleDecrement = () => {
    const next = Math.max(min, +(threshold - step).toFixed(1));
    updateThreshold(next);
  };

  const handleReset = () => {
    updateThreshold(initialValue);
  };

  const isAtDefault = threshold === initialValue;

  return (
    <WidgetCard
      title="Magnitude alert threshold"
      description="Sets the minimum threshold for earthquake monitoring alerts."
    >
      <div className="counter-display">
        <span className="counter-value">M {threshold.toFixed(1)}</span>
        <MagnitudeBadge magnitude={threshold} prefix="" />
      </div>

      <div className="counter-actions">
        <button
          type="button"
          className="btn btn-secondary btn-counter"
          onClick={handleDecrement}
          disabled={threshold <= min}
          aria-label="Decrease threshold"
        >
          −
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-reset"
          onClick={handleReset}
          disabled={isAtDefault}
          title={isAtDefault ? 'Already at default value' : `Reset to ${initialValue.toFixed(1)}`}
        >
          Reset ({initialValue.toFixed(1)})
        </button>
        <button
          type="button"
          className="btn btn-primary btn-counter"
          onClick={handleIncrement}
          disabled={threshold >= max}
          aria-label="Increase threshold"
        >
          +
        </button>
      </div>
    </WidgetCard>
  );
}

export default Counter;
