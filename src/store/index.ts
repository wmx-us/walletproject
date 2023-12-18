import Global from "./Global";
import Login from "./Login";

const store = {
    Global,
    Login
};

export default store;

export type GlobalStore = typeof store
export type GlobalKey = keyof GlobalStore