import { http } from "@/utils";
import type {
  LoginPswResponseType,
  LoginType,
  registerType,
  sendCodeType,
} from "./loginServes.d";
export async function sendCode(params?: sendCodeType) {
  try {
    return await http.post("/insland/sms/sendCode", params);
  } catch (e) {
    Promise.reject(e);
  }
}

export async function registerServes(params?: registerType) {
  try {
    return await http.post("/insland/login/register", params);
  } catch (e) {
    Promise.reject(e);
  }
}

export async function LoginServes(
  params?: LoginType,
): Promise<LoginPswResponseType> {
  try {
    const { data } = await http.post("/insland/login/pswLogin", params);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}


export async function LoginMobileServes(
    params?: LoginType,
  ): Promise<LoginPswResponseType> {
    try {
      const { data } = await http.post("/insland/login/mobileLogin", params);
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  }