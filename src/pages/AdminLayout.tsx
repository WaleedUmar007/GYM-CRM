import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
  active?: 'dashboard' | 'customers';
}

export default function AdminLayout({ children, active }: AdminLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen flex bg-[#f6faff]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111c2d] text-white flex flex-col justify-between py-6 px-4 min-h-screen">
        <div>
          <div className="text-2xl font-bold mb-8">Kotla GymKhana</div>
          <div className="mb-8">
            <div className="text-xs text-gray-300">Logged in as:</div>
            <div className="font-bold">Admin</div>
            <div className="text-xs text-gray-400">admin</div>
          </div>
          <nav className="space-y-2">
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${active === 'dashboard' ? 'bg-[#1a2940]' : 'bg-[#22304a]'} text-white`}
              onClick={() => navigate('/dashboard')}
            >
              <span>Dashboard</span>
            </button>
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${active === 'customers' ? 'bg-[#1a2940]' : 'bg-[#22304a]'} text-white`}
              onClick={() => navigate('/admin')}
            >
              <span>Customers</span>
            </button>
          </nav>
        </div>
        <button
          className="w-full flex items-center gap-2 bg-[#181f28] hover:bg-[#232b36] text-white text-base rounded-lg px-4 py-3 mt-8 font-medium transition-colors"
          onClick={() => navigate('/login')}
        >
          <span className="w-3 h-3 rounded-full bg-white inline-block mr-2"></span>
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#f6faff] min-h-screen w-full">{children}</main>
    </div>
  );
} 