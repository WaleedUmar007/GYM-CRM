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
import SuperAdminMembersPage from './SuperAdminMembersPage';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

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

// Mock data for members and admins
const mockMembers = [
  { id: 1, name: 'Ali Raza', email: 'ali.raza@gmail.com', phone: '0300-1234567', status: 'Active', joined: '2023-01-10' },
  { id: 2, name: 'Sara Khan', email: 'sara.khan@gmail.com', phone: '0301-9876543', status: 'Inactive', joined: '2022-11-22' },
  { id: 3, name: 'Bilal Ahmed', email: 'bilal.ahmed@gmail.com', phone: '0321-5555555', status: 'Active', joined: '2023-03-05' },
];
const mockAdmins = [
  { id: 1, name: 'Admin One', email: 'admin1@kotlagymkhana.com', phone: '0300-0000001', status: 'Active', joined: '2022-01-01' },
  { id: 2, name: 'Admin Two', email: 'admin2@kotlagymkhana.com', phone: '0300-0000002', status: 'Active', joined: '2022-06-15' },
];

export default function SuperAdminDashboardPage() {
  const [active, setActive] = useState('Dashboard');
  const [membersFilter, setMembersFilter] = useState<'members' | 'admins'>('members');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [admins, setAdmins] = useState(mockAdmins);

  // Add Admin Modal logic (UI only)
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', phone: '' });
  function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    setAdmins([
      ...admins,
      { id: admins.length + 1, name: newAdmin.name, email: newAdmin.email, phone: newAdmin.phone, status: 'Active', joined: new Date().toISOString().slice(0, 10) },
    ]);
    setShowAddAdmin(false);
    setNewAdmin({ name: '', email: '', phone: '' });
  }

  return (
    <SuperAdminLayout>
      {active === 'Dashboard' && (
        <>
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
        </>
      )}
      {active === 'Members' && <SuperAdminMembersPage />}
    </SuperAdminLayout>
  );
} 