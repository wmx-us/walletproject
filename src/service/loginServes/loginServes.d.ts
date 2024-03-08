type registerParams = {
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

export interface registerType {
  encData:string,
  data:registerParams
}

export interface sendCodeType {
  
}
/**
 * SecretKeyParams«SendCodeParams»
 */
export interface SendPramsRequest {
  /**
   * 函数参数
   */
  data?: SendCodeParams;
  /**
   * 校验成功时返回的验证信息
   */
  encData?: string;
}

/**
* 函数参数
*
* SendCodeParams
*/
export interface SendCodeParams {
  /**
   *
   * 事件：register=注册，resetpwd=设置密码，changepwd=修改密码，changemobile=修改手机号，profile=修改资料，mobilelogin=验证码登录
   */
  event?: string;
  /**
   * 手机号
   */
  mobile?: string;

}
type LoginData = {
  username: string,
  code: string,
  deviceCode: string
}

export type LoginType = {
    encData:string,
    data: LoginData
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

/**
 * RefreshTokenRet
 */
export interface RefreshTokenRet {
  /**
   * 新TOKEN
   */
  token?: string;
  /**
   * token过期时间
   */
  tokenExpireTime?: number 
}

export interface ForgetRequest {
  /**
   * 验证码
   * (发送短信验证 /sms/sendCode event 为changepwd)
   */
  code?:  string;
  /**
   * 修改后密码
   */
  psw?:  string;
  /**
   * 确认后密码
   */
  psw2?:  string;
  /**
   * 用户名
   */
  username?:  string;
}