import Gap from "@/components/Gap";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  Progress,
  Row,
  Table,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import EchartsWrapper from "@/components/EchartsCom";
import { DataDetail, DataDetailColType, options } from "../constant";
import { useEffect } from "react";
import { useInject } from "@/hooks/inject";
import { LocalStorage } from "@/utils";
interface DataType {
  id: number;
  address: string;
  number: string;
}
const DetailIndex = useInject(["Inscription", "Global"])((props) => {
  const { Inscription } = props;
  const { state } = Inscription;
  const {
    state: { id },
  } = useLocation();
  const navigate = useNavigate();
  const desItem: DescriptionsProps["items"] = [
    {
      key: 1,
      label: "启动块",
      children: "2543010",
      contentStyle: {
        fontSize: "23px",
      },
      labelStyle: {
        marginTop: "8px",
      },
    },
    {
      key: 2,
      label: "当前区块",
      children: "25461651",
      contentStyle: {
        fontSize: "23px",
      },
      labelStyle: {
        marginTop: "8px",
      },
    },
    {
      key: 3,
      label: "块前结束",
      children: "2546765841",
      contentStyle: {
        fontSize: "23px",
      },
      labelStyle: {
        marginTop: "8px",
      },
    },
  ];
  const handlerCreate = () => {
    const isLogin =
      props.Global.state?.token && LocalStorage.getItem("userInfo");
    if (!isLogin) return message.error("请先登录！");
    navigate("/inscription/createInscription", { state: { id } });
  };
  const desItemDetail: DescriptionsProps["items"] = [
    {
      key: 1,
      label: "铭文ID",
      children: state.datailData?.id,
      contentStyle: {
        fontSize: "14px",
      },
    },
    {
      key: 2,
      label: "铭文",
      children: state.datailData?.tick,
      contentStyle: {
        fontSize: "14px",
      },
    },
    {
      key: 3,
      label: "供应",
      children: state.datailData?.supply,
      contentStyle: {
        fontSize: "14px",
      },
    },
    {
      key: 4,
      label: "已铭刻数",
      children: state.datailData?.mintCount,
      contentStyle: {
        fontSize: "14px",
      },
    },
    {
      key: 5,
      label: "交易数量",
      children: state.datailData?.transactions,
      contentStyle: {
        fontSize: "14px",
      },
    },
    {
      key: 6,
      label: "INS_address",
      children: state.datailData?.insAddress,
      contentStyle: {
        fontSize: "14px",
      },
    },
    {
      key: 7,
      label: "创建时间",
      children: state.datailData?.createTime,
      contentStyle: {
        fontSize: "14px",
      },
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "地址",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "数量",
      dataIndex: "number",
      align: "center",
    },
  ];
  const Holder: DataType[] = [
    {
      id: 1,
      address: "56sdfadA...SDAsdqw",
      number: "20K",
    },
    {
      id: 2,
      address: "56sdfadA...SDAsdqw",
      number: "20K",
    },
    {
      id: 3,
      address: "56sdfadA...SDAsdqw",
      number: "30K",
    },
    {
      id: 4,
      address: "56sdfadA...SDAsdqw",
      number: "40K",
    },
    {
      id: 5,
      address: "56sdfadA...SDAsdqw",
      number: "50K",
    },
  ];
  const DetailCol: ColumnsType<DataDetailColType> = [
    {
      title: "#",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "哈希",
      dataIndex: "hash",
      align: "center",
    },
    {
      title: "所属块",
      dataIndex: "owningblock",
      align: "center",
    },
    {
      title: "交易板块ID",
      dataIndex: "dealId",
      align: "center",
    },
    {
      title: "交易时间",
      dataIndex: "dealTime",
      align: "center",
    },
    {
      title: "发送者",
      dataIndex: "sendUser",
      align: "center",
    },
    {
      title: "接受者",
      dataIndex: "acceptUser",
      align: "center",
    },
  ];

  useEffect(() => {
    Inscription.getDatailData(id);
  }, []);
  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <Gap height={80} />
          <Button>RUNE</Button>
          <Gap height={20} />
          <Card
            style={{ height: 245, background: "#222531" }}
            title={
              <div style={{ fontSize: "24px" }}>
                铭刻 <QuestionCircleOutlined />
              </div>
            }
            bordered={false}
          >
            <Row gutter={18}>
              <Col span={19}>
                <Progress percent={state.datailData?.progress} />
              </Col>
              <Col span={5}>
                <span>【43/432】</span>
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
                  <Button
                    size="middle"
                    type="primary"
                    onClick={handlerCreate}
                    style={{ width: 120, marginLeft: 15 }}
                  >
                    铭刻
                  </Button>
                </ConfigProvider>
              </Col>
            </Row>
            <Gap height={40} />
            <Descriptions title={null} items={desItem} />
          </Card>
          <Gap height={35} />
          <Card style={{ height: 266, background: "#222531" }}>
            <Descriptions title={null} column={2} items={desItemDetail} />
          </Card>
          <Gap height={25} />
          <Card title="顶级持有者" style={{ background: "#222531" }}>
            <Row gutter={18}>
              <Col span={16}>
                <Table rowKey="id" dataSource={Holder} columns={columns} />
              </Col>
              <Col span={8}>
                <EchartsWrapper options={options} style={{ height: "400px" }} />
              </Col>
            </Row>
          </Card>
          <Gap height={20} />
          <Table rowKey="id" columns={DetailCol} dataSource={DataDetail} />
        </Col>
      </Row>
    </>
  );
});

export default DetailIndex;
