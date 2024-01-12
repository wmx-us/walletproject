import Gap from "@/components/Gap";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Segmented,
  message,
} from "antd";
import { createTabs } from "../constant";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./index.scoped.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useInject } from "@/hooks/inject";
import { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";

const CreateInscription = useInject(["Inscription","Global"])((props) => {
  const { Inscription } = props;
  const [creatInscription] = Form.useForm();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    state: { id },
  } = useLocation();

  // 支付开始
  const handlerPayment = async () => {
    if (!isCheck) return message.error("请勾选风险警告！");
    // 调取支付接口
    const data = await Inscription.payHandler(id);
    if (data) {
      setTimeout(() => {
        navigate("/inscription/payment", { state: { orderId: data } });
      }, 500);
    }
  };

  const radioHandler = (e: RadioChangeEvent) => setIsCheck(e.target.checked);
  const createMint = async () => {
    try {
      const data = await Inscription.createMintInfo(id);
      creatInscription.setFieldsValue({ ...data, storageAddress: props.Global.state?.userInfo?.address });
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    createMint();
  }, [id]);
  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <Gap height={40} />
          <Row justify="space-between">
            <Col>
              <Button>创建铭刻</Button>
            </Col>
            <Col>
              <ConfigProvider
                theme={{
                  components: {
                    Segmented: {
                      itemSelectedBg: "#323546",
                    },
                  },
                }}
              >
                <Segmented size="large" options={createTabs} />
              </ConfigProvider>
            </Col>
          </Row>
          <Gap height={20} />
          <Card style={{ height: 328, background: "#222531" }}>
            <Form
              name="creatInscription"
              form={creatInscription}
              initialValues={{ remember: true }}
              disabled
              className="creatInscription"
              labelCol={{
                span: 4,
                offset: 0,
              }}
              labelAlign="left"
            >
              <Row justify="center" className="ant-Row">
                <Col span={16}>
                  <Form.Item
                    name="insAddress"
                    label="铭文地址"
                    rules={[{ required: true, message: "请输入铭文地址" }]}
                  >
                    <Input
                      size="large"
                      placeholder="请输入铭文地址"
                      style={{ height: 60 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={1} style={{ padding: 5 }}>
                  <QuestionCircleOutlined />
                </Col>
              </Row>
              <Row justify="center" className="ant-Row">
                <Col span={16}>
                  <Form.Item
                    name="tick"
                    label="铭文"
                    rules={[{ required: true, message: "请输入铭文" }]}
                  >
                    <Input
                      size="large"
                      placeholder="请输入铭文地址"
                      style={{ height: 60 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={1} style={{ padding: 5 }}>
                  <QuestionCircleOutlined />
                </Col>
              </Row>
              <Row justify="center" className="ant-Row">
                <Col span={16}>
                  <Form.Item
                    name="storageAddress"
                    label="存储地址"
                    rules={[{ required: true, message: "请输入存储地址" }]}
                  >
                    <Input
                      size="large"
                      placeholder="请输入存储地址"
                      style={{ height: 60 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={1} style={{ padding: 5 }}>
                  <QuestionCircleOutlined />
                </Col>
              </Row>
            </Form>
          </Card>
          <Gap height={35} />

          <Card style={{ background: "#222531" }}>
            <Row justify="space-between">
              <Col style={{ fontSize: 16 }}>选择你要支付的铭刻GAS费</Col>
              <Col style={{ fontSize: 12 }}>
                不保证显示的时间。价值仅为估算值。
              </Col>
            </Row>
            <Gap height={35} />
            <Row justify="space-around">
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultBg: "#121C38",
                      defaultColor: "#FFFFFF",
                      defaultBorderColor: "#5E62FF",
                    },
                  },
                }}
              >
                <Col className="selectBtn">
                  <Button className="btn">
                    <div className="btn-type">普通</div>
                    <div className="btn-num">
                      <span>159</span> GAS
                    </div>
                  </Button>
                </Col>
                <Col className="selectBtn">
                  <Button className="btn">
                    <div className="btn-type">快速</div>
                    <div className="btn-num">
                      <span>200</span> GAS
                    </div>
                  </Button>
                </Col>
                <Col className="selectBtn">
                  <Button className="btn">
                    <div className="btn-type">火箭通道</div>
                    <div className="btn-num">
                      <span>500</span> GAS
                    </div>
                  </Button>
                </Col>
              </ConfigProvider>
            </Row>
            <Gap height={40} />
            <Row justify="space-between">
              <Col className="cost">服务基本费：</Col>
              <Col className="cost">
                <span>{Inscription.state.createMintData?.gas}</span> GAS
              </Col>
            </Row>
            <Divider />
            <Row justify="space-between">
              <Col className="cost">快速铭刻费用：</Col>
              <Col className="cost">
                <span>200</span> GAS
              </Col>
            </Row>
            <Divider />
            <Row justify="space-between">
              <Col className="cost">全部：</Col>
              <Col className="cost">
                <span style={{ fontSize: 63, fontWeight: 500 }}>359</span> GAS
              </Col>
            </Row>
          </Card>
          <Gap height={45} />
          <Row justify="start">
            <Radio onChange={radioHandler}>
              {" "}
              我已阅读并同意 <span style={{ color: "red" }}>风险警告</span>
            </Radio>
          </Row>
          <Gap height={50} />
          <Row justify="center">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: "#5E62FF",
                    defaultColor: "#FFFFFF",
                    defaultBorderColor: "#5E62FF",
                  },
                },
              }}
            >
              <Button className="payOrder" onClick={handlerPayment}>
                支付
              </Button>
            </ConfigProvider>
          </Row>
          <Gap height={56} />
        </Col>
      </Row>
    </>
  );
});

export default CreateInscription;
