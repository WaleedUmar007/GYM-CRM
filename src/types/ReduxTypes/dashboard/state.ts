import type {
  IMonthlyRevenue,
  IPackageDistribution,
  ITopCardStatistics,
} from "./action";

export interface IDashboardState {
  packageDistribution: IPackageDistribution | null;
  packageDistributionLoading: boolean;
  dashboardTopCardStatistics: ITopCardStatistics | null;
  dashboardTopCardStatisticsLoading: boolean;
  monthlyRevenue: IMonthlyRevenue | null;
  monthlyRevenueLoading: boolean;
}
