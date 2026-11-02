import { useState } from 'react';
import Card from './atoms/Card/Card';
import Button from './atoms/Button/Button';
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
    <Card
      title="Magnitude alert threshold"
      description="Sets the minimum threshold for earthquake monitoring alerts."
    >
      <div className="counter-display">
        <span className="counter-value">M {threshold.toFixed(1)}</span>
        <MagnitudeBadge magnitude={threshold} prefix="" />
      </div>

      <div className="counter-actions">
        <Button
          variant="secondary"
          className="btn-counter"
          onClick={handleDecrement}
          disabled={threshold <= min}
          ariaLabel="Decrease threshold"
        >
          −
        </Button>
        <Button
          variant="secondary"
          className="btn-reset"
          onClick={handleReset}
          disabled={isAtDefault}
          title={isAtDefault ? 'Already at default value' : `Reset to ${initialValue.toFixed(1)}`}
        >
          Reset ({initialValue.toFixed(1)})
        </Button>
        <Button
          variant="primary"
          className="btn-counter"
          onClick={handleIncrement}
          disabled={threshold >= max}
          ariaLabel="Increase threshold"
        >
          +
        </Button>
      </div>
    </Card>
  );
}

export default Counter;
