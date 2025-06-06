import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeSecondaryToken } from "@/utils/Logout";
import type { AuthState } from "types/ReduxTypes/auth";

// TODO change this state by maniging it from redux
const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    userLoaded: (state, { payload }: PayloadAction<AuthState>) => {
      state.isAuthenticated = payload.isAuthenticated;
      state.loading = false;
      state.user = payload.user;
    },
    csrfSuccess: (state) => {
      return state;
    },
    loginSuccess: (state) => {
      return state;
    },
    loginFailure: (state) => {
      return state;
    },
    authReset: () => {
      removeSecondaryToken();
      return {
        ...initialState,
        loading: false,
      };
    },
  },
});

export const { userLoaded, csrfSuccess, loginSuccess, authReset } =
  AuthSlice.actions;

export default AuthSlice.reducer;

/**
 * Exported selector for usage in components
 *
 * @param {Object<AuthState>} state - The state of authentication
 * @param {AuthState} state.auth - The state of auth state
 * @returns {AuthState} returns auth state object
 */
export const AuthSelector = (state: { auth: AuthState }): AuthState => {
  return state.auth;
};
