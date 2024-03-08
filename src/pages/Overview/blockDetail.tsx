import Gap from "@/components/Gap";
import {
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

import { LeftOutlined,RightOutlined } from "@ant-design/icons";

import "./details.scoped.css";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useInject } from "@/hooks/inject";
import { useLocation } from "react-router-dom";
import { transTimestamp } from "@/utils";

const columns: ColumnsType<{
  key: string | number;
  name: string;
  type: string;
  data: string;
}> = [
  // { title: '名称', dataIndex: 'name', key: 'name', align: 'center' },
  // { title: '类型', dataIndex: 'type', key: 'type', align: 'center' },
  // {
  //   title: '数据', dataIndex: 'data', key: 'data', width: '40%', align: 'center', render: (text) => {
  //     return <ConfigProvider theme={{
  //       token: {
  //         colorLink: 'rgba(255,255,255, .9)'
  //       }
  //     }}><Paragraph copyable style={{ margin: 0 }}>56sdfadASDAsdqwwrd345esfsa234csdac</Paragraph></ConfigProvider>
  //   }
  // }
];

const Details = useInject(["OverView"])(({OverView}) => {

  const { state:{id} } = useLocation();


  const handlerCount =(bool:boolean) => {
    const numericId = Number(id);

    // todo  接口有误暂不放开
    // if(id !== "") {
    //   if(bool) {
    //     OverView.getBlockDetailData(String(numericId -1));
    //   } else {
    //     OverView.getBlockDetailData(String(numericId +1));
    //   }
    // }
  }

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "块哈希",
      children: <a>{OverView.state.blockDetail?.pkHash}</a>,
    },
    {
      key: "2",
      label: "区块高度",
      children: (
        <div>
          <span>{OverView.state.blockDetail?.blockNumber}</span>
          <LeftOutlined style={{paddingLeft:40}} />
          <span style={{color:"#2196F3"}} onClick={() => handlerCount(true)}>上一区块</span>
          <span style={{paddingLeft:30,color:"#2196F3"}} onClick={() => handlerCount(false)}>下一区块</span>
          <RightOutlined />
        </div>
      ),
    },
    {
      key: "3",
      label: "出块时间",
      children:transTimestamp(OverView.state.blockDetail?.blockTimestamp,"YYYY-MM-DD HH:mm:ss")
    },
    {
      key: "4",
      label: "交易数",
      children: OverView.state.blockDetail?.transCount,
    },
    {
      key: "5",
      label: "共识节点索引",
      children: OverView.state.blockDetail?.sealerIndex,
    },
    {
      key: "6",
      label: "共识节点地址",
      children: OverView.state.blockDetail?.sealer,
    },
    {
      key: "7",
      label: "创建时间",
      children: transTimestamp(OverView.state.blockDetail?.createTime,"YYYY-MM-DD HH:mm:ss"),
    },
    {
      key: "8",
      label: "修改时间",
      children: transTimestamp(OverView.state.blockDetail?.modifyTime,"YYYY-MM-DD HH:mm:ss"),
    },
  ];


  useEffect(() => {
    OverView.getBlockDetailData(id);
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
              <p className="text">区块信息</p>
            </Space>
          </Row>
          <Gap height={15}></Gap>
          <Card>
            <Descriptions items={items} column={1} />
          </Card>
          <Gap height={30}></Gap>
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
                // bordered
                pagination={false}
                columns={columns}
                dataSource={[
                  { key: 1, name: "_to", data: "", type: "1" },
                  { key: 2, name: "_to", data: "", type: "1" },
                ]}
              />
            </ConfigProvider>
        </ConfigProvider>
      </Col>
    </Row>
  );
});

export default Details;
