import axios from "axios";
// eslint-disable-next-line no-process-env
export const env = window.env.REACT_APP_CUSTOM_ENVIRONMENT;
export const backendUrl = window.env.REACT_APP_BACKEND_API as string;

export const BackendInstance = axios.create({
  baseURL: `${backendUrl}/`,
  withCredentials: true,
});

export const config = {
  headers: {
    "Content-Type": "application/json", // application/x-www.form-urlencoded
  },
};
