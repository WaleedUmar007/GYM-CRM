import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  IAddUpdatePackageSuccessProp,
  IPackage,
  IPackageState,
} from "types/ReduxTypes/package";

const initialState: IPackageState = {
  packages: null,
  packageLoading: true,
};

/**
 * @param { IPackageState } state - current state
 * @returns { IPackageState } - returns same state.
 */
const returnSameState = (state: IPackageState): IPackageState => {
  return { ...state };
};

const packageSlice = createSlice({
  name: "package",
  initialState: initialState,
  reducers: {
    getPackageSuccess: (
      state,
      { payload }: PayloadAction<IPackageState["packages"]>
    ) => {
      state.packages = payload;
      state.packageLoading = false;
    },
    getPackagesFailure: (state) => {
      state.packageLoading = false;
    },
    deletePackageSuccess: (
      state,
      { payload }: PayloadAction<Array<string>>
    ) => {
      state.packages = state.packages?.filter((x) => {
        return !payload.includes(x._id.toString());
      });
    },
    addUpdatePackageSuccess: (
      state,
      { payload }: PayloadAction<IAddUpdatePackageSuccessProp>
    ) => {
      if (payload.action === "update") {
        state.packages = state.packages?.map((e) => {
          return payload.data._id === e._id ? payload.data : e;
        });
      } else if (payload.action === "create") {
        /*
        payload.exploit is array because api
        is able to add many exploits, 
        so it returns array of added exploits
        */
        state.packages = state.packages
          ? [...state.packages, payload.data]
          : [payload.data];
      }
    },
    deletePackageFailure: returnSameState,
    addUpdatePackageFailure: (state) => {
      return { ...state };
    },
    packageReset: () => {
      return { ...initialState };
    },
  },
});

export const {
  getPackageSuccess,
  getPackagesFailure,
  deletePackageFailure,
  deletePackageSuccess,
  addUpdatePackageSuccess,
  addUpdatePackageFailure,
  packageReset,
} = packageSlice.actions;

export default packageSlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<IPackageState>} state - The state of Package
 * @param {IPackageState} state.package - The state of Package state
 * @returns {IPackageState} returns Package state object
 */
export const PackageSelector = (state: {
  package: IPackageState;
}): IPackageState => {
  return state.package;
};
