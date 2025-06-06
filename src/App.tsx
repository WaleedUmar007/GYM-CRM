import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import DashboardPage from './pages/DashboardPage';
import SuperAdminDashboardPage from './pages/SuperAdminDashboardPage';
import SuperAdminMembersPage from './pages/SuperAdminMembersPage';
import SuperAdminSettingsPage from './pages/SuperAdminSettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboardPage />} />
        <Route path="/superadmin/members" element={<SuperAdminMembersPage />} />
        <Route path="/superadmin/settings" element={<SuperAdminSettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
