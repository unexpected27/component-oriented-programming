import { useState } from 'react';

/**
 * Counter / Stepper Component
 * Manages its own local state (useState) and event handling.
 * Domain context: Magnitude threshold configuration
 */
function Counter({ initialValue = 4.0, min = 1.0, max = 9.0, step = 0.5, onThresholdChange }) {
  const [threshold, setThreshold] = useState(initialValue);
  const defaultValue = 3;

  const handleIncrement = () => {
    setThreshold(prev => {
      const next = Math.min(max, +(prev + step).toFixed(1));
      if (onThresholdChange) onThresholdChange(next);
      return next;
    });
  };

  const handleDecrement = () => {
    setThreshold(prev => {
      const next = Math.max(min, +(prev - step).toFixed(1));
      if (onThresholdChange) onThresholdChange(next);
      return next;
    });
  };

  const handleReset = () => {
    setThreshold(defaultValue);
    if (onThresholdChange) onThresholdChange(defaultValue);
  };

  const getStatusBadge = (val) => {
    if (val >= 6.0) return <span className="badge badge-strong">Strong</span>;
    if (val >= 4.0) return <span className="badge badge-moderate">Moderate</span>;
    return <span className="badge badge-weak">Weak</span>;
  };

  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3 className="widget-title">Magnitude alert threshold</h3>
      </div>
      <p className="widget-description">
        Sets the minimum threshold for earthquake monitoring alerts.
      </p>

      <div className="counter-display">
        <span className="counter-value">M {threshold.toFixed(1)}</span>
        {getStatusBadge(threshold)}
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
        >
          Reset ({defaultValue.toFixed(1)})
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
    </div>
  );
}

export default Counter;
