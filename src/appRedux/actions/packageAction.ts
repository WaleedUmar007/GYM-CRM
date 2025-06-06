import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPackageSuccess,
  getPackagesFailure,
  deletePackageSuccess,
  deletePackageFailure,
  addUpdatePackageSuccess,
  addUpdatePackageFailure,
  packageReset,
} from "appRedux/reducers/packageReducer";
import { BackendInstance, config } from "config";
import type { IPackage } from "types/ReduxTypes/package";
import { handlerError } from "utils/ErrorHandler";
import { updateAlert } from "./alertAction";

/**
 * get all packages
 *
 * @returns {boolean} returns true if all packages are got successfully
 */
export const getPackages = createAsyncThunk(
  "packages/getPackages",
  async (_, { dispatch }) => {
    try {
      const res = await BackendInstance.get("get-all-packages");
      dispatch(getPackageSuccess(res.data.data));
      return true;
    } catch (err) {
      dispatch(getPackagesFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

/**
 * delete the package
 *
 * @param {string} id - single id of package to delete
 * @returns {boolean} returns true if package is deleeted successfully
 */
export const deletePackage = createAsyncThunk(
  "package/deletePackage",
  async (ids: Array<string>, { dispatch }) => {
    try {
      const res = await BackendInstance.delete("delete-packages", {
        data: { packageIds: ids },
      });
      dispatch(deletePackageSuccess(res.data.data));
      dispatch(
        updateAlert({ place: "tc", message: res.data.msg, type: "success" })
      );
      return true;
    } catch (err) {
      dispatch(deletePackageFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

/**
 * update the package
 *
 * @param {object} data - single object of package to edit
 * @returns {boolean} returns true if  package is edited successfully
 */
export const addEditPackage = createAsyncThunk(
  "package/addEditPackage",
  async (data: IPackage, { dispatch }) => {
    const body = JSON.stringify(data);

    try {
      const res = await BackendInstance.post(
        "add-update-package",
        body,
        config
      );
      dispatch(
        addUpdatePackageSuccess({
          action: res.data.action,
          data: res.data.data,
        })
      );
      dispatch(
        updateAlert({ place: "tc", message: res.data.msg, type: "success" })
      );
      return true;
    } catch (err) {
      dispatch(addUpdatePackageFailure());
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });
      return false;
    }
  }
);

/**
 * reset the package
 *
 * @returns {boolean} returns true if  package is reset properly
 */
export const resetPackage = createAsyncThunk(
  "package/resetPackage",
  async (_, { dispatch }) => {
    try {
      dispatch(packageReset());
      return true;
    } catch (err) {
      return false;
    }
  }
);
