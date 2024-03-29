import {
  Button,
  Checkbox,
  //   Checkbox,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  message,
} from "antd";
import { useEffect } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
// import { useNavigate } from "react-router-dom";

import { useInject } from "@/hooks/inject";
import Gap from "@/components/Gap";
import MD5 from "md5";
import "../index.scoped.css";
import "../index.css";
import { getConfig, registerServes } from "@/service/loginServes/api";
import type { registerType } from "@/service/loginServes/loginServes.d";

import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
import "@/assets/captcha/css/tac.css";
import "@/assets/captcha/js/tac.min.js";
import { reg, regUsename } from "../captchaConfig";
import { configAddress } from "@/config";

const RegisterCom: React.FC = useInject(["Login", "Global"])(({ Login }) => {
  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [seconds, setSeconds] = useState<number>(3);
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // 发送验证码
  // const handleVerfity = async () => {
  //   setIsSubmitting(true);
  //   setSeconds(3);
  //   const values = await form.getFieldsValue();
  //   const params: sendCodeType = {
  //     mobile: values?.mobile,
  //     event: "register",
  //     deviceCode: Global.state.visitorId,
  //   };
  //   await sendCode(params);
  // };
  /**
   * 注册
   */
    // 初始化 配置数据
  const getConfigCaptcha = async () => {
      const config = await getConfig()
      console.log('config', config)
      Login.setConfig(config)
  };
  const registerHandler = async () => {
    
    (window as any).TAC.enc.rsaPublicKey = Login.state.config?.publicKey;
    const config = {
      ...configAddress,
      validSuccess: async (
        res: any,
        c: any,
        tac: { destroyWindow: () => void },
      ) => {
        console.log("res,c", res, c);
        try {
          const values = form.getFieldsValue();
          const params: registerType = {
            encData: res?.data,
            data: {
              ...values,
              psw: MD5(MD5(values?.psw)),
              psw2: MD5(MD5(values.psw2)),
            },
          };
          await registerServes(params);
          message.success("注册成功！");
          Login.setChangeType(true);
        } catch (error) {
          message.error("er" + error);
        }
        tac.destroyWindow();
      },
    };
    new (window as any).TAC(config, Login.state.config).init();
  };

  // 切换登录
  const hanlderLogin = () => {
    Login.setChangeType(true);
  };

  useEffect(() => {
    getConfigCaptcha()
  },[])
  useEffect(() => {
    // 参数绑定给全局使用
    window.CryptoJS = CryptoJS;
    // (window as any).jQuery = jQuery;
    (window as any).JSEncrypt = JSEncrypt;
  }, []);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setSeconds((prevSeconds) => prevSeconds - 1);
  //   }, 1000);
  //   if (seconds === 0) setIsSubmitting(false);
  //   return () => clearInterval(timer);
  // }, [seconds]);
  return (
    <div className="login_frame">
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultColor: "rgba(255, 255, 255, 0.589)",
              defaultBorderColor: "#89B5FF",
            },
          },
        }}
      >
        <Row justify="space-around" className="login_top">
          <Col className="title_login" span={8}>
            注册
          </Col>
          <Col className="title_ri" span={6}>
            <div className="no-account">已有账号？</div>
            <div className="register" onClick={hanlderLogin}>
              <span>去登录</span>
            </div>
          </Col>
        </Row>
      </ConfigProvider>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#5E62FF",
              colorPrimaryHover: "#4D51FF",
            },
            Input: {
              activeBg: "#0E1D3C",
              activeBorderColor: "#89B5FF",
              colorBgContainer: "#0E1D3C",
              colorBorder: "#89B5FF",
            },
          },
          token: {
            colorBorder: "#89B5FF",
            controlHeight: 40,
          },
        }}
      >
        <Row justify="center" className="form">
          <Form
            name="login"
            // onValuesChange={handleFormChange}
            // onFinish={loginHandler}
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "请输入用户名" },
                // { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" },
                { pattern: regUsename, message: "用户名格式不正确" },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            {/* <Form.Item
              name="code"
              rules={[{ required: true, message: "请输入验证码" }]}
            >
              <Input
                addonAfter={
                  <Button size="small" type="primary" onClick={handleVerfity}>
                    {isSubmitting ? `已发送 ${seconds}s` : "发送验证码"}
                  </Button>
                }
                className="verfity"
                placeholder="请输入验证码"
                maxLength={6}
              />
            </Form.Item> */}
            <Form.Item
              name="psw"
              rules={[
                { required: true, message: "请输入您的密码" },
                {
                  // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/,
                  pattern:reg,
                  message: "仅支持6-12位含大小写英文字母、数字",
                },
              ]}
            >
              <Input type="password" placeholder="设置密码" />
            </Form.Item>
            <Form.Item
              name="psw2"
              rules={[
                { required: true, message: "请再次输入您的密码" },
                {
                  // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/,
                  pattern:reg,
                  message: "仅支持6-12位含大小写英文字母、数字",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("psw") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("您输入的新密码不匹配!"));
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="二次确认密码" />
            </Form.Item>
          </Form>
        </Row>
        <div className="login-status">
          <div>
            <Checkbox
              onChange={onChange}
              style={{ color: "rgba(255, 255, 255, 0.589)", fontSize: 12 }}
            >
              保持登录
            </Checkbox>
          </div>
          <div className="forget">帮助</div>
        </div>
        <Button type="primary" className="login-btn" onClick={registerHandler}>
          立即注册
        </Button>
        <div className="privacy">
          阅读并接受 <a>《服务条款》</a> 和 <a>《隐私政策》</a>
        </div>
        <Gap height={45} />
      </ConfigProvider>
      <div id="captcha-div"></div>
    </div>
  );
});

export default RegisterCom;
