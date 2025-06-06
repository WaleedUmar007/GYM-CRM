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
    const body = JSON.stringify(formData);
    try {
      const res = await BackendInstance.post("auth/login", body, config);
      const responseData = res.data.data as ILoginResponseData;

      dispatch(loginSuccess());
      dispatch(loadUser());
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
  async (_, { dispatch }) => {
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
  async (_, { dispatch }) => {
    let returnValue = false;
    try {
      /*
          {FOR OFFLINE USE}
          First call api then dispatch
          action beacuse logout requires
          secondary token while dispatching
          logout action remove that.
          */
      await userLogout();
      const csrfRequest = await BackendInstance.get("csrf");
      setCsrfToken(csrfRequest.data.data.csrfToken);
      /**
       * for microsoft logout use following href (if needed)
       * window.location.href =
       * "https://login.microsoftonline.com/common/oauth2/v2.0logoutpost_logout_redirect_uri=http://localhost:3000/redirect?logout=true";
       */

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
      dispatch(authReset());
      return true;
    } catch (err) {
      return false;
    }
  }
);
