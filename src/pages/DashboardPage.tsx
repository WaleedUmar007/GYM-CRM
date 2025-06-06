import { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';

const allMembers = [
  { type: 'Gold', count: 60, cleared: 50000 },
  { type: 'Platinum', count: 25, cleared: 40000 },
  { type: 'Silver', count: 15, cleared: 30000 },
];

// Mock time-based data multipliers
const timeMultipliers: Record<string, number> = {
  '7': 0.2,
  '14': 0.35,
  '30': 0.5,
  '60': 0.75,
  '90': 1,
};

export default function DashboardPage() {
  const [filter, setFilter] = useState('All');
  const [time, setTime] = useState('30');

  // Multiplier for selected time range
  const multiplier = timeMultipliers[time] || 1;

  // Filtered data
  const filtered =
    filter === 'All'
      ? allMembers
      : allMembers.filter((m) => m.type === filter);
  const totalMembers = Math.round(filtered.reduce((sum, m) => sum + m.count, 0) * multiplier);
  const activeMemberships = filter === 'All' ? Math.round(98 * multiplier) : Math.round((filtered[0]?.count || 0) * 0.8 * multiplier);
  const pendingPayments = filter === 'All' ? Math.round(15000 * multiplier) : 0;
  const totalCleared = Math.round(filtered.reduce((sum, m) => sum + m.cleared, 0) * multiplier);

  // Pie chart data
  const gold = Math.round((filtered.find((m) => m.type === 'Gold')?.count || 0) * multiplier);
  const platinum = Math.round((filtered.find((m) => m.type === 'Platinum')?.count || 0) * multiplier);
  const silver = Math.round((filtered.find((m) => m.type === 'Silver')?.count || 0) * multiplier);
  const total = gold + platinum + silver;

  // Colorblind-friendly colors
  const goldColor = '#F6C700';
  const platinumColor = '#6C7A89';
  const silverColor = '#BFC9CA';

  // Pie chart angles
  const goldAngle = total ? (gold / total) * 360 : 0;
  const platinumAngle = total ? (platinum / total) * 360 : 0;

  return (
    <AdminLayout active="dashboard">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome, Admin!</h1>
          <div className="text-gray-500">Here is an overview of your gym's performance.</div>
        </div>
        <div className="flex gap-2">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Memberships</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
            <option value="Silver">Silver</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
            <option value="60">Last 60 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 w-full">
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Total Members</div>
          <div className="text-2xl font-bold text-gray-900">{totalMembers}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Active Memberships</div>
          <div className="text-2xl font-bold text-green-500">{activeMemberships}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Pending Payments</div>
          <div className="text-2xl font-bold text-red-500">PKR {pendingPayments.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Total Payment Cleared</div>
          <div className="text-2xl font-bold text-blue-600">PKR {totalCleared.toLocaleString()}</div>
        </div>
      </div>
      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow p-8 w-full flex flex-col items-center justify-center" style={{ minHeight: 340 }}>
        <svg
          width="180"
          height="180"
          viewBox="0 0 36 36"
          className="mb-4 drop-shadow"
          aria-label="Membership distribution pie chart"
          role="img"
        >
          {/* Gold */}
          {gold > 0 && (
            <circle
              r="16"
              cx="18"
              cy="18"
              fill="transparent"
              stroke={goldColor}
              strokeWidth="4"
              strokeDasharray={`${goldAngle / 360 * 100} ${100 - goldAngle / 360 * 100}`}
              strokeDashoffset="0"
            />
          )}
          {/* Platinum */}
          {platinum > 0 && (
            <circle
              r="16"
              cx="18"
              cy="18"
              fill="transparent"
              stroke={platinumColor}
              strokeWidth="4"
              strokeDasharray={`${platinumAngle / 360 * 100} ${100 - platinumAngle / 360 * 100}`}
              strokeDashoffset={`-${goldAngle / 360 * 100}`}
            />
          )}
          {/* Silver */}
          {silver > 0 && (
            <circle
              r="16"
              cx="18"
              cy="18"
              fill="transparent"
              stroke={silverColor}
              strokeWidth="4"
              strokeDasharray={`${(360 - goldAngle - platinumAngle) / 360 * 100} ${100 - (360 - goldAngle - platinumAngle) / 360 * 100}`}
              strokeDashoffset={`-${(goldAngle + platinumAngle) / 360 * 100}`}
            />
          )}
          {/* Border for accessibility */}
          <circle
            r="16"
            cx="18"
            cy="18"
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        </svg>
        {/* Key/Legend */}
        <div className="flex gap-8 justify-center mt-2">
          {filter === 'All' && (
            <>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full inline-block border border-gray-300" style={{ background: goldColor }}></span>
                <span className="text-gray-800 font-medium">Gold</span>
                <span className="text-gray-500">({allMembers[0].count}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full inline-block border border-gray-300" style={{ background: platinumColor }}></span>
                <span className="text-gray-800 font-medium">Platinum</span>
                <span className="text-gray-500">({allMembers[1].count}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full inline-block border border-gray-300" style={{ background: silverColor }}></span>
                <span className="text-gray-800 font-medium">Silver</span>
                <span className="text-gray-500">({allMembers[2].count}%)</span>
              </div>
            </>
          )}
          {filter !== 'All' && (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full inline-block border border-gray-300" style={{ background: filter === 'Gold' ? goldColor : filter === 'Platinum' ? platinumColor : silverColor }}></span>
              <span className="text-gray-800 font-medium">{filter}</span>
              <span className="text-gray-500">({filtered[0]?.count || 0}%)</span>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 