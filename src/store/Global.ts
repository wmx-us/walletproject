
import { observable, action, makeAutoObservable } from "mobx";
// import { LocalStorage } from "@/utils";
// import { getList } from "@/service";

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
        token: Nullable<string>;
        menus: Nullable<MenuType[]>;
        pathname: Nullable<string>;
    } = {
            // cdn: import.meta.env.PROJECT_NUWA_CDN, // 从环境变量读取的 CDN 地址
            // HD_APP_PREFIX: import.meta.env.PROJECT_ENV_PREFIX, // 从环境变量读取的 CDN 地址
            token: "", // 用户token
            menus: null, // 从接口获取的菜单
            pathname: null, // 当前跳转的path
        };



    constructor() {
        makeAutoObservable(this);
        // this.init();
        // this.initToken();
    }

    @action
    private initToken() {
        // const result: any = {
        //   token:
        //     "eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6IjE2MjYwMzcwNDMxOTgwOTEyNjUiLCJleHAiOjE2ODgwMDQ0MjEsInVzZXJJZCI6IjE2MjYwMzcyOTM2Mzk5ODMxMDUiLCJhY2NvdW50IjoienlxeSJ9.98sMH50LwcFS9ZsaBogHEoZFjyXC4DYpO0EHprQbuRQ",
        //   "X-Client-Type": "saas_web",
        // };
        // localStorage.setItem("headers", JSON.stringify(result));
        // if (localStorage.getItem("result")) {
        //   console.log(
        //     "233",
        //     JSON.parse(localStorage.getItem("result") as string).token
        //   );
        // }

        // this.token = result.token;

    }

    @action
    private init(): void {
        // this.state.token = LocalStorage.getItem("token") as string;
    }

    // 获取拍平的菜单
    // @action
    // get flatMenus(): MenuType[] {
    //   return flatDeep((this.state.menus ?? []) as MenuType[], 5) ?? [];
    // }

    // 获取默认的菜单

    // get defaultMenu() {
    //     return this.getNestedMenu(this.state.menus);
    // }

    @action
    updateToken(): void {
        // this.state.token = token;
        // LocalStorage.set("token", token);
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
}

export default new GlobalStore();