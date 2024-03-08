import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import Gap from "@/components/Gap";
import { useNavigate } from "react-router-dom";
import { useInject } from "@/hooks/inject";
import MD5 from "md5";
import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
import "../index.css";
import "../index.scoped.css";
import {
  LoginServes,
  forgetPassword,
  forgetPswSendCode,
  getConfig,
} from "@/service/loginServes/api";

import "@/assets/captcha/css/tac.css";
import "@/assets/captcha/js/tac.min.js";
import { reg, regUsename } from "../captchaConfig";
import { configAddress } from "@/config";

const LoginCom: React.FC = useInject(["Login", "Global"])(({
  Global,
  Login,
}) => {
  const [changeMode, setChangeMode] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(3);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // 抽离动态校验的的方法
  const dynamicHandler = (
    fn: (arg0: any) => void,
    key: any,
    dynamicConfig: any,
  ) => {
    (window as any).TAC.enc.rsaPublicKey = key;
    const config = {
      ...configAddress,
      validSuccess: async (
        res: any,
        c: any,
        tac: { destroyWindow: () => void },
      ) => {
        console.log("res,c", res, c);
        fn(res);
        tac.destroyWindow();
      },
    };

    new (window as any).TAC(config, dynamicConfig).init();
  };

  const handleFormChange = () => {};
  // 是否记录登录状态
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  // 切换登录方式
  const handleMode = (flag: boolean) => {
    setChangeMode(flag);
  };

  // 发送验证码
  const handleVerfity = async () => {
    dynamicHandler(
      async (res) => {
        try {
          setIsSubmitting(true);
          setSeconds(10);
          const values = await form.getFieldsValue();
          const params = {
            data: {
              username:values?.username,
            },
            encData: res?.data,
          };
          // delete params.data.mobile
          await forgetPswSendCode(params);
        } catch (error) {
          message.error("er" + error);
        }
      },
      Login.state.config?.publicKey,
      Login.state?.config,
    );
  };

  // 初始化 配置数据
  const getConfigCaptcha = async () => {
    const config = await getConfig();
    Login.setConfig(config);
  };

  /**
   * 登录状态
   */
  const loginHandler = async () => {
    if (changeMode) {
      // rsa公钥
      dynamicHandler(
        async (res) => {
          try {
            const values = form.getFieldsValue();
            const params = {
              encData: res?.data,
              data: {
                ...values,
                code: MD5(MD5(values?.code)),
                deviceCode: Global.state.visitorId,
              },
            };
            console.log("11", params);
            const data = await LoginServes(params);
            Global.setUserInfo(data);
            message.success("登录成功！");
            navigate("/home");
          } catch (error) {
            message.error("er" + error);
          }
        },
        Login.state.config?.publicKey,
        Login.state?.config,
      );
    } else {
      try {
        const values = form.getFieldsValue();
        const params = {
          ...values,
          psw: MD5(MD5(values?.psw)),
          psw2: MD5(MD5(values.psw2)),
        };
        const res = await forgetPassword(params);
        console.log("res55555", res);
      } catch (error) {
        message.error("Er" + error);
      }
    }
  };

  // 切换注册
  const hanlderRegister = () => {
    Login.setChangeType(false);
  };

  // 忘记密码
  const forgetPsw = () => {
    handleMode(false);
  };

  useEffect(() => {
    getConfigCaptcha();
  }, []);
  useEffect(() => {
    // 参数绑定给全局使用
    window.CryptoJS = CryptoJS;
    // (window as any).jQuery = jQuery;
    (window as any).JSEncrypt = JSEncrypt;
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    if (seconds == 0) setIsSubmitting(false);
    return () => clearInterval(timer);
  }, [seconds]);
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
            {changeMode ? "登录" : "忘记密码"}
            {/* {changeMode && (
              <Button className="btn" onClick={() => handleMode(false)}>
                密码登录 <CaretDownOutlined />
              </Button>
            )} */}
            {/* {!changeMode && (
              <Button className="btn" onClick={() => handleMode(true)}>
                用户名登录 <CaretDownOutlined />
              </Button>
            )} */}
          </Col>
          <Col className="title_ri">
            <div className="no-account">没有账号？</div>
            <div className="register" onClick={hanlderRegister}>
              去注册
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
          {changeMode && (
            <Form
              name="login"
              onValuesChange={handleFormChange}
              // onFinish={loginHandler}
              form={form}
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Space>用户名</Space>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "请输入用户名" },
                  // { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" },
                  { pattern: regUsename, message: "用户名格式不正确" },
                ]}
              >
                <Input
                  // addonAfter={
                  //   <Button size="small" type="primary" onClick={handleVerfity}>
                  //     {isSubmitting ? `已发送 ${seconds}s` : "发送验证码"}
                  //   </Button>
                  // }
                  className="verfity"
                  // style={{ borderRight: 0 }}
                  placeholder="请输入你的手机号"
                />
              </Form.Item>
              <Space>请输入密码</Space>
              <Form.Item
                name="code"
                rules={[
                  { required: true, message: "请输入正确的密码" },
                  { pattern: reg, message: "密码格式不正确" },
                ]}
              >
                <Input placeholder="请输入密码" />
              </Form.Item>
            </Form>
          )}
          {!changeMode && (
            <Form
              name="login"
              onValuesChange={handleFormChange}
              // onFinish={loginHandler}
              form={form}
              className="login-form"
              initialValues={{ remember: true }}
            >
              {/* <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: "请输入手机号" },
                  { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" },
                ]}
              >
                <Input
                  className="verfity"
                  style={{ borderRight: 0 }}
                  placeholder="请输入你的手机号"
                />
              </Form.Item> */}
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "请输入用户名" },
                  { pattern: regUsename, message: "请输入正确的用户名" },
                ]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                name="code"
                rules={[{ required: true, message: "请输入您的验证码" }]}
              >
                <Input
                  className="verfity"
                  addonAfter={
                    <Button size="small" type="primary" onClick={handleVerfity}>
                      {isSubmitting ? `已发送 ${seconds}s` : "发送验证码"}
                    </Button>
                  }
                  style={{ borderRight: 0 }}
                  maxLength={6}
                  placeholder="请输入验证码"
                />
              </Form.Item>

              <Form.Item
                name="psw"
                rules={[
                  { required: true, message: "请输入新密码" },
                  {
                    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/,
                    pattern: reg,
                    message: "仅支持6-12位含大小写英文字母、数字",
                  },
                ]}
              >
                <Input type="password" placeholder="设置密码" />
              </Form.Item>

              <Form.Item
                name="psw2"
                rules={[
                  { required: true, message: "请再次输入新密码" },
                  {
                    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/,
                    pattern: reg,
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
          )}
        </Row>
        <div className="login-status">
          <div>
            <Checkbox onChange={onChange} className="forget">
              保持登录状态
            </Checkbox>
          </div>
          <div className="forget">
            {changeMode && <div onClick={forgetPsw}>忘记密码 | </div>}
            <div>帮助</div>
          </div>
        </div>
        <Button type="primary" className="login-btn" onClick={loginHandler}>
          {!changeMode ? "提交" : "登录"}
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

export default LoginCom;
