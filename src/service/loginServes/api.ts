import { http } from "@/utils";
import type {
  ForgetRequest,
  LoginPswResponseType,
  LoginType,
  RefreshTokenRet,
  SendPramsRequest,
  registerType,
  sendCodeType,
} from "./loginServes";
import { message } from "antd";
import axios from "axios";

/**
 *
 * @param params 发送验证码
 * @returns
 */
export async function sendCode(params?: SendPramsRequest) {
  try {
    return await http.post("/insland/sms/sendCode", params);
  } catch (e) {
    Promise.reject(e);
  }
}

/**
 * 
 * @param params 忘记密码发送验证码
 * @returns 
 */
export async function forgetPswSendCode(params?:sendCodeType) {
  try {
    return await http.post("/insland/sms/forgetPsw/sendCode", params);
  } catch (e) {
    Promise.reject(e);
  }
}
/**
 *
 * @param params 注册账号
 * @returns
 */
export async function registerServes(params?: registerType) {
  try {
    return await http.post("/insland/login/register", params);
  } catch (e) {
    Promise.reject(e);
  }
}

/**
 *
 * @param params 密码登录
 * @returns
 */
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

/**
 *
 * @param params 手机号登录
 * @returns
 */
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

/**
 * 刷新token
 */
export async function refreshToken() {
  try {
    const { data } = await http.post<RefreshTokenRet>(
      "/insland/login/refreshToken",
    );
    return data;
  } catch (error) {
    message.error("er" + error);
  }
}

// 初始化配置信息
export async function getConfig() {
  try {
    const { data, status } = await axios.get(
      "http://insland.test.szyz.top:8083/captcha/captchaConfig",
    );
    if (status && status == 200) {
      if (data.code == 200) {
        return data.data;
      } else {
        message.error(data?.msg);
      }
    } else {
      return Promise.reject("errr");
    }
  } catch (error) {
    message.error("err" + error);
  }
}



export async function forgetPassword (params:ForgetRequest) {
  try {
    const {data} = await http.post("/insland/user/forgetPsw",params)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}