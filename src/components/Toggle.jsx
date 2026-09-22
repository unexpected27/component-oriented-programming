import { useState } from 'react';

/**
 * Display Settings / Toggle Component
 * Manages display preferences using compact segmented controls.
 * Supports depth units (Kilometers / Miles) and Theme (Light / Dark).
 * Default theme: LIGHT.
 */
function Toggle({ onUnitChange, onThemeChange }) {
  const [unit, setUnit] = useState('km');
  const [theme, setTheme] = useState('light');

  const handleUnitSelect = (selectedUnit) => {
    setUnit(selectedUnit);
    if (onUnitChange) onUnitChange(selectedUnit);
  };

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    if (onThemeChange) onThemeChange(selectedTheme);
  };

  return (
    <div className="widget-card">
      <div className="widget-header">
        <h3 className="widget-title">Display settings</h3>
      </div>
      <p className="widget-description">
        Customize measurement units and application theme.
      </p>

      <div className="settings-controls">
        <div className="setting-group">
          <span className="setting-label">Depth units</span>
          <div className="segmented-control" role="radiogroup" aria-label="Depth units">
            <button
              type="button"
              className={`segmented-btn ${unit === 'km' ? 'active' : ''}`}
              onClick={() => handleUnitSelect('km')}
            >
              Kilometers
            </button>
            <button
              type="button"
              className={`segmented-btn ${unit === 'mi' ? 'active' : ''}`}
              onClick={() => handleUnitSelect('mi')}
            >
              Miles
            </button>
          </div>
        </div>

        <div className="setting-group">
          <span className="setting-label">Theme</span>
          <div className="segmented-control" role="radiogroup" aria-label="Theme">
            <button
              type="button"
              className={`segmented-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeSelect('light')}
            >
              Light
            </button>
            <button
              type="button"
              className={`segmented-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeSelect('dark')}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toggle;
