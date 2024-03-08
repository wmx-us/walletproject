import {
  Button,
  Card,
  Col,
  Space,
  ConfigProvider,
  Table,
  Modal,
  Avatar,
  QRCode,
  Image,
  message,
} from "antd";
import "./balance.scoped.css";
import "./index.css";
import Gap from "@/components/Gap";
import { ColumnsType } from "antd/es/table";
import { CaretDownOutlined } from "@ant-design/icons";
import { useInject } from "@/hooks/inject";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import wechat from "@/assets/images/wechat.png";
import alipay from "@/assets/images/alipay.png";
import {
  fetchSynchronization,
  getQrcode,
  rechargeRecord,
  searchFree,
} from "@/service/user/api";
import { transTimestamp } from "@/utils";

const Balance: React.FC = useInject(["Global"])(({ Global }) => {
  const [isOpenPay, setIsOpenPay] = useState<boolean>(false); // 是否打开充值弹框
  const [selectGas, setSelectGas] = useState<number>(0); //勾选的gas 费
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [payData, setPayData] = useState<ApiUserResult.GasRechargeVo[]>([]);
  const [rechargeData, setRechargeData] = useState<
    ApiUserResult.GasOrderInfo[]
  >([]);

  const [orderUrl, setOrderUrl] = useState<string>("");

  const [pagination, setPage] = useState<typePagination>({
    page: 1,
    pageSize: 10,
  });
  const userInfo = Global.state.userInfo;

  const columns: ColumnsType<ApiUserResult.GasOrderInfo> = [
    {
      title: (
        <>
          # <CaretDownOutlined />
        </>
      ),
      dataIndex: "id",
      key: "id",
    },
    {
      title: "充值订单",
      dataIndex: "orderSn",
      key: "orderSn",
    },
    {
      title: "消耗GAS值",
      dataIndex: "gas",
      key: "gas",
      render: (text) => <p>{text} GAS</p>,
    },
    {
      title: "时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (value) => {
        const time = transTimestamp(value, "YYYY-MM-DD HH:mm:ss");
        return <p>{time}</p>;
      },
    },
  ];

  const selectHandler = async (value: number, id: string) => {
    setSelectGas(value);
    setSelectedItemId(id);
    try {
      const url = await getQrcode({ amount: value, productId: id });
      const fullUrl = `${import.meta.env.PROJECT_ENV_PREFIX}/insland${url}`;
      setOrderUrl(fullUrl);
      console.log("url", fullUrl);
    } catch (error) {
      message.error("er" + error);
    }
  };
  //支付订单
  const orderPayHandler = () => {};

  // 打开弹框查询充值列表
  const handlerPayfree = async () => {
    setIsOpenPay(true);
  };

  const fetchData = async () => {
    try {
      const data = await searchFree();
      // 初始查询充值列表
      const newData = data.map((item, index) => ({
        ...item,
        id: index,
        ishot: true,
      }));
      setPayData(newData);
      // 默认查询第一条的充值的urL
      const url = await getQrcode({
        amount: data[0].gas,
        productId: data[0].productId,
      });

      const fullUrl = `${import.meta.env.PROJECT_ENV_PREFIX}/insland${url}`;
      setOrderUrl(fullUrl);
    } catch (error) {
      message.error("er" + error);
    }
  };

  const handlerBlockChangepage: PaginationProps["onChange"] = (
    page,
    pageSize,
  ) => {
    setPage({
      page,
      pageSize,
    });
  };
  //获取充值记录
  const fetchRechargeRecord = async () => {
    // todo: 接口需要重新做
    try {
      const { list, total } = await rechargeRecord({ ...pagination });
      const newList = list.map((item, index) => ({ ...item, id: index + 1 }));
      setRechargeData(newList);
      // setPage({
      //   total,
      // });
    } catch (error) {
      message.error("er" + error);
    }
  };

  // 同步GAS 数据余额
  const handlerSynchronization = () => {
    try {
      const data = fetchSynchronization();
      console.log("同步数据", data);
    } catch (error) {
      message.error("er" + error);
    }
  };

  useEffect(() => {
    fetchRechargeRecord();
  }, [pagination.page, pagination.pageSize]);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">账户余额</p>
      <Gap height={30}></Gap>
      <Card className="layout">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span className="label">我的余额</span>
            <p className="GAS">
              <span className="number">{userInfo?.gas}</span>
              <span className="unit">GAS</span>
            </p>
          </div>
          <div>
            <Space>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultGhostBorderColor: "#5E62FF",
                      defaultGhostColor: "#5E62FF",
                    },
                  },
                }}
              >
                <Button ghost onClick={handlerSynchronization}>
                  同步数据
                </Button>
              </ConfigProvider>
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
                <Button onClick={handlerPayfree}>充值</Button>
              </ConfigProvider>
            </Space>
          </div>
        </div>
      </Card>
      <Gap height={40}></Gap>
      <p className="title">充值记录</p>
      <ConfigProvider
        theme={{
          components: {
            Table: { headerBg: "transparent", headerSplitColor: "transparent" },
          },
        }}
      >
        <Table
          style={{ background: "transparent" }}
          rowKey="id"
          columns={columns}
          dataSource={rechargeData}
          pagination={{
            showSizeChanger: true,
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: (total) => `总共 ${total} 条`,
            onChange: handlerBlockChangepage,
          }}
        />
      </ConfigProvider>

      <Modal
        width={860}
        open={isOpenPay}
        closeIcon={false}
        onCancel={() => setIsOpenPay(false)}
        footer={null}
      >
        <Space className="Avatar">
          <div className="Avatar-left">
            <Avatar size="large" />
            <span>{userInfo?.nickname}</span>
          </div>
          <div className="Avatar-right">
            账号GAS余额： <span>{userInfo?.gas}</span>
          </div>
        </Space>

        <div className="selectPay">
          <p className="selectPay-title">充值项目：</p>
          <Gap height={25} />
          <Space wrap size={[20, 20]}>
            {payData.map((item) => (
              <div
                className={`selectPay-card ${item.ishot ? "hot" : ""} ${
                  item.productId === selectedItemId ? "active" : ""
                } `}
                key={item.id}
                onClick={() => selectHandler(item.gas, item.productId)}
              >
                <div className="selectPay-gas">
                  {item.gas} <span>GAS</span>
                </div>
                <div className="selectPay-mone">￥ {item.price} </div>
              </div>
            ))}
          </Space>
        </div>

        <div className="footer">
          <div className="footer-left">
            <QRCode value={orderUrl} size={122} />
            <div className="footer-left-text">
              <div className="footer-left-text-pay">
                支付金额：<p>￥</p> <span>{selectGas}</span>
              </div>
              <div className="footer-left-text-image">
                <Image src={wechat} preview={false} />
                <Image src={alipay} preview={false} />
                <span>使用微信/支付宝扫码支付</span>
              </div>
            </div>
          </div>
          <div className="footer-right">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: "#5E62FF",
                    colorPrimaryHover: "#4D51FF",
                  },
                },
              }}
            >
              {/* <Button style={{ width: 188,height:44,fontSize:16 }} onClick={orderPayHandler} type="primary">
                立即支付
              </Button> */}
            </ConfigProvider>
          </div>
        </div>
      </Modal>
    </Col>
  );
});

export default Balance;
