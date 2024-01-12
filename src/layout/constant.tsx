import type { MenuProps } from 'antd';

export interface MenuType {
    label:string,
    key:string,
    path?:string,
    children?:MenuType[],
}
export const menu: MenuProps["items"] = [
    {
        label: "首页",
        key:"home",
        
    },
    {
        label: "总览",
        key:"overview",
    },
    {
        label: "铭文",
        key:"inscription",
    },
    {
        label: "帮助",
        key:"help",
    },
    {
        label: "推荐铭文",
        key:"recommend_inscription",
    },
]
