import { http } from "@/utils";

/**
 * 获取认证信息
 */
export const apiGetCertified = async (): Promise<ApiUserResult.UserAuthRet> => {
  try {
    const { data } = await http.post("/insland/user/getCertified");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * 一级认证
 */
export const apiFirstCertified = async (
  params: ApiUserParams.UserAuthParams,
) => {
  try {
    await http.post("/insland/user/firstCertified", params);
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * 修改用户信息
 */
export const apiUpdateUserInfo = async (
  params: ApiUserParams.UpdateUserInfoParams,
) => {
  try {
    await http.post("/insland/user/updateUserInfo", params);
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 * 退出登录
 */
export const apiLogout = async (): Promise<void> => {
  try {
    await http.post("/insland/login/logout");
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @returns 查询GAS 充值产品列表
 */
export const searchFree = async () => {
  try {
    const { data } = await http.post<ApiUserResult.GasRechargeVo[]>(
      "/insland/gas/product/list",
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 *
 * @param params amount productId
 * @returns
 */
export const getQrcode = async (params: ApiUserParams.QrCodeRequestParams) => {
  try {
    const { data } = await http.post("/insland/gas/recharge/qrcode", params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param params 获取消费记录
 * @returns
 */
export const consumptionRecord = async (params: ApiUserParams.RecordParams) => {
  try {
    const { data } = await http.post<ApiUserResult.PageRetCashLogVo>(
      "/insland/user/cashLog",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 *
 * @param params 获取充值记录
 * @returns
 */
export const rechargeRecord = async (params: ApiUserParams.RecordParams) => {
  try {
    const { data } = await http.post<ApiUserResult.PageRetGasOrderInfo>(
      "/insland/user/rechargeLog",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
/**
 *
 * @returns 同步数据
 */
export const fetchSynchronization = async () => {
  try {
    const { data } = await http.post("/insland/user/refreshBalance");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 获取用户信息
export const newGetUserInfo = async () => {
  try {
    const { data } =
      await http.post<ApiUserResult.UserInfoResponse>("/insland/user/info");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param params 绑定手机号
 */
export const bindphone = async (params: ApiUserParams.BindPhoneRequest) => {
  try {
    const { data } = await http.post("/insland/user/bindMobile", params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param params 修改登录密码
 * @returns
 */
export const handlerchangePsw = async (
  params?: ApiUserParams.ParamsRequestPsw,
) => {
  try {
    const { data } = await http.post("/insland/user/updatePsw", params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param params 初始化设置安全密码
 * @returns
 */
export const handlerSceurity = async (
  params: ApiUserParams.SceurityRequest,
) => {
  try {
    const { data } = await http.post(
      "/insland/user/setSecurityPassword",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 修改安全密码
export const handlerupdateSafety = async (
  params: ApiUserParams.UpdateSafetyRequest,
) => {
  try {
    const { data } = await http.post(
      "/insland/user/updateSecurityPassword",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 忘记安全密码
export const forgetHandler = async (params: ApiUserParams.ForgetPswRequest) => {
  try {
    const { data } = await http.post(
      "/insland/user/forgetSecurityPassword",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 我的铭文记录
export const fetchDataInscript = async (
  params: ApiUserParams.MineTickParams,
) => {
  try {
    const { data } = await http.post<ApiUserResult.PageRetMineTickHoldsVo>(
      "/insland/user/mineTickHolds/list",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject("er" + error);
  }
};
