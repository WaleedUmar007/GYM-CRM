import { BackendInstance, config } from "@/config";
import { handlerError } from "@/utils/ErrorHandler";
import { updateAlert } from "./alertAction";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ISearchParams } from "@/types";
import {
  addEditMembershipFailure,
  addEditMembershipSuccess,
  getMembershipsFailure,
  getMembershipsSuccess,
  membershipReset,
} from "../reducers/membershipReducer";
import type { IMembershipAddEditFormData } from "@/types/ReduxTypes/membership";

export const getAllMemberships = createAsyncThunk(
  "memberships/getAllMemberships",
  async ({ page, pageSize, searchString }: ISearchParams, { dispatch }) => {
    try {
      const res = await BackendInstance.post(
        `membership/get-memberships/${page}/${pageSize}`,
        {
          searchString: searchString,
        }
      );
      dispatch(getMembershipsSuccess(res.data.data));
      return true;
    } catch (err) {
      dispatch(getMembershipsFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

export const addEditMemberships = createAsyncThunk(
  "memberships/addEditMemberships",
  async (data: IMembershipAddEditFormData, { dispatch }) => {
    const body = JSON.stringify(data);
    try {
      const res = await BackendInstance.patch(
        "membership/add-update-membership",
        body,
        config
      );
      dispatch(addEditMembershipSuccess(res.data.data));
      dispatch(
        updateAlert({
          place: "tc",
          message: "Membership updated successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err) {
      dispatch(addEditMembershipFailure());
      handlerError(err).forEach((error: string) => {
        return dispatch(
          updateAlert({ place: "tc", message: error, type: "danger" })
        );
      });
      return false;
    }
  }
);

export const resetMembership = createAsyncThunk(
  "membership/resetMembership",
  async (_, { dispatch }) => {
    try {
      dispatch(membershipReset());
      return true;
    } catch (err) {
      return false;
    }
  }
);
