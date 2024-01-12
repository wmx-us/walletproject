
import { observable, action, makeAutoObservable } from "mobx";
// import { LocalStorage } from "@/utils";
// import { getList } from "@/service";
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { LocalStorage } from "@/utils";
import type { LoginPswResponseType } from "@/service/loginServes/loginServes.d";
import { apiLogout } from "@/service/user/api";
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
        visitorId: string
        userInfo?: LoginPswResponseType
    } = {
            // cdn: import.meta.env.PROJECT_NUWA_CDN, // 从环境变量读取的 CDN 地址
            // HD_APP_PREFIX: import.meta.env.PROJECT_ENV_PREFIX, // 从环境变量读取的 CDN 地址
            menus: null, // 从接口获取的菜单
            pathname: null, // 当前跳转的path
            visitorId: "",
        };



    constructor() {
        makeAutoObservable(this);
        this.getUserInfo();
        // this.initToken();
    }

    @action
    async getUUid() {
        const fpPromise = FingerprintJS.load()
        const fp = await fpPromise
        const result = await fp.get()
        this.state.visitorId = result.visitorId
        // LocalStorage.set("UUID",result)
    }

    @action
    private getUserInfo(): void {
        const userInfo = LocalStorage.getItem("userInfo") as LoginPswResponseType
        if (userInfo) {
            this.state.userInfo = userInfo
            this.state.token = userInfo.token
        }
    }
    @action
    initUserInfo(userInfo: LoginPswResponseType): void {
        this.state.userInfo = { ...this.state.userInfo, ...userInfo }
        this.state.token = userInfo?.token;
        LocalStorage.set("userInfo", userInfo)
    }

    @action
    updateMenus(menus: Nullable<MenuType[]>): void {
        this.state.menus = menus;
        // LocalStorage.set("menus", menus);
    }

    @action
    updateRoute(location: Location): void {
        this.state.pathname = location.pathname;
    }

    @action
    private getNestedMenu(
        source?: MenuType[] | null
    ): Nullable<MenuType> | undefined {
        return source?.map((menu) => {
            if (menu.redirect || menu.filePath) return menu;
            if (menu.children?.length) return this.getNestedMenu(menu.children);
            return null;
        })?.[0];
    }

    @action
    clear(): void {
        // this.state.token = null;
        this.state.menus = null;
        // LocalStorage.remove("token");
        // LocalStorage.remove("menus");
    }

    @action
    logout = async (): Promise<void> => {
        try {
            await apiLogout()
            delete this.state.userInfo
            delete this.state.token
            LocalStorage.remove('userInfo')
        } catch (error) {
            return Promise.reject(error)
        }

    }
}

export default new GlobalStore();