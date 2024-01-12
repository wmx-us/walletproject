import Global from "./Global";
import Login from "./Login";
import Inscription from "./Inscription"
const store = {
    Global,
    Login,
    Inscription,
};

export default store;

export type GlobalStore = typeof store
export type GlobalKey = keyof GlobalStore