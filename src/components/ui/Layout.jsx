import { Outlet } from 'react-router';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-container">
        <main className="dashboard-content">
          <Outlet />
        </main>
        <footer className="app-footer">
          <p>Atomic Design System • Storybook 10 • React 19 • Component-Oriented Programming • Laboratory 06 • 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
