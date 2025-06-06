import { BackendInstance } from "@/config";

/**
 * Set csrf token as token recieved from backend
 *
 * @param {string} token - token recieved from backend
 */
export const setCsrfToken = (token?: string) => {
  if (token) {
    // axios.defaults.headers.common['x-auth-token'] = token;
    Object.assign(BackendInstance.defaults.headers.common, {
      "x-csrf-token": token,
    });
  } else {
    // delete axios.defaults.headers.common['x-auth-token'];
    delete BackendInstance.defaults.headers.common["x-csrf-token"];
  }
};
