import { observable, action, makeAutoObservable } from "mobx";
// import { LocalStorage } from "@/utils";
// import { getList } from "@/service";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { LocalStorage } from "@/utils";
import type { LoginPswResponseType } from "@/service/loginServes/loginServes.d";
import { apiLogout, newGetUserInfo } from "@/service/user/api";
import { message } from "antd";
export type AncestorsReturns = {
  currentKeys: string[];
  currentMenus: MenuType[];
};

export interface MenuConfig extends AncestorsReturns {
  width: number; // sider的宽度
  secondaryMenus: Array<Partial<MenuType>>; // 展开的菜单
}

class GlobalStore {
  @observable
  state: {
    // cdn: string;
    // HD_APP_PREFIX: string;
    token?: string;
    menus: Nullable<MenuType[]>;
    pathname: Nullable<string>;
    visitorId: string;
    userInfo?: LoginPswResponseType;
    newUserInfo?: ApiUserResult.UserInfoResponse;
  } = {
    // cdn: import.meta.env.PROJECT_NUWA_CDN, // 从环境变量读取的 CDN 地址
    // HD_APP_PREFIX: import.meta.env.PROJECT_ENV_PREFIX, // 从环境变量读取的 CDN 地址
    menus: null, // 从接口获取的菜单
    pathname: null, // 当前跳转的path
    visitorId: "",
    newUserInfo: {},
  };

  constructor() {
    makeAutoObservable(this);
    this.getUserInfo();
    // this.initToken();
  }

  /**
   * 生成UUID
   */
  @action
  async getUUid() {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    this.state.visitorId = result.visitorId;
    // LocalStorage.set("UUID",result)
  }

  @action
  private getUserInfo(): void {
    const userInfo = LocalStorage.getItem("userInfo") as LoginPswResponseType;
    if (userInfo) {
      this.state.userInfo = userInfo;
      this.state.token = userInfo.token;
    }
  }

  /**
   *
   * @param userInfo 设置本地的用户信息
   */
  @action
  setUserInfo(userInfo: LoginPswResponseType): void {
    this.state.userInfo = { ...this.state.userInfo, ...userInfo };
    this.state.token = userInfo?.token;
    LocalStorage.set("userInfo", userInfo);
  }

  /**
   * 获取接口用户信息
   */
  @action
  async newUpdateUserInfo() {
    try {
      const data = await newGetUserInfo();
      console.log('新的data', data)
      this.state.newUserInfo = data;
    } catch (error) {
      message.error("er" + error);
    }
  }

  /**
   *
   */
  @action
  clear(): void {
    this.state.token = "";
    if (this.state.userInfo) {
      this.state.userInfo.token = "";
      this.state.userInfo.tokenExpireTime = 0;
    }
    LocalStorage.set("userInfo", this.state.userInfo);
    // LocalStorage.remove("token");
  }

  @action
  logout = async (): Promise<void> => {
    try {
      await apiLogout();
      delete this.state.userInfo;
      delete this.state.token;
      LocalStorage.remove("userInfo");
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new GlobalStore();
