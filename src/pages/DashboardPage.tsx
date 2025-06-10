import { getDashboardStatistics } from "@/appRedux/actions/dashboardAction";
import { AuthSelector, DashboardSelector } from "@/appRedux/reducers";
import { useAppDispatch } from "@/appRedux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

export default function DashboardPage() {
  const [filter, setFilter] = useState("All");
  const [time, setTime] = useState("30");
  const { user } = useSelector(AuthSelector);
  const {
    dashboardTopCardStatistics,
    dashboardTopCardStatisticsLoading,
    packageDistribution,
    packageDistributionLoading,
  } = useSelector(DashboardSelector);
  const dispatch = useAppDispatch();
  const [packageDistributionData, setPackageDistributionData] = useState<
    Array<Record<string, any>>
  >([]);

  useEffect(() => {
    if (packageDistribution !== null) {
      const data = packageDistribution.map((pkg) => ({
        name: pkg._id,
        value: pkg.sum,
      }));
      setPackageDistributionData(data);
    }
  }, [packageDistribution, packageDistributionLoading]);

  useEffect(() => {
    if (
      dashboardTopCardStatistics === null ||
      dashboardTopCardStatisticsLoading ||
      packageDistribution === null ||
      packageDistributionLoading
    ) {
      dispatch(getDashboardStatistics());
    }
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome, {user?.first_name} {user?.last_name}!
          </h1>
          <div className="text-gray-500">
            Here is an overview of your gym's performance.
          </div>
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
          <div className="text-2xl font-bold text-gray-900">
            {dashboardTopCardStatistics?.totalMemberships}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Active Memberships</div>
          <div className="text-2xl font-bold text-green-500">
            {dashboardTopCardStatistics?.totalActiveMemberships}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">Pending Payments</div>
          <div className="text-2xl font-bold text-red-500">
            PKR {dashboardTopCardStatistics?.totalAmountPending}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <div className="text-gray-500 text-sm mb-1">
            Total Payment Cleared
          </div>
          <div className="text-2xl font-bold text-blue-600">
            PKR {dashboardTopCardStatistics?.totalAmountEarned}
          </div>
        </div>
      </div>
      {/* Pie Chart */}
      <div
        className="bg-white rounded-lg shadow p-8 w-full flex flex-col items-center justify-center"
        style={{ minHeight: 340 }}
      >
        <PieChart width={800} height={450}>
          <Pie
            data={packageDistributionData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={150}
            fill="#8884d8"
          />
          {/* Border for accessibility */}
          <circle
            r="135"
            cx="50%"
            cy="46%"
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="5"
          />
          <Legend
            height={36}
            formatter={(value, entry) => {
              const total =
                packageDistribution?.reduce((prev, curr) => {
                  const acc = (prev += curr.sum);
                  return acc;
                }, 0) || 1;
              return `${value} (${(
                ((entry?.payload?.value || 0) / total) *
                100
              ).toFixed(1)}%)`;
            }}
          />
          <Tooltip
            formatter={(value) => {
              const total =
                packageDistribution?.reduce((prev, curr) => {
                  const acc = (prev += curr.sum);
                  return acc;
                }, 0) || 1;
              return `${((Number(value) / total) * 100).toFixed(1)}%`;
            }}
          />
        </PieChart>
      </div>
    </>
  );
}
