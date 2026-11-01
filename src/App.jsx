import { useState, useEffect } from 'react';
import EarthquakeDashboardContainer from './components/EarthquakeDashboardContainer';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-shell" data-theme={theme}>
      <EarthquakeDashboardContainer
        theme={theme}
        onThemeChange={setTheme}
      />
    </div>
  );
}

export default App;
