import { Navigate, RouteObject } from "react-router-dom";
// import { RouteObject ,} from "./interface";
import { lazy } from "react";


// eslint-disable-next-line react-refresh/only-export-components
const Layout = lazy(() => import("@/layout/index"));

// * 处理路由
// export const routerArray: RouteObject[] = [];
export const rootRouter: RouteObject[] = [
    {
        path:"/",
        element: <Navigate to="/home"/>
    },
    {
        path:"/home",
        element: <Layout/>,
        children:[
            {
                path:"/home",
                element:<>测试</>
            }
        ]
    },
    {
        path:"/login",
        element:<div>111</div>,
        // meta:{
        //     requiresAuth:false,
        //     title:"登录页",
        //     key:"login",
        // }
    },
    // ...routerArray,
    {
        path:"*",
        element: <Navigate to="/404"/>
    }
]

export const routes: Array<RouteObject> = rootRouter.map((item) => {
    return {
        path:item.path,
        element: item.element,
        children:item.children,
    }
})
