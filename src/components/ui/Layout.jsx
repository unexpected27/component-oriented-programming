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
          <p>React Router v7 • Zustand Global State • Recharts • Component-Oriented Programming • Laboratory 05 • 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
