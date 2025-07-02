import store from "@/appRedux/store";
import { logout } from "@/appRedux/actions/authAction";
import { AuthErrors } from "@/types";

/**
 * Error handler for different response types
 *
 * @param {any} e - Error object
 * @returns {Array<object>} arrays of error messages
 */
export const handlerError = (e: any) => {
  const UNAUTHORIZED = 401;
  const NETWORK_ERROR = 0;
  if (e.response && e.response.status === NETWORK_ERROR) {
    return ["Internal server error, please try again later"];
  }
  try {
    if (e.response) {
      if (e.response.status === UNAUTHORIZED) {
        /**
         * Following check is necessary ti prevent
         * from infinite loop.
         */
        if (store.getState().auth.isAuthenticated) {
          store.dispatch(logout());
          return [AuthErrors.LogOut];
        }
        return [AuthErrors.LoginNeeded];
      }
      console.log(e.response.message);
      console.log(e.response.data);
      return e.response.errors && Array.isArray(e.response.errors)
        ? e.response.errors.map((err: any) => {
            return err.msg;
          })
        : e.response.message
        ? [e.response.message]
        : e.response.data && e.response.data.message && Array.isArray(e.response.data.message)
        ? e.response.data.message
        : e.response.data && e.response.data.message
        ? [e.response.data.message]
        : e.response.data.errors && Array.isArray(e.response.data.errors)
        ? e.response.data.errors.map((err: any) => {
            return err.msg;
          })
        : ["Error Occured!"];
    }
    console.log(e.message);
    console.log(typeof e.message);
    if (Array.isArray(e.message)) {
      return e.message;
    }
    return [e.message];
  } catch (err: any) {
    return [err.message];
  }
};
