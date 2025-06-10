import type { IDashboardState } from "@/types/ReduxTypes/dashboard";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: IDashboardState = {
  packageDistribution: null,
  packageDistributionLoading: true,
  dashboardTopCardStatistics: null,
  dashboardTopCardStatisticsLoading: true,
  monthlyRevenue: null,
  monthlyRevenueLoading: true,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    getTopCardStatisticSuccess: (
      state,
      { payload }: PayloadAction<IDashboardState["dashboardTopCardStatistics"]>
    ) => {
      state.dashboardTopCardStatistics = payload;
      state.dashboardTopCardStatisticsLoading = false;
    },
    getTopCardStatisticFailure: (state) => {
      state.dashboardTopCardStatisticsLoading = false;
    },
    getPackageDistributionSuccess: (
      state,
      { payload }: PayloadAction<IDashboardState["packageDistribution"]>
    ) => {
      state.packageDistribution = payload;
      state.packageDistributionLoading = false;
    },
    getPackageDistributionFailure: (state) => {
      state.packageDistributionLoading = false;
    },
    getMonthlyRevenueSuccess: (
      state,
      { payload }: PayloadAction<IDashboardState["monthlyRevenue"]>
    ) => {
      state.monthlyRevenue = payload;
      state.monthlyRevenueLoading = false;
    },
    getMonthlyRevenueFailure: (state) => {
      state.monthlyRevenueLoading = false;
    },
    dashboardReset: () => {
      return initialState;
    },
  },
});

export const {
  getTopCardStatisticSuccess,
  getTopCardStatisticFailure,
  getPackageDistributionSuccess,
  getPackageDistributionFailure,
  getMonthlyRevenueSuccess,
  getMonthlyRevenueFailure,
  dashboardReset,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<UserState>} state - The state of dashboard
 * @param {UserState} state.user - The state of dashboard state
 * @returns {UserState} returns dashboard state object
 */
export const DashboardSelector = (state: {
  dashboard: IDashboardState;
}): IDashboardState => {
  return state.dashboard;
};
