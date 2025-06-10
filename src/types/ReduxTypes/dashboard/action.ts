export interface ITopCardStatistics {
  totalMemberships: number;
  totalActiveMemberships: number;
  totalAmountEarned: number;
  totalAmountPending: number;
}

export type IPackageDistribution = Array<{
  _id: string;
  sum: number;
}>;

export type IMonthlyRevenue = Array<{
  month: number;
  year: number;
  revenue: number;
}>;
