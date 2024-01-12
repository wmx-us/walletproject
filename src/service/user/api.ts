import { http } from "@/utils"

/**
 * 获取认证信息
 */
export const apiGetCertified = async (): Promise<ApiUserResult.UserAuthRet> => {
  try {
    const { data } = await http.post('/insland/user/getCertified')
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
/**
 * 一级认证
 */
export const apiFirstCertified = async (params: ApiUserParams.UserAuthParams) => {
  try {
    await http.post('/insland/user/firstCertified', params)
  } catch (error) {
    return Promise.reject(error)
  }
}
/**
 * 修改用户信息
 */
export const apiUpdateUserInfo = async (params: ApiUserParams.UpdateUserInfoParams) => {
  try {
    await http.post('/insland/user/updateUserInfo', params)
  } catch (error) {
    return Promise.reject(error)
  }
}
/**
 * 退出登录
 */
export const apiLogout = async (): Promise<void> => {
  try {
    await http.post('/insland/login/logout')
  } catch (error) {
    return Promise.reject(error)
  }
}