import { BackendInstance } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMonthlyRevenueFailure,
  getMonthlyRevenueSuccess,
  getPackageDistributionFailure,
  getPackageDistributionSuccess,
  getTopCardStatisticFailure,
  getTopCardStatisticSuccess,
} from "../reducers/dashboardReducer";
import { handlerError } from "@/utils/ErrorHandler";
import { updateAlert } from "@/appRedux/actions/alertAction";
import { AuthSelector } from "../reducers";
import type { RootState } from "../reducers/index";
import { UserRoles } from "@/types";

export const getDashboardTopCardStats = createAsyncThunk(
  "dashboard/getDashboardTopCardStats",
  async (_, { dispatch }) => {
    try {
      const res = await BackendInstance.get(
        "dashboard/get-membership-statistics"
      );
      dispatch(getTopCardStatisticSuccess(res.data.data));
      return true;
    } catch (err) {
      dispatch(getTopCardStatisticFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

export const getDashboardMonthlyStats = createAsyncThunk(
  "dashboard/getDashboardMonthlyStats",
  async (_, { dispatch }) => {
    try {
      const res = await BackendInstance.get(
        "dashboard/get-membership-monthly-revenue"
      );
      dispatch(getMonthlyRevenueSuccess(res.data.data));
      return true;
    } catch (err) {
      dispatch(getMonthlyRevenueFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

export const getDashboardPackageDistribution = createAsyncThunk(
  "dashboard/getDashboardPackageDistribution",
  async (_, { dispatch }) => {
    try {
      const res = await BackendInstance.get(
        "dashboard/get-package-distribution"
      );
      dispatch(getPackageDistributionSuccess(res.data.data));
      return true;
    } catch (err) {
      dispatch(getPackageDistributionFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

export const getDashboardStatistics = createAsyncThunk(
  "dashboard/getDashboardStatistics",
  async (_, { dispatch, getState }) => {
    try {
      const authState = AuthSelector(getState() as RootState);
      const promises = [dispatch(getDashboardTopCardStats())];
      if (authState?.user?.role === UserRoles.Admin) {
        promises.push(dispatch(getDashboardPackageDistribution()));
      } else if (authState?.user?.role === UserRoles.SuperAdmin) {
        promises.push(dispatch(getDashboardMonthlyStats()));
      }
      await Promise.all(promises);
      return true;
    } catch (err) {
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);
