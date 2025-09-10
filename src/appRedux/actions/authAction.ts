import { BackendInstance, config } from "@/config";
import { setCsrfToken } from "@/utils/CsrfToken";
import { handlerError } from "@/utils/ErrorHandler";
import { updateAlert } from "./alertAction";
import { userLogout } from "@/utils/Logout";
import { createAsyncThunk } from "@reduxjs/toolkit";

// types
import type {
  ILoginFormData,
  ILoginResponseData,
} from "@/types/ReduxTypes/auth";
import { RESET } from "@/appRedux/events";

// reducers
import {
  userLoaded,
  csrfSuccess,
  loginSuccess,
  authReset,
} from "../reducers/authReducer";
import type { IUser } from "@/types/ReduxTypes/user";

/**
 * creates user session and logs them in
 *
 * @returns {boolean} true if login form is valid and successful, false otherwise
 */
export const login = createAsyncThunk(
  "auth/login",
  async (formData: ILoginFormData, { dispatch }) => {
    // Check for inventory admin credentials from local JSON
    try {
      const inventoryCredentials = await import("@/data/inventoryCredentials.json");
      const { inventoryAdmin } = inventoryCredentials.default || inventoryCredentials;
      
      if (formData.email === inventoryAdmin.email && formData.password === inventoryAdmin.password) {
        console.log('AuthAction: Inventory admin login detected from JSON');
        
        dispatch(loginSuccess());
        dispatch(
          userLoaded({
            user: inventoryAdmin.user,
            isAuthenticated: true,
            loading: false,
          })
        );
        
        console.log('AuthAction: Inventory admin user loaded from JSON');
        return { user: inventoryAdmin.user };
      }
    } catch (error) {
      console.log('AuthAction: Could not load inventory credentials, continuing with backend auth');
    }

    const body = JSON.stringify(formData);
    try {
      const res = await BackendInstance.post("auth/login", body, config);
      const responseData = res.data.data as ILoginResponseData;

      dispatch(loginSuccess());
      // Set user data directly from login response instead of calling loadUser
      dispatch(
        userLoaded({
          user: responseData.user,
          isAuthenticated: true,
          loading: false,
        })
      );
      return responseData;
    } catch (err) {
      handlerError(err).forEach((error: string) => {
        dispatch(updateAlert({ place: "tc", message: error, type: "danger" }));
      });

      dispatch(authReset());
      return false;
    }
  }
);

/**
 * loads current user to state
 *
 * @returns {boolean} true if user is loaded successfully
 */
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { dispatch, getState }) => {
    // Check if we already have a user loaded (especially for inventory admin)
    const state = getState() as any;
    const currentUser = state.auth?.user;
    
    if (currentUser && currentUser.organization === "Inventory") {
      console.log('LoadUser: Inventory admin already loaded, skipping API call');
      return true;
    }

    try {
      const csrfRequest = await BackendInstance.get("auth/csrf");
      setCsrfToken(csrfRequest.data.data.csrfToken);
      dispatch(csrfSuccess());
      const res = await BackendInstance.get("auth/authorization");
      dispatch(
        userLoaded({
          user: { ...res.data.data.user } as IUser,
          isAuthenticated: true,
          loading: false,
        })
      );
      return true;
    } catch (err) {
      dispatch(authReset());
      return false;
    }
  }
);

/**
 * Logs out user and clears session
 *
 * @returns {boolean} true if the session is cleared, false otherwise
 */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, getState }) => {
    let returnValue = false;
    
    // Check if this is inventory admin logout
    const state = getState() as any;
    const currentUser = state.auth?.user;
    const isInventoryAdmin = currentUser && currentUser.organization === "Inventory";
    
    try {
      if (!isInventoryAdmin) {
        /*
            {FOR OFFLINE USE}
            First call api then dispatch
            action beacuse logout requires
            secondary token while dispatching
            logout action remove that.
            */
        await userLogout();
        const csrfRequest = await BackendInstance.get("auth/csrf");
        setCsrfToken(csrfRequest.data.data.csrfToken);
        /**
         * for microsoft logout use following href (if needed)
         * window.location.href =
         * "https://login.microsoftonline.com/common/oauth2/v2.0logoutpost_logout_redirect_uri=http://localhost:3000/redirect?logout=true";
         */
      }

      returnValue = true;
    } catch (err) {
      // handlerError(err).forEach((error) => dispatch(setAlert('tc', error, 'danger')));
      return returnValue;
    } finally {
      /*
          If api return error, still
          dispatch action so that user 
          states are clear and secindary 
          token is removed
          */
      // Clear inventory admin from localStorage if present
      localStorage.removeItem('inventoryAdmin');
      
      dispatch({ type: RESET });
      dispatch(authReset());
      // eslint-disable-next-line no-unsafe-finally
      return returnValue;
    }
  }
);

/**
 * Reset all auth tokens and vars
 *
 * @returns {boolean} true if Auth is reset successfully
 */
export const resetAuth = createAsyncThunk(
  "auth/resetAuth",
  async (_, { dispatch }) => {
    try {
      // Clear inventory admin from localStorage
      localStorage.removeItem('inventoryAdmin');
      dispatch(authReset());
      return true;
    } catch (err) {
      return false;
    }
  }
);
