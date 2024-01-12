import { useRoutes } from "react-router-dom";
import { routerArray } from "./routes";



const Router = () => {
    const routes = useRoutes(routerArray)
    return routes;
}

export default Router