import axios from "axios";
// eslint-disable-next-line no-process-env
export const env = import.meta.env.VITE_CUSTOM_ENVIRONMENT;
export const backendUrl = import.meta.env.VITE_BACKEND_API_URL as string;
console.log(backendUrl);

export const BackendInstance = axios.create({
  baseURL: `${backendUrl}/`,
  withCredentials: true,
});

export const config = {
  headers: {
    "Content-Type": " application/json ", // application/x-www.form-urlencoded
  },
};
