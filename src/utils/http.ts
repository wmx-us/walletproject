
import { AxiosRequestConfig } from "axios"
import { httpClient } from "./httpClient"

export const http = httpClient({
  baseURL: import.meta.env.PROJECT_ENV_PREFIX,
  timeout:10000,
  headers: {
    "X-Client-Type": "walleft_project_web",
  },
  beforeRequestHandler: (config: AxiosRequestConfig) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: (localStorage.getItem("token") as string) || "eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6IjE2MjYwMzcwNDMxOTgwOTEyNjUiLCJleHAiOjE2ODg2MDc4MDYsInVzZXJJZCI6IjE2MjYwMzcyOTM2Mzk5ODMxMDUiLCJhY2NvdW50IjoienlxeSJ9.2TveVo5B_CmH74Z5ooYbosvc600dVUNax62U0BtR8iE",
    },
  }),
})