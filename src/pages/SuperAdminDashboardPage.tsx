import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';

const stats = [
  {
    label: 'Total Members',
    value: '2,500',
    change: '+15%',
    icon: '👤',
    color: 'text-blue-600',
  },
  {
    label: 'Monthly Revenue',
    value: 'PKR 45,000',
    change: '+10%',
    icon: '💳',
    color: 'text-blue-600',
  },
  {
    label: 'Active Memberships',
    value: '2,100',
    change: '+5%',
    icon: '👥',
    color: 'text-blue-600',
  },
];

// Example: dynamic data for a whole year
const revenueData = [
  { month: 'Jan', revenue: 35000 },
  { month: 'Feb', revenue: 37000 },
  { month: 'Mar', revenue: 40000 },
  { month: 'Apr', revenue: 42000 },
  { month: 'May', revenue: 44000 },
  { month: 'Jun', revenue: 44000 },
  { month: 'Jul', revenue: 43000 },
  { month: 'Aug', revenue: 45000 },
  { month: 'Sep', revenue: 42000 },
  { month: 'Oct', revenue: 41000 },
  { month: 'Nov', revenue: 43000 },
  { month: 'Dec', revenue: 45000 },
];

export default function SuperAdminDashboardPage() {
  const [active, setActive] = useState('Dashboard');
  return (
    <div className="min-h-screen w-screen flex bg-[#f6faff]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111c2d] text-white flex flex-col justify-between py-6 px-4 min-h-screen">
        <div>
          <div className="text-2xl font-bold mb-8">FitZone CRM</div>
          <nav className="space-y-2">
            {['Dashboard', 'Members', 'Payments', 'Reports', 'Settings'].map((item) => (
              <button
                key={item}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-left transition-colors ${active === item ? 'bg-[#1a2940]' : 'bg-[#22304a]'} text-white`}
                onClick={() => setActive(item)}
              >
                <span>{item === 'Dashboard' ? '🏠' : item === 'Members' ? '👥' : item === 'Payments' ? '💳' : item === 'Reports' ? '📊' : '⚙️'}</span>
                {item}
              </button>
            ))}
          </nav>
        </div>
        <button className="w-full flex items-center gap-2 bg-[#181f28] hover:bg-[#232b36] text-white text-base rounded-lg px-4 py-3 mt-8 font-medium transition-colors">
          <span className="w-3 h-3 rounded-full bg-white inline-block mr-2"></span>
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#f6faff] min-h-screen w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6 w-full flex items-center gap-4">
              <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
              <div className="flex-1">
                <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
              <div className="text-green-500 font-semibold text-sm">{stat.change}</div>
            </div>
          ))}
        </div>
        {/* Professional Bar Chart with Recharts */}
        <div className="bg-white rounded-lg shadow p-8 w-full flex flex-col items-center justify-center" style={{ minHeight: 500 }}>
          <div className="text-lg font-semibold mb-4">Monthly Revenue Trend</div>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} tickFormatter={v => `PKR ${v.toLocaleString()}`} />
              <Tooltip formatter={v => `PKR ${v.toLocaleString()}`} cursor={{ fill: '#e0f2fe' }} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="revenue" name="Monthly Revenue (PKR)" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
} 