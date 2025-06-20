import {
  getUsersSuccess,
  getUsersFailure,
  deleteUserSuccess,
  deleteUserFailure,
  addEditUserSuccess,
  addEditUserFailure,
  userReset,
  getAdminsSuccess,
  getAdminsFailure,
} from "../reducers/userReducer";
import { BackendInstance, config } from "@/config";
import { handlerError } from "@/utils/ErrorHandler";
import { updateAlert } from "./alertAction";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IUserAddEditFormData,
  IUserDeleteData,
} from "@/types/ReduxTypes/user";
import type { ISearchParams } from "@/types";

export const getAllUsers = createAsyncThunk(
  "user/getUserPaginated",
  async (
    { page, pageSize, searchString, admins }: ISearchParams,
    { dispatch }
  ) => {
    try {
      if (admins) {
        const res = await BackendInstance.post("user/get-all-users/1/10", {
          admins: true,
        });
        dispatch(getAdminsSuccess(res.data.data));
        return true;
      }
      const res = await BackendInstance.post(
        `user/get-all-users/${page}/${pageSize}`,
        {
          searchString: searchString,
        }
      );
      dispatch(getUsersSuccess(res.data.data));
      return true;
    } catch (err) {
      if (admins) {
        dispatch(getAdminsFailure());
      } else {
        dispatch(getUsersFailure());
      }
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ userIds, mode }: IUserDeleteData, { dispatch }) => {
    try {
      const res = await BackendInstance.delete("user/delete-users", {
        ...config,
        data: { userIds: userIds },
      });
      dispatch(
        deleteUserSuccess({
          userIds: res.data.data,
          mode: mode,
        })
      );
      dispatch(
        updateAlert({
          place: "tc",
          message: "Users Deleted Successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err) {
      dispatch(deleteUserFailure());
      handlerError(err).forEach((error: string) => {
        return dispatch(
          updateAlert({ place: "tc", message: error, type: "danger" })
        );
      });
      return false;
    }
  }
);

export const addEditUser = createAsyncThunk(
  "user/addEditUser",
  async (data: IUserAddEditFormData, { dispatch }) => {
    const body = JSON.stringify(data.data);
    try {
      const res = await BackendInstance.post(
        "user/add-update-user",
        body,
        config
      );
      dispatch(
        addEditUserSuccess({
          data: res.data.data,
          mode: data.mode,
        })
      );
      dispatch(
        updateAlert({
          place: "tc",
          message: `User ${
            (data.data as any)?.id ? "updated" : "added"
          } successfully!`,
          type: "success",
        })
      );
      return true;
    } catch (err) {
      dispatch(addEditUserFailure());
      handlerError(err).forEach((error: string) => {
        return dispatch(
          updateAlert({ place: "tc", message: error, type: "danger" })
        );
      });
      return false;
    }
  }
);

export const resetUser = createAsyncThunk(
  "user/resetUser",
  async (_, { dispatch }) => {
    try {
      dispatch(userReset());
      return true;
    } catch (err) {
      return false;
    }
  }
);
