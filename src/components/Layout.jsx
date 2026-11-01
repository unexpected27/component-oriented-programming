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
          <p>React Router v7 • Context API • Component-Oriented Programming • Laboratory 04 • 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
