import { action, makeAutoObservable, observable } from "mobx";

class Login {

    @observable
    state: {
        isRegister: boolean

    } = {
            isRegister: true

        };

    constructor() {
        makeAutoObservable(this);
    }

    @action
    setChangeType(value: boolean) {
        this.state.isRegister = value
    }


}
export default new Login();