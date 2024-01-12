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
import { CaretDownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import Gap from "@/components/Gap";
import { useNavigate } from "react-router-dom";

import { useInject } from "@/hooks/inject";
import MD5 from "md5";
import "../index.css"
import "../index.scoped.css";
import {
  LoginMobileServes,
  LoginServes,
} from "@/service/loginServes/loginServes";

const LoginCom: React.FC = useInject(["Login", "Global"])((props) => {
  const [changeMode, setChangeMode] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(3);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Login, Global } = props;

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
  const handleVerfity = () => {
    setIsSubmitting(true);
    setSeconds(3);
  };
  /**
   * 登录状态
   */
  const loginHandler = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("values", values);
      const params = {
        ...values,
        code: changeMode ? values?.code : MD5(MD5(values?.code)),
        deviceCode: Global.state.visitorId,
      };
      if (changeMode) {
        const data = await LoginMobileServes(params);
        Global.initUserInfo(data);
      } else {
        const data = await LoginServes(params);
        Global.initUserInfo(data);
      }
      message.success("登录成功！");
      navigate("/home");
    } catch (error) {
      //
    }
  };

  // 切换注册
  const hanlderRegister = () => {
    Login.setChangeType(false);
  };

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
          <Col className="title_login">
            登录
            {changeMode && (
              <Button className="btn" onClick={() => handleMode(false)}>
                密码登录 <CaretDownOutlined />
              </Button>
            )}
            {!changeMode && (
              <Button className="btn" onClick={() => handleMode(true)}>
                手机号登录 <CaretDownOutlined />
              </Button>
            )}
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
              colorPrimary:"#5E62FF",
              colorPrimaryHover:"#4D51FF"
            },
            Input: {
              activeBg:"#0E1D3C",
              activeBorderColor: "#89B5FF",
              colorBgContainer:"#0E1D3C",
              colorBorder:"#89B5FF"
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
              <Space>手机号</Space>
              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: "请输入手机号" },
                  { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" },
                ]}
              >
                <Input
                  addonAfter={
                    <Button size="small" type="primary" onClick={handleVerfity}>
                      {isSubmitting ? `已发送 ${seconds}s` : "发送验证码"}
                    </Button>
                  }
                  className="verfity"
                  style={{borderRight:0}}
                  placeholder="请输入你的手机号"
                />
              </Form.Item>
              <Space>请输入验证码</Space>
              <Form.Item
                name="code"
                rules={[{ required: true, message: "请输入您的验证码" }]}
              >
                <Input maxLength={6} placeholder="请输入验证码" />
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
              <Space>账号</Space>
              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: "请输入手机号" },
                  { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" },
                ]}
              >
                <Input placeholder="请输入你的手机号" />
              </Form.Item>
              <Space>请输入密码</Space>
              <Form.Item
                name="code"
                rules={[
                  { required: true, message: "请输入您的密码" },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/,
                    message: "仅支持8-14位含大小写英文字母、数字",
                  },
                ]}
              >
                <Input type="password" placeholder="请输入密码" />
              </Form.Item>
            </Form>
          )}
        </Row>
        <div className="login-status">
          <div>
            <Checkbox
              onChange={onChange}
              className="forget"
            >
              记住登录状态
            </Checkbox>
          </div>
          <div className="forget">
            <div>忘记密码 |</div>
            <div>帮助</div>
          </div>
        </div>
        <Button type="primary" className="login-btn" onClick={loginHandler}>
          登录
        </Button>
        <div className="privacy">
          阅读并接受 <a>《服务条款》</a> 和 <a>《隐私政策》</a>
        </div>
        <Gap height={45} />
      </ConfigProvider>
    </div>
  );
});

export default LoginCom;
