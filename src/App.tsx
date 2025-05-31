import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DashboardPage from './pages/DashboardPage';
import SuperAdminDashboardPage from './pages/SuperAdminDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
