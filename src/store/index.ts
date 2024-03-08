import Global from "./Global";
import Login from "./Login";
import Inscription from "./Inscription"
import OverView from "./OverView";
const store = {
    Global,
    Login,
    Inscription,
    OverView,
};

export default store;

export type GlobalStore = typeof store
export type GlobalKey = keyof GlobalStore