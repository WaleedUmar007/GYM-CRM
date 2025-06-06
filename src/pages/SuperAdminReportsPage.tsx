import { useState } from 'react';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Revenue data by month
const revenueData = [
  { month: 'Jan', revenue: 35000, members: 15 },
  { month: 'Feb', revenue: 37000, members: 18 },
  { month: 'Mar', revenue: 40000, members: 22 },
  { month: 'Apr', revenue: 42000, members: 25 },
  { month: 'May', revenue: 44000, members: 28 },
  { month: 'Jun', revenue: 44000, members: 30 },
  { month: 'Jul', revenue: 43000, members: 32 },
  { month: 'Aug', revenue: 45000, members: 35 },
  { month: 'Sep', revenue: 42000, members: 33 },
  { month: 'Oct', revenue: 41000, members: 30 },
  { month: 'Nov', revenue: 43000, members: 32 },
  { month: 'Dec', revenue: 45000, members: 35 },
];

// Membership distribution data
const membershipDistribution = [
  { name: 'Basic', value: 45, color: '#3b82f6' },
  { name: 'Standard', value: 35, color: '#10b981' },
  { name: 'Premium', value: 20, color: '#6366f1' },
];

// Attendance data by day of week
const attendanceByDay = [
  { day: 'Mon', attendance: 68 },
  { day: 'Tue', attendance: 72 },
  { day: 'Wed', attendance: 80 },
  { day: 'Thu', attendance: 76 },
  { day: 'Fri', attendance: 85 },
  { day: 'Sat', attendance: 92 },
  { day: 'Sun', attendance: 62 },
];

// Attendance data by hour
const attendanceByHour = [
  { hour: '6AM', attendance: 15 },
  { hour: '8AM', attendance: 30 },
  { hour: '10AM', attendance: 25 },
  { hour: '12PM', attendance: 20 },
  { hour: '2PM', attendance: 18 },
  { hour: '4PM', attendance: 22 },
  { hour: '6PM', attendance: 38 },
  { hour: '8PM', attendance: 42 },
  { hour: '10PM', attendance: 28 },
];

// Member retention data
const retentionData = [
  { month: 'Jan', retention: 92 },
  { month: 'Feb', retention: 90 },
  { month: 'Mar', retention: 88 },
  { month: 'Apr', retention: 91 },
  { month: 'May', retention: 93 },
  { month: 'Jun', retention: 95 },
  { month: 'Jul', retention: 94 },
  { month: 'Aug', retention: 92 },
  { month: 'Sep', retention: 91 },
  { month: 'Oct', retention: 93 },
  { month: 'Nov', retention: 94 },
  { month: 'Dec', retention: 96 },
];

// Age distribution data
const ageDistribution = [
  { age: '18-24', count: 28 },
  { age: '25-34', count: 45 },
  { age: '35-44', count: 32 },
  { age: '45-54', count: 18 },
  { age: '55+', count: 7 },
];

// Gender distribution data
const genderDistribution = [
  { name: 'Male', value: 65, color: '#3b82f6' },
  { name: 'Female', value: 35, color: '#ec4899' },
];

// Popular time slots
const popularTimeSlots = [
  { time: 'Morning (6AM-10AM)', percentage: 25 },
  { time: 'Midday (10AM-2PM)', percentage: 15 },
  { time: 'Afternoon (2PM-6PM)', percentage: 20 },
  { time: 'Evening (6PM-10PM)', percentage: 40 },
];

// Revenue by membership type
const revenueByMembership = [
  { name: 'Basic', revenue: 90000 },
  { name: 'Standard', revenue: 122500 },
  { name: 'Premium', revenue: 100000 },
];

export default function SuperAdminReportsPage() {
  const [timeFilter, setTimeFilter] = useState('yearly');
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState({
    start: '2023-01-01',
    end: '2023-12-31',
  });

  // Calculate summary metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const averageRetention = retentionData.reduce((sum, item) => sum + item.retention, 0) / retentionData.length;

  // Function to render the selected report
  const renderReport = () => {
    switch (reportType) {
      case 'revenue':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-gray-800">PKR {totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-green-600 mt-1">+12% from last year</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Average Monthly Revenue</div>
                <div className="text-2xl font-bold text-gray-800">PKR {(totalRevenue / 12).toLocaleString()}</div>
                <div className="text-sm text-green-600 mt-1">+10% from last year</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Revenue Growth</div>
                <div className="text-2xl font-bold text-gray-800">+12.5%</div>
                <div className="text-sm text-green-600 mt-1">+2.5% from last year</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `PKR ${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Revenue by Membership Type</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByMembership}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {revenueByMembership.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={membershipDistribution[index].color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `PKR ${value.toLocaleString()}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Monthly Member Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="members"
                        name="New Members"
                        stroke="#10b981"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Total Members</div>
                <div className="text-2xl font-bold text-gray-800">130</div>
                <div className="text-sm text-green-600 mt-1">+15 this month</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Active Members</div>
                <div className="text-2xl font-bold text-gray-800">115</div>
                <div className="text-sm text-gray-600 mt-1">88.5% of total</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Retention Rate</div>
                <div className="text-2xl font-bold text-gray-800">{averageRetention.toFixed(1)}%</div>
                <div className="text-sm text-green-600 mt-1">+2.3% from last year</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Avg. Member Lifetime</div>
                <div className="text-2xl font-bold text-gray-800">14 months</div>
                <div className="text-sm text-green-600 mt-1">+2 months from last year</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Membership Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={membershipDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {membershipDistribution.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Member Retention Rate</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={retentionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="retention"
                        name="Retention Rate"
                        stroke="#6366f1"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Members" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {genderDistribution.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Avg. Daily Attendance</div>
                <div className="text-2xl font-bold text-gray-800">76</div>
                <div className="text-sm text-green-600 mt-1">+8% from last month</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Peak Day</div>
                <div className="text-2xl font-bold text-gray-800">Saturday</div>
                <div className="text-sm text-gray-600 mt-1">92 members on average</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Peak Time</div>
                <div className="text-2xl font-bold text-gray-800">6PM - 8PM</div>
                <div className="text-sm text-gray-600 mt-1">42 members on average</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-sm text-gray-500 mb-1">Attendance Rate</div>
                <div className="text-2xl font-bold text-gray-800">58%</div>
                <div className="text-sm text-green-600 mt-1">+5% from last month</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Attendance by Day of Week</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendance" name="Average Attendance" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Attendance by Hour</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceByHour}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="attendance"
                        name="Average Attendance"
                        stroke="#10b981"
                        fill="#10b98133"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Popular Time Slots</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={popularTimeSlots}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        nameKey="time"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#6366f1" />
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive data insights to help you make informed business decisions.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="revenue">Revenue & Financial</option>
                <option value="members">Membership Analysis</option>
                <option value="attendance">Attendance Patterns</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            {timeFilter === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Report Content */}
        {renderReport()}

        {/* Export Options */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export PDF
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export Excel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print Report
          </button>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
