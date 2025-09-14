import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import SuperAdminMembersPage from "./SuperAdminMembersPage";
import { useSelector } from "react-redux";
import { DashboardSelector } from "@/appRedux/reducers";
import { useAppDispatch } from "@/appRedux/store";
import { getDashboardStatistics } from "@/appRedux/actions/dashboardAction";
import type { IMonthlyRevenue } from "@/types/ReduxTypes/dashboard";

// Mock data for members and admins
export default function SuperAdminDashboardPage() {
  const [active, setActive] = useState("Dashboard");
  const [selectedCategory, setSelectedCategory] = useState("gym");
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [monthlyRevenues, setMonthlyRevenues] = useState<IMonthlyRevenue>([
    { month: 1, year: 2025, revenue: 0 },
    { month: 2, year: 2025, revenue: 0 },
    { month: 3, year: 2025, revenue: 0 },
    { month: 4, year: 2025, revenue: 0 },
    { month: 5, year: 2025, revenue: 0 },
    { month: 6, year: 2025, revenue: 0 },
    { month: 7, year: 2025, revenue: 0 },
    { month: 8, year: 2025, revenue: 0 },
    { month: 9, year: 2025, revenue: 0 },
    { month: 10, year: 2025, revenue: 0 },
    { month: 11, year: 2025, revenue: 0 },
    { month: 12, year: 2025, revenue: 0 },
  ]);

  // Add Admin Modal logic (UI only)
  const {
    dashboardTopCardStatistics,
    dashboardTopCardStatisticsLoading,
    monthlyRevenue,
    monthlyRevenueLoading,
  } = useSelector(DashboardSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (monthlyRevenue !== null) {
      setMonthlyRevenues(monthlyRevenue);
    }
  }, [monthlyRevenue, monthlyRevenueLoading]);

  useEffect(() => {
    if (
      dashboardTopCardStatistics === null ||
      dashboardTopCardStatisticsLoading ||
      monthlyRevenue === null ||
      monthlyRevenueLoading
    ) {
      dispatch(getDashboardStatistics());
    }
  }, []);

  // Mock data for inventory items
  const lowStockItems = [
    { id: 1, name: "Protein Powder - Whey", currentStock: 8, minStock: 15 },
    { id: 2, name: "Resistance Bands Set", currentStock: 5, minStock: 12 },
    { id: 3, name: "Yoga Mats - Premium", currentStock: 3, minStock: 10 },
    { id: 4, name: "Pre-Workout Supplements", currentStock: 7, minStock: 20 },
    { id: 5, name: "Water Bottles - 1L", currentStock: 12, minStock: 25 },
  ];

  const outOfStockItems = [
    { id: 1, name: "Dumbbells - 15kg", currentStock: 0, lastOrdered: "2024-12-20" },
    { id: 2, name: "Gym Towels", currentStock: 0, lastOrdered: "2024-12-18" },
    { id: 3, name: "Energy Bars - Mixed", currentStock: 0, lastOrdered: "2024-12-25" },
    { id: 4, name: "Lifting Straps", currentStock: 0, lastOrdered: "2024-12-22" },
    { id: 5, name: "Shaker Bottles", currentStock: 0, lastOrdered: "2024-12-15" },
  ];

  // Data for different categories
  const getCategoryData = () => {
    switch (selectedCategory) {
      case "gym":
        return [
          {
            label: "Total Members",
            value: dashboardTopCardStatistics?.totalMemberships,
            change: "+15%",
            icon: "👤",
            color: "text-blue-600",
          },
          {
            label: "Monthly Revenue",
            value: dashboardTopCardStatistics?.totalAmountEarned,
            change: "+10%",
            icon: "💳",
            color: "text-blue-600",
          },
          {
            label: "Active Memberships",
            value: dashboardTopCardStatistics?.totalActiveMemberships,
            change: "+5%",
            icon: "👥",
            color: "text-blue-600",
          },
          {
            label: "Inactive Members",
            value: dashboardTopCardStatistics?.totalMemberships ? 
              dashboardTopCardStatistics.totalMemberships - dashboardTopCardStatistics.totalActiveMemberships : 0,
            change: "-2%",
            icon: "👥",
            color: "text-red-600",
          },
        ];
      case "inventory":
        return [
          {
            label: "Total Items",
            value: 156,
            change: "+8%",
            icon: "📦",
            color: "text-green-600",
          },
          {
            label: "Monthly Sales",
            value: 45000,
            change: "+12%",
            icon: "💰",
            color: "text-green-600",
          },
          {
            label: "Low Stock Items",
            value: 23,
            change: "+3%",
            icon: "⚠️",
            color: "text-yellow-600",
            clickable: true,
            onClick: () => setShowLowStockModal(true),
          },
          {
            label: "Out of Stock",
            value: 5,
            change: "-1%",
            icon: "❌",
            color: "text-red-600",
            clickable: true,
            onClick: () => setShowOutOfStockModal(true),
          },
        ];
      case "salon":
        return [
          {
            label: "Total Clients",
            value: 89,
            change: "+20%",
            icon: "💇",
            color: "text-purple-600",
          },
          {
            label: "Monthly Revenue",
            value: 78000,
            change: "+18%",
            icon: "💄",
            color: "text-purple-600",
          },
          {
            label: "Active Bookings",
            value: 34,
            change: "+7%",
            icon: "📅",
            color: "text-purple-600",
          },
          {
            label: "Services Offered",
            value: 12,
            change: "+0%",
            icon: "✨",
            color: "text-purple-600",
          },
        ];
      default:
        return [];
    }
  };

  const stats = getCategoryData();

  // function handleAddAdmin(e: React.FormEvent) {
  //   e.preventDefault();
  //   setAdmins([
  //     ...admins,
  //     {
  //       id: admins.length + 1,
  //       name: newAdmin.name,
  //       email: newAdmin.email,
  //       phone: newAdmin.phone,
  //       status: "Active",
  //       joined: new Date().toISOString().slice(0, 10),
  //     },
  //   ]);
  //   setShowAddAdmin(false);
  //   setNewAdmin({ name: "", email: "", phone: "" });
  // }

  return (
    <>
      {active === "Dashboard" && (
        <>
          {/* Category Filter Dropdown */}
          <div className="mb-6 w-full">
            <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
              <div className="flex items-center gap-3">
                <label htmlFor="category-select" className="text-sm font-medium text-gray-600">
                  View Data For:
                </label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="gym">🏋️ Gym</option>
                  <option value="inventory">📦 Inventory</option>
                  <option value="salon">💇 Salon</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 w-full">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`bg-white rounded-lg shadow p-6 w-full flex items-center gap-4 ${
                  stat.clickable ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''
                }`}
                onClick={stat.onClick || (() => {})}
              >
                <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
                <div className="flex-1">
                  <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
                <div className="text-green-500 font-semibold text-sm">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
          {/* Professional Bar Chart with Recharts */}
          <div
            className="bg-white rounded-lg shadow p-8 w-full flex flex-col items-center justify-center"
            style={{ minHeight: 500 }}
          >
            <div className="text-lg font-semibold mb-4">
              {selectedCategory === "gym" ? "Monthly Gym Revenue Trend" :
               selectedCategory === "inventory" ? "Monthly Inventory Sales Trend" :
               "Monthly Salon Revenue Trend"}
            </div>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart
                data={monthlyRevenues.map((revenue) => {
                  const date = new Date(revenue.year, revenue.month - 1);
                  return {
                    month: date.toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    }),
                    revenue: revenue?.revenue || 0,
                  };
                })}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 14 }} />
                <YAxis
                  tick={{ fontSize: 14 }}
                  tickFormatter={(v) => `PKR ${v.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(v) => `PKR ${v.toLocaleString()}`}
                  cursor={{ fill: "#e0f2fe" }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  dataKey="revenue"
                  name="Monthly Revenue (PKR)"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      {active === "Members" && <SuperAdminMembersPage />}

      {/* Low Stock Modal */}
      {showLowStockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Low Stock Items</h3>
              <button
                onClick={() => setShowLowStockModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Minimum required: {item.minStock}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-600">{item.currentStock}</p>
                    <p className="text-xs text-gray-500">in stock</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowLowStockModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Out of Stock Modal */}
      {showOutOfStockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Out of Stock Items</h3>
              <button
                onClick={() => setShowOutOfStockModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              {outOfStockItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Last ordered: {item.lastOrdered}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600">0</p>
                    <p className="text-xs text-gray-500">in stock</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowOutOfStockModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
