import { action, makeAutoObservable, observable } from "mobx";

type ConfigCaptcha = {
  publicKey?: string;
  style?: {
    btnUrl: string;
    bgUrl: string;
    logoUrl: string;
    moveTrackMaskBgColor: string;
    moveTrackMaskBorderColor: string;
  };
};

class Login {
  @observable
  state: {
    isRegister: boolean;
    config: ConfigCaptcha;
  } = {
    isRegister: true,
    config: {},
  };

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setChangeType(value: boolean) {
    this.state.isRegister = value;
  }

  @action
  setConfig(value:ConfigCaptcha) {
    this.state.config = value
  }
}
export default new Login();
