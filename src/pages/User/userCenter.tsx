import Gap from "@/components/Gap";
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Row,
  Space,
  Statistic,
  Segmented,
  message,
} from "antd";
import { QuestionCircleOutlined, CaretDownOutlined } from "@ant-design/icons";
import accInscription from "@/assets/images/acc-inscription.png";
import accQty from "@/assets/images/acc-qty.png";
import accGAS from "@/assets/images/acc-GAS.png";
import accBalance from "@/assets/images/acc-balance.png";
import "./userCenter.scoped.css";
import Table, { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useInject } from "@/hooks/inject";
import { useEffect, useState } from "react";
import { consumptionRecord, } from "@/service/user/api";
import type { PaginationProps } from "antd";
import { transTimestamp } from "@/utils";

const columns: ColumnsType<ApiUserResult.CashLogVo> = [
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
    title: "铭文ID",
    dataIndex: "uuid",
  },
  {
    title: "交易哈希值",
    dataIndex: "hashId",
  },
  {
    title: "GAS消耗",
    dataIndex: "gas",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    render: (value) => {
      const time = transTimestamp(value, "YYYY-MM-DD HH:mm:ss");
      return <p>{time}</p>;
    },
  },
  {
    title: "状态",
    dataIndex: "status",
    render: (value) => (
      <Space size="middle">
        <a>Invite {value}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UserCenter: React.FC = useInject(["Global"])(({ Global }) => {
  const { userInfo, newUserInfo } = Global.state;
  const [customData, setCustomData] = useState<ApiUserResult.CashLogVo[]>([]);
  const [pagination, setPage] = useState<typePagination>({
    page: 1,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const edit = () => navigate("/user/edit");

  const handlerBlockChangepage: PaginationProps["onChange"] = (
    page,
    pageSize,
  ) => {
    setPage({
      page,
      pageSize,
    });
  };
  //获取消费记录
  const fetchRechargeRecord = async () => {
    // todo: 接口需要重新做
    try {
      const { list } = await consumptionRecord({ ...pagination });
      const newList = list.map((item, index) => ({ ...item, id: index + 1 }));
      setCustomData(newList);
      // setPage({
      //   total,
      // });
    } catch (error) {
      message.error("er" + error);
    }
  };

  // 单独获取用户信息
  // const fetchuserData = async () => {
  //   try {
  //     const data = await getUserInfo();
  //     setUserData(data)
  //   } catch (error) {
  //     message.error("er"+ error)
  //   }
  // }
  useEffect(() => {
    Global.newUpdateUserInfo()
    fetchRechargeRecord();
  }, []);
  return (
    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">个人中心</p>
      <Gap height={30}></Gap>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#323546",
          },
        }}
      >
        <Card>
          <Row
            justify="space-between"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Space size="middle">
              <Avatar size={60} />
              <div className="user-info">
                <p className="name">{userInfo?.nickname}</p>
                <p className="id">区块链ID：{userInfo?.address}</p>
              </div>
            </Space>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: "rgba(0,0,0,.5)",
                    defaultBorderColor: "#5E62FF",
                    defaultColor: "#5E62FF",
                  },
                },
              }}
            >
              <Button onClick={edit}>编辑</Button>
            </ConfigProvider>
          </Row>
          <Gap height={20} />
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#222531",
                colorPrimary: "#FFFFFF",
                colorBorderSecondary: "transparent",
              },
            }}
          >
            <Card
              tabList={[{ label: "账户概览", key: "" }]}
              style={{ borderTop: "1.5px solid #6281FF" }}
            >
              <Row justify="space-around">
                <Space direction="vertical">
                  <Statistic value={newUserInfo?.myParticipationTick} />
                  <div className="acc-label">
                    <img className="icon" src={accInscription} />
                    <p className="text">我参与的铭文</p>
                    <QuestionCircleOutlined
                      style={{ color: "rgba(255, 255, 255, 0.5)" }}
                    />
                  </div>
                </Space>
                <Space direction="vertical">
                  <Statistic value={newUserInfo?.owned} />
                  <div className="acc-label">
                    <img className="icon" src={accQty} />
                    <p className="text">我拥有的铭文数量</p>
                    <QuestionCircleOutlined
                      style={{ color: "rgba(255, 255, 255, 0.5)" }}
                    />
                  </div>
                </Space>
                <Space direction="vertical">
                  <Statistic value={newUserInfo?.usedGas} precision={2} />
                  <div className="acc-label">
                    <img className="icon" src={accGAS} />
                    <p className="text">总消耗的GAS</p>
                    <QuestionCircleOutlined
                      style={{ color: "rgba(255, 255, 255, 0.5)" }}
                    />
                  </div>
                </Space>
                <Space direction="vertical">
                  <Statistic value={newUserInfo?.balance} precision={2} />
                  <div className="acc-label">
                    <img className="icon" src={accBalance} />
                    <p className="text">GAS余额</p>
                    <QuestionCircleOutlined
                      style={{ color: "rgba(255, 255, 255, 0.5)" }}
                    />
                  </div>
                </Space>
              </Row>
            </Card>
          </ConfigProvider>
        </Card>
      </ConfigProvider>
      <Gap height={15} />
      <ConfigProvider
        theme={{
          token: {
            colorBgLayout: "#222531",
            controlPaddingHorizontal: 20,
          },
          components: {
            Segmented: {
              itemSelectedBg: "#323546",
            },
          },
        }}
      >
        <Segmented
          size="large"
          options={["所有", "我的创建", "我的参与"]}
        ></Segmented>
      </ConfigProvider>
      <Gap height={20} />
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "transparent",
            },
          },
        }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={customData}
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
    </Col>
  );
});

export default UserCenter;
