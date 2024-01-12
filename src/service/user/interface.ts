/* eslint-disable @typescript-eslint/no-namespace */

namespace ApiUserParams {
  export interface UserAuthParams {
    /**
     * 身份证号
     */
    idCardNumber?: null | string;
    /**
     * 姓名
     */
    name?: null | string;
  }

  export interface UpdateUserInfoParams {
    /**
     * 性别
     */
    gender?: number | null;
    /**
     * 昵称
     */
    nickname?: null | string
  }
}

namespace ApiUserResult {
  export type UserAuthRet = {
    /**
     * 姓名
     */
    realName: string
    /**
     * 手机号
     */
    phone: string
    /**
     * 身份证号
     */
    idcardNumber: string
    /**
     * 认证状态
     */
    isAuth: 0 | 1 | 2
    /**
     * 是否设置了支付密码：1=是，0=否
     */
    isSecurityPassword: 1 | 0
  }
}