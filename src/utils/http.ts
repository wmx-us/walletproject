
import { httpClient } from "./httpClient";

export const http = httpClient({
  // baseURL: import.meta.env.PROJECT_ENV_PREFIX,
  baseURL: "",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "X-Client-Type": "walleft_project_web",
  },
});
