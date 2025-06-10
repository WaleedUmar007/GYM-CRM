import { combineReducers } from "@reduxjs/toolkit";
import { RESET } from "../events";

// reducers
import authReducer, { AuthSelector } from "./authReducer";
import alertReducer, { AlertSelector } from "./alertReducer";
import userReducer, { UserSelector } from "./userReducer";
import packageReducer, { PackageSelector } from "./packageReducer";
import dashboardReducer, { DashboardSelector } from "./dashboardReducer";
import membershipReducer, { MembershipSelector } from "./membershipReducer";

const appReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  package: packageReducer,
  dashboard: dashboardReducer,
  membership: membershipReducer,
});

export {
  AuthSelector,
  AlertSelector,
  UserSelector,
  PackageSelector,
  DashboardSelector,
  MembershipSelector,
};

export type RootState = ReturnType<typeof appReducer>;

/**
 * Resets state on logout if needed
 *
 * @param {RootState} state - current action state dispatched from actions
 * @param {any} action - current action dispatched
 * @returns {Reducer<CombinedState>} returns combined state
 */
export const rootReducer = (state: RootState, action: any) => {
  if (action.type === RESET) {
    return appReducer({} as RootState, action);
  }
  return appReducer(state, action);
};

export default appReducer;
