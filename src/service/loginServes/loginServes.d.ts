export interface registerType {
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 密码
   */
  psw: string;
  /**
   * 确认密码
   */
  psw2: string;
  /**
   * 校验码
   */
  code: string;
}

export interface sendCodeType {

}

export type LoginType = {
    mobile: string,
    code: string,
    deviceCode: string
}

export type LoginPswResponseType = {
    "token": string,
    "hashId": string,
    "nickname": string,
    "address": string,
    "mobile": string,
    "email": string,
    "avatar": string,
    "gas": number,
    "tokenExpireTime": number,
    "isAuth": 0|1,
    "isSecurityPassword": 0|1,
    "cancellation": 0|1
}