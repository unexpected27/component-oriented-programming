import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/ui/Layout';
import DashboardPage from './pages/DashboardPage';
import EventDetailsPage from './pages/EventDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
          <Route path="/item/:id" element={<EventDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
