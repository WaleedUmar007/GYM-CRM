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

  const stats = [
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
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow p-6 w-full flex items-center gap-4"
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
              Monthly Revenue Trend
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
    </>
  );
}
