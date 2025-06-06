import { logout } from "@/appRedux/actions/authAction";
import { useAppDispatch } from "@/appRedux/store";
import { Link, Outlet, useLocation } from "react-router-dom";

const navLinks = [
  { label: 'Dashboard', icon: '🏠', to: '/superadmin/dashboard' },
  { label: 'Members', icon: '👥', to: '/superadmin/members' },
  { label: 'Payments', icon: '💳', to: '#' },
  { label: 'Reports', icon: '📊', to: '/superadmin/reports' },
  { label: 'Settings', icon: '⚙️', to: '/superadmin/settings' },
];

export default function SuperAdminLayout() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen w-screen flex bg-[#f6faff]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111c2d] text-white flex flex-col justify-between py-6 px-4 min-h-screen">
        <div>
          <div className="text-2xl font-bold mb-8">Kotla Gym Khana</div>
          <nav className="space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-left transition-colors ${
                  location.pathname === item.to
                    ? "bg-[#1a2940]"
                    : "bg-[#22304a]"
                } text-white`}
                style={{
                  pointerEvents: item.to === "#" ? "none" : undefined,
                  opacity: item.to === "#" ? 0.5 : 1,
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          className="w-full flex items-center gap-2 bg-[#181f28] hover:bg-[#232b36] text-white text-base rounded-lg px-4 py-3 mt-8 font-medium transition-colors"
          onClick={() => {
            dispatch(logout());
          }}
        >
          <span className="w-3 h-3 rounded-full bg-white inline-block mr-2"></span>
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#f6faff] min-h-screen w-full">
        <Outlet />
      </main>
    </div>
  );
}
