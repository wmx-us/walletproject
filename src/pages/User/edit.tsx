import Gap from "@/components/Gap";
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Upload,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import CryptoJS from "crypto-js";
import MD5 from "md5";
import JSEncrypt from "jsencrypt";
import "./edit.scoped.css";
import "./edit.css";
import { useInject } from "@/hooks/inject";
import {
  apiUpdateUserInfo,
  bindphone,
  forgetHandler,
  handlerSceurity,
  handlerchangePsw,
  handlerupdateSafety,
} from "@/service/user/api";
import { useNavigate } from "react-router-dom";
import { dynamicHandler } from "@/utils";
import { useEffect, useState } from "react";
import "@/assets/captcha/css/tac.css";
import "@/assets/captcha/js/tac.min.js";
import { getConfig, sendCode } from "@/service/loginServes/api";
import WrapModal from "./components/warpModal";

// 密码至少包含 数字和英文，长度6-20
const reg: RegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

const Edit: React.FC = useInject(["Global", "Login"])(({ Global, Login }) => {
  const { userInfo, newUserInfo } = Global.state;

  const [isOpenModal, setOpenModal] = useState<boolean>(false); //打开弹框
  const [isOpenPsw, setOpenPsw] = useState<boolean>(false); //打开弹框
  const [isSecurity, setIsSecurity] = useState<boolean>(false); //打开弹框
  const [isRevamp, setRevamp] = useState<boolean>(false); //修改安全密码
  const [isForgetPsw,setIsForgetPsw] = useState<boolean>(false) // 忘记安全密码

  const navigate = useNavigate();
  const [BindForm] = Form.useForm();
  const [changePswForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [revamp] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(3);
  const [resBind, setResBind] = useState("");
  const [resForget, setResForget] = useState("");


  const onFinish = async (values: ApiUserParams.UpdateUserInfoParams) => {
    console.log(values);
    try {
      await apiUpdateUserInfo(values);
      message.success("修改成功");
    } catch (error) {
      message.error("er" + error);
    }
  };

  // 取消按钮
  const handlerReset = () => navigate("/user/center");

  const logout = async () => {
    try {
      await Global.logout();
      navigate("/home");
      message.success("退出登录成功");
    } catch (error) {
      message.error("er" + error);
    }
  };
  // 初始化 配置数据
  const getConfigCaptcha = async () => {
    const config = await getConfig();
    Login.setConfig(config);
  };

  // 确定绑定手机号
  const handleOkbinding = async () => {
    try {
      const values = await BindForm.getFieldsValue();
      const { data } = await bindphone({ ...values });
      console.log("data", data);
      message.success("绑定成功");
      setOpenModal(false);
      Global.newUpdateUserInfo();
    } catch (error) {
      message.error("er" + error);
    }
  };

  // 修改密码
  const changePassword = async () => {
    try {
      const values = await changePswForm.getFieldsValue();
      const { data } = await handlerchangePsw({
        oldPsw: MD5(MD5(values?.oldPsw)),
        psw: MD5(MD5(values?.psw)),
        psw2: MD5(MD5(values?.psw2)),
      });
      console.log("dataPSW", data);
    } catch (error) {
      message.error("er" + error);
    }
  };
  // 设置安全密码
  const changeSecurity = async () => {
    try {
      // todo 设置安全密码
      const values = await securityForm.getFieldsValue();
      const data = await handlerSceurity({
        password: MD5(MD5(values?.password)),
      });
      console.log("data设置安全密码", data);
      message.success("设置成功！");
      setIsSecurity(false);
    } catch (error) {
      message.error("er" + error);
    }
  };

  // 修改安全密码
  const handlerRevamp = async () => {
    try {
      // todo 修改安全密码
      const values = await revamp.getFieldsValue();
      const data = await handlerupdateSafety({
        oldPassword: MD5(MD5(values?.oldPassword)),
        newPassword:MD5(MD5(values?.newPassword))
      })
      console.log('修改安全密码data', data)
      message.success("修改成功")
      setRevamp(false)
    } catch (error) {
      message.error("er" + error)
    }
  };

  // 忘记安全密码
  const handlerForget= async () => {
    try {
      //  todo 忘记安全密码
      const values  = await revamp.getFieldsValue()
      const data = await forgetHandler({
        password:MD5(MD5(values?.password)),
        code:values?.code,
        idCardNumber:values?.idCardNumber
      })

      console.log('忘记安全密码 重置', data)
    } catch (error) {
      message.error("er" + error)
    }
  }
  // 发送绑定的手机号验证码
  const sendVerifyCode = async () => {
    try {
      setIsSubmitting(true);
      setSeconds(5);
      const values = await BindForm.getFieldsValue();
      console.log("values", values);
      const params = {
        data: {
          ...values,
          event: "bindmobile",
        },
        encData: resBind,
      };
      // delete params.data.mobile
      await sendCode(params);
    } catch (error) {
      message.error("er" + error);
    }
  };
  //  首次动态检验
  const handlebinding = async () => {
    // setOpenModal(true)
    dynamicHandler(
      async (res) => {
        if (res?.data) {
          setOpenModal(true);
          setResBind(res?.data);
        }
      },
      Login.state.config?.publicKey,
      Login.state?.config,
    );
  };

  // 忘记安全密码 前 进行动态校验
  const handlerSafety = async () => {
    dynamicHandler(
      async (res) => {
        if (res?.data) {
          setIsForgetPsw(true)
          setResForget(res?.data)
        }
      },
      Login.state.config?.publicKey,
      Login.state?.config,
    );
  }

  // 忘记安全密码 发送验证码
  const sendSafety = async () => {
    try {
      setIsSubmitting(true);
      setSeconds(5);
      const values = await revamp.getFieldsValue();
      console.log("values", values);
      const params = {
        data: {
          ...values,
          event: "bindmobile",
        },
        encData: resForget,
      };
      // delete params.data.mobile
      await sendCode(params);
    } catch (error) {
      message.error("er" + error);
    }
  }
  // 绑定手机号
  const FromBind = (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#D3D3D3",
            hoverBorderColor: "#D3D3D3",
            colorBorder: "#D3D3D3",
          },
        },
      }}
    >
      <Form form={BindForm} initialValues={{ remember: true }}>
        <Form.Item
          name="mobile"
          // label="帐号昵称"
          rules={[{ required: false, message: "请输入手机号！" }]}
        >
          <Input
            className="verfity"
            placeholder="输入手机号"
            size="large"
            addonBefore={<span>+86</span>}
            addonAfter={
              <Button
                style={{ borderRight: 0 }}
                size="small"
                type="primary"
                onClick={sendVerifyCode}
              >
                {isSubmitting ? `已发送 ${seconds}s` : "发送验证码"}
              </Button>
            }
          />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[{ required: false, message: "请输入验证码！" }]}
        >
          <Input size="large" placeholder="验证码" />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );

  // 修改登录密码

  const changePsw = (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#D3D3D3",
            hoverBorderColor: "#D3D3D3",
            colorBorder: "#D3D3D3",
          },
        },
      }}
    >
      <Form form={changePswForm} initialValues={{ remember: true }}>
        <Form.Item
          name="oldPsw"
          // label="帐号昵称"
          rules={[
            { required: false, message: "请输入您的旧密码" },
            { pattern: reg, message: "密码格式不正确" },
          ]}
        >
          <Input
            minLength={6}
            maxLength={20}
            placeholder="请输入您的旧密码"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="psw"
          // label="帐号昵称"
          rules={[
            { required: false, message: "请输入您的新密码" },
            { pattern: reg, message: "密码格式不正确" },
          ]}
        >
          <Input
            minLength={6}
            maxLength={20}
            placeholder="请输入您的新密码"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="psw2"
          rules={[
            { required: false, message: "请再次输入您的新密码" },
            { pattern: reg, message: "密码格式不正确" },
          ]}
        >
          <Input
            minLength={6}
            maxLength={20}
            size="large"
            placeholder="请再次输入您的新密码"
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );

  // 设置安全密码
  const setSecurityPsw = (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#D3D3D3",
            hoverBorderColor: "#D3D3D3",
            colorBorder: "#D3D3D3",
          },
        },
      }}
    >
      <Form form={securityForm} initialValues={{ remember: true }}>
        <Form.Item
          name="password"
          // label="帐号昵称"
          rules={[
            { required: false, message: "请输入安全密码" },
            { pattern: /^[1-9]\d*$/, message: "只能输入正整数" },
          ]}
        >
          <Input.Password
            maxLength={6}
            placeholder="请输入安全密码"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          // label="帐号昵称"
          rules={[
            { required: false, message: "确认安全密码" },
            { pattern: /^[1-9]\d*$/, message: "只能输入正整数" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("您输入的安全密码不匹配!"));
              },
            }),
          ]}
        >
          <Input.Password
            maxLength={6}
            placeholder="确认安全密码"
            size="large"
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );

  // 修改安全密码
  const RevampFrom = (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#D3D3D3",
            hoverBorderColor: "#D3D3D3",
            colorBorder: "#D3D3D3",
          },
        },
      }}
    >
      <Form form={revamp} initialValues={{ remember: true }}>
        <Form.Item
          name="oldPassword"
          // label="帐号昵称"
          rules={[
            { required: false, message: "请输入安全密码" },
            { pattern: /^[1-9]\d*$/, message: "只能输入正整数" },
          ]}
        >
          <Input.Password
            maxLength={6}
            placeholder="请输入旧安全密码"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          // label="帐号昵称"
          rules={[
            { required: false, message: "确认安全密码" },
            { pattern: /^[1-9]\d*$/, message: "只能输入正整数" },
          ]}
        >
          <Input.Password
            maxLength={6}
            placeholder="请输入新的安全密码"
            size="large"
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
  // 忘记安全密码
  const forgetFrom = (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#D3D3D3",
            hoverBorderColor: "#D3D3D3",
            colorBorder: "#D3D3D3",
          },
        },
      }}
    >
      <Form form={revamp} initialValues={{ remember: true }}>
        <Form.Item
          name="mobile"
          // label="帐号昵称"
          rules={[
            { required: false, message: "请输入手机号！" },
            { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不正确" },
          ]}
        >
          <Input
            className="verfity"
            placeholder="输入手机号"
            size="large"
            addonBefore={<span>+86</span>}
          />
        </Form.Item>
        <Form.Item
          name="idCardNumber"
          // label="帐号昵称"
          rules={[
            { required: false, message: "请输入身份证后6位" },
            { pattern: /^[0-9]\d*$/, message: "只能输入正整数" },
          ]}
        >
          <Input
            maxLength={6}
            placeholder="请输入身份证后6位"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入支付密码" },
            { pattern: /^[0-9]\d*$/, message: "只能输入正整数" },
          ]}
        >
          <Input.Password
            size="large"
            maxLength={6}
            placeholder="请输入你的支付密码"
          />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[{ required: true, message: "验证码" }]}
        >
          <Input
            className="verfity"
            addonAfter={
              <Button size="small" type="primary" onClick={sendSafety}>
                {isSubmitting ? `已发送 ${seconds}s` : "发送验证码"}
              </Button>
            }
            size="large"
            style={{ borderRight: 0 }}
            maxLength={6}
            placeholder="请输入验证码"
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
  useEffect(() => {
    // 参数绑定给全局使用
    window.CryptoJS = CryptoJS;
    (window as any).JSEncrypt = JSEncrypt;
  }, []);
  useEffect(() => {
    getConfigCaptcha();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    if (seconds == 0) setIsSubmitting(false);
    return () => clearInterval(timer);
  }, [seconds]);
  return (
    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">个人中心</p>
      <Gap height={30}></Gap>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#222531",
          },
          components: {
            Input: {
              colorBgContainer: "#34343E",
            },
            Button: {
              borderRadiusLG: 5,
            },
          },
        }}
      >
        <Card title="基本信息">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            // layout=""
            onFinish={onFinish}
          >
            <Form.Item name="" label="头像">
              <Row>
                {/* <Upload>
                  <Avatar size={110} shape="square" icon={<UserOutlined />}></Avatar>
                  <p className="file-type">允许的文件类型：png，jpg，jpeg</p>
                </Upload>
                <Col span={2}></Col> */}
                <div className="preview">
                  <Avatar size={95} shape="circle"></Avatar>
                  <p className="label">头像预览</p>
                </div>
              </Row>
            </Form.Item>
            <Form.Item
              name="nickname"
              label="帐号昵称"
              initialValue={userInfo?.nickname}
              rules={[{ required: true, message: "请输入账号昵称！" }]}
            >
              <Input size="large" />
            </Form.Item>
            {/* <Form.Item label="性别">
              <Radio.Group defaultValue={userInfo.gas}>
                <Radio value="apple">男</Radio>
                <Radio value="pear">女</Radio>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space size="large">
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        primaryShadow: "#5E62FF",
                      },
                    },
                    token: {
                      colorPrimary: "#5E62FF",
                    },
                  }}
                >
                  <Button size="large" type="primary" htmlType="submit">
                    保存
                  </Button>
                </ConfigProvider>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultBg: "rgba(255, 255, 255, 0.7)",
                        defaultColor: "#2F2F2F",
                        colorBorder: "#FFFFFF",
                      },
                    },
                  }}
                >
                  <Button size="large" htmlType="reset" onClick={handlerReset}>
                    取消
                  </Button>
                </ConfigProvider>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultBg: "rgba(255, 255, 255, 0.7)",
                        defaultColor: "#2F2F2F",
                        colorBorder: "#FFFFFF",
                      },
                    },
                  }}
                >
                  <Button size="large" htmlType="button" onClick={logout}>
                    退出登录
                  </Button>
                </ConfigProvider>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Gap height={20}></Gap>
        <Card title="修改密码">
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
            <Form.Item label="手机号绑定">
              <Space direction="horizontal">
                <Input
                  size="large"
                  placeholder={newUserInfo?.mobile ? "" : "未绑定"}
                  value={newUserInfo?.mobile ?? newUserInfo?.mobile}
                  style={{ width: 360 }}
                />
                {newUserInfo?.mobile ? (
                  <Button size="large">更换手机号</Button>
                ) : (
                  <Button size="large" onClick={handlebinding}>
                    获取验证码
                  </Button>
                )}
              </Space>
            </Form.Item>
            <Form.Item label="登录密码">
              <Space direction="horizontal">
                <Input.Password
                  size="large"
                  value={"1231313"}
                  visibilityToggle={false}
                  style={{ width: 360 }}
                />
                <Button size="large" onClick={() => setOpenPsw(true)}>
                  修改登录密码
                </Button>
              </Space>
            </Form.Item>
            <Form.Item label="安全密码">
              <Space direction="horizontal">
                <Input.Password
                  size="large"
                  placeholder={
                    newUserInfo?.isSecurityPassword
                      ? "******"
                      : "你当前未设置安全密码"
                  }
                  visibilityToggle={false}
                  style={{ width: 360 }}
                  disabled={true}
                  // value={Global.state.newUserInfo?.isSecurityPassword}
                />
                {newUserInfo?.isSecurityPassword ? (
                  <Button size="large" onClick={() => setRevamp(true)}>
                    修改安全密码
                  </Button>
                ) : (
                  <Button size="large" onClick={() => setIsSecurity(true)}>
                    设置安全密码
                  </Button>
                )}
                   <Button size="large" onClick={handlerSafety}>
                    忘记安全密码
                  </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        {/* 绑定手机号 */}
        <WrapModal
          isOpen={isOpenModal}
          title="绑定手机号"
          modalWidth={460}
          handleOk={handleOkbinding}
          handleCancel={() => setOpenModal(false)}
          from={FromBind}
        />
        <WrapModal
          isOpen={isOpenPsw}
          title="修改密码"
          modalWidth={460}
          handleOk={changePassword}
          handleCancel={() => setOpenPsw(false)}
          from={changePsw}
        />
        <WrapModal
          isOpen={isSecurity}
          title="设置安全密码"
          modalWidth={460}
          handleOk={changeSecurity}
          handleCancel={() => setIsSecurity(false)}
          from={setSecurityPsw}
        />
        <WrapModal
          isOpen={isRevamp}
          title="修改安全密码"
          modalWidth={460}
          handleOk={handlerRevamp}
          handleCancel={() => setRevamp(false)}
          from={RevampFrom}
        />
        <WrapModal
          isOpen={isForgetPsw}
          title="忘记安全密码"
          modalWidth={460}
          handleOk={handlerForget}
          handleCancel={() => setIsForgetPsw(false)}
          from={forgetFrom}
        />
      </ConfigProvider>
      <div id="captcha-div"></div>
    </Col>
  );
});

export default Edit;
