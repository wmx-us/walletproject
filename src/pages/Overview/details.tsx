import Gap from "@/components/Gap";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Row,
  Space,
  Table,
} from "antd";
import Search from "antd/es/input/Search";

import { PlusOutlined } from "@ant-design/icons";

import "./details.scoped.css";
import Paragraph from "antd/es/typography/Paragraph";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useInject } from "@/hooks/inject";
import { useLocation } from "react-router-dom";
import { AbiList } from "@/service/Overview/interface";

const columns: ColumnsType<AbiList> = [
  { title: '名称', dataIndex: 'name', key: 'name', align: 'center' },
  { title: '类型', dataIndex: 'type', key: 'type', align: 'center' },
  {
    title: '数据', dataIndex: 'data', key: 'data', width: '40%', align: 'center', render: (text) => {
      return <ConfigProvider theme={{
        token: {
          colorLink: 'rgba(255,255,255, .9)'
        }
      }}><Paragraph copyable style={{ margin: 0 }}>{text}</Paragraph></ConfigProvider>
    }
  }
];

const Details = useInject(["OverView"])(({OverView}) => {

  const { state } = useLocation();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "交易哈希",
      children: <a>{OverView.state.dealDetail?.transHash}</a>,
    },
    {
      key: "2",
      label: "块高",
      children: OverView.state.dealDetail?.blockNumber,
    },
    {
      key: "3",
      label: "gas",
      children: OverView.state.dealDetail?.gas,
    },
    {
      key: "4",
      label: "发送者",
      children: OverView.state.dealDetail?.form,
    },
    {
      key: "5",
      label: "交易索引",
      children: "",
    },
    {
      key: "6",
      label: "接收者",
      children: OverView.state.dealDetail?.to,
    },
    {
      key: "7",
      label: "随机数",
      children: "",
    },
    {
      key: "8",
      label: "价值",
      children: "0x0",
    },
    {
      key: "9",
      label: "哈希",
      children: "",
    },
    {
      key: "10",
      label: "gas价格",
      children: "",
    },
  ];

  // // 获取详情数据

  // const fetchDetailData = () => {

  // }
  
  useEffect(() => {
    OverView.getDealDetailData(state.id);
  }, []);
  return (
    <Row justify="center">
      <Col span={18}>
        <ConfigProvider
          theme={{
            components: {
              Descriptions: {
                itemPaddingBottom: 30,
                contentColor: "rgba(255,255,255,.9)",
              },
            },
            token: {
              colorBgContainer: "#222531",
            },
          }}
        >
          <Gap height={50}></Gap>
          <Search
            placeholder="按区块/交易量信息进行搜索"
            enterButton
            style={{ maxWidth: 600 }}
          />
          <Gap height={50}></Gap>
          <Row justify="space-between">
            <Space size="middle" className="title">
              <p className="text">交易</p>
              <Paragraph
                copyable={{ text: OverView.state.dealDetail.transHash }}
                style={{ margin: 0 }}
              >
                <a className="hash">{OverView.state.dealDetail?.transHash}</a>
              </Paragraph>
            </Space>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: "#5E62FF",
                    defaultColor: "#FFFFFF",
                  },
                },
              }}
            >
              <Button>5S 确认</Button>
            </ConfigProvider>
          </Row>
          <Gap height={15}></Gap>
          <Card>
            <Descriptions items={items} column={2} />
          </Card>
          <Gap height={30}></Gap>
          <div className="title">
            <p className="text">输入和输出</p>
          </div>
          <Gap height={15}></Gap>
          <Card>
            <Row justify="space-between">
              <Space>
                <p className="text">功能:</p>
                <p className="text">{"(" + OverView.state?.apitype + OverView.state?.outputType + ")"}</p>
                <p className="text">方法:</p>
                <p className="text">{OverView.state?.abiDataInfo?.methodId}</p>
              </Space>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultBg: "#151515",
                      defaultColor: "#FFFFFF",
                      defaultBorderColor: "#5E62FF",
                    },
                  },
                }}
              >
                <Button icon={<PlusOutlined style={{ color: "#5E62FF" }} />}>
                  1T GROK
                </Button>
              </ConfigProvider>
            </Row>
            <Gap height={20}></Gap>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: "#000102",
                  },
                },
                token: {
                  colorBgContainer: "#0D1421",
                },
              }}
            >
              <Table
                rowKey="id"
                bordered
                pagination={false}
                columns={columns}
                dataSource={OverView.state?.inputData}
              />
            </ConfigProvider>
          </Card>
        </ConfigProvider>
      </Col>
    </Row>
  );
});

export default Details;
