/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, makeAutoObservable, observable } from "mobx";

class Login {
    
    @observable
    state: {

        current: number;
    } = {
            current: 0,

        };

    constructor() {
        makeAutoObservable(this);
    }

    @action
    setCurrent(value: number) {
        this.state.current = value;
    }

    //   @action
    //   setTopPerson(value: boolean) {
    //     this.state.topPerson = value;
    //   }

}
export default new Login();