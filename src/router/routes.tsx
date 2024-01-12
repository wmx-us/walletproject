

import React from "react";
import { RouteObject } from "./interface";
import LayoutIndex from "@/layout";
import lazyLoad from "./utils/lazyLoad";
import { Navigate } from "react-router-dom";


export const routerArray: Array<RouteObject> = [
    {
        path: "/",
        meta: {
            title: "首页"
        },
        element: <Navigate to="/home" />
    },
    {
        path: "/login",
        meta: {
            title: "登录",
        },
        element: lazyLoad(React.lazy(() => import("@/pages/Login")))
    },
    {
        // path:"*",
        element: <LayoutIndex />,
        meta: {
            title: "主页",
            // requiresAuth: true
        },
        children: [
            {
                path: "/home",
                meta: {
                    title: "首页"
                },
                element: lazyLoad(React.lazy(() => import("@/pages/Home/index"))),
            },
            {
                path: "/overview",
                meta: {
                    title: "总览",
                },
                element: lazyLoad(React.lazy(() => import("@/pages/Overview"))),
                children: []
            },
            {
                path: "/overview/details",
                element: lazyLoad(React.lazy(() => import("@/pages/Overview/details")))
            },
            {
                path:"/help",
                meta: {
                    title:"帮助"
                },
                element: lazyLoad(React.lazy(() => import("@/pages/Help/index")))
            },
            {
                path:"/recommend_inscription",
                meta: {
                    title:"推荐铭文"
                },
                element: lazyLoad(React.lazy(() => import("@/pages/recommendInscription/index")))
            },
            //*  个人中心
            {
                // path: "/user",
                meta: {
                    title: "个人中心"
                },
                element: lazyLoad(React.lazy(() => import("@/layout/components/User"))),
                children: [
                    {
                        path: "/user/balance",
                        element: lazyLoad(React.lazy(() => import("@/pages/User/balance")))
                    },
                    {
                        path: "/user/center",
                        element: lazyLoad(React.lazy(() => import("@/pages/User/userCenter")))
                    },
                    {
                        path: "/user/verified",
                        element: lazyLoad(React.lazy(() => import("@/pages/User/verified")))
                    },
                    {
                        path: "/user/edit",
                        element: lazyLoad(React.lazy(() => import("@/pages/User/edit")))
                    },
                    {
                        path: "/user/inscription",
                        element: lazyLoad(React.lazy(() => import("@/pages/User/userInscription")))
                    },
                ]
            },
            {
                path:"/give",
                element:lazyLoad(React.lazy(() => import("@/pages/Give/index")))
            },

            //*  铭文模块
            {
                path: "/inscription",
                meta: {
                    title: "铭文"
                },
                element: lazyLoad(React.lazy(() => import("@/pages/Inscription"))),
                children: []
            },
            {
                path: "/inscription/detail",
                meta: {
                    title: "铭文详情页"
                },
                element: lazyLoad(React.lazy(() => import("@/pages/Inscription/detailPage"))),
            },
            {
                path: "/inscription/createInscription",
                element: lazyLoad(React.lazy(() => import("@/pages/Inscription/createInscription"))),
                meta: {
                    title: "创建铭文"
                }
            },
            {
                path: "/inscription/payment",
                element: lazyLoad(React.lazy(() => import("@/pages/Inscription/payment"))),
                meta: {
                    title: "支付"
                }
            },
        ]
    },
    {
        path: "/403",
        element: lazyLoad(React.lazy(() => import("@/components/Error/403"))),
        meta: {
            requiresAuth: true,
            title: "403页面",
            key: "403"
        }
    },
    {
        path: "/404",
        element: lazyLoad(React.lazy(() => import("@/components/Error/404"))),
        meta: {
            requiresAuth: false,
            title: "404页面",
            key: "404"
        }
    },
    {
        path: "/500",
        element: lazyLoad(React.lazy(() => import("@/components/Error/500"))),
        meta: {
            requiresAuth: false,
            title: "500页面",
            key: "500"
        }
    }
]

