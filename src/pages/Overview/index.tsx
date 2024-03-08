import Gap from "@/components/Gap";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Image,
  Input,
  Row,
  Table,
  Tabs,
  TabsProps,
  Tooltip,
  message,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import topBg from "@/assets/images/overViewTopBg.png";
import EchartsWrapper from "@/components/EchartsCom";
import * as echarts from "echarts";
// import overViewBtn from "@/assets/images/overViewBto.png";
import boxBg from "@/assets/images/overview-box-bg.png";
import boxTop from "@/assets/images/overview-box-top.png";
import boxTopLeft from "@/assets/images/overview-box-top-left.png";
import boxBottomLeft from "@/assets/images/overview-box-bottom-left.png";
import boxTopRight from "@/assets/images/overview-box-top-right.png";
import boxBottomRight from "@/assets/images/overview-box-bottom-right.png";
import chuck1 from "@/assets/images/chuck1.png";
import chuck2 from "@/assets/images/chuck2.png";

import "./index.css";
import "./index.scoped.css";
import { useInject } from "@/hooks/inject";
import { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { transTimestamp, truncateString } from "@/utils";
import {
  SeventDaysTrans,
  TbBlockListVo,
  dealListVo,
} from "@/service/Overview/interface";
const customPaginationText = {
  items_per_page: '条/页',
  jump_to: '跳至',
  page: '页',
  prev_page: '上一页',
  next_page: '下一页',
};
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const Overview = useInject(["OverView"])((props) => {
  const navigate = useNavigate();
  const [dayData, setDayData] = useState<SeventDaysTrans[]>([]);
  const { OverView } = props;
  const { state } = OverView;
  const handleChangeTabs = (key: string) => {
    console.log("key", key);
    if (key === "2") {
      OverView.getBlockList(state.paginationBlock);
    }
  };
  const handlerChangepage: PaginationProps["onChange"] = (page, pageSize) => {
    OverView.getDealList({ page, pageSize });
  };
  const handlerBlockChangepage: PaginationProps["onChange"] = (page, pageSize) => OverView.getBlockList({ page, pageSize });
  const columns: ColumnsType<dealListVo> = [
    // {
    //   title: "#",
    //   dataIndex: "appId",
    //   // rowScope: "row",
    //   align: "center",
    //   width: 80,
    // },
    {
      title: "哈希",
      dataIndex: "transHash",
      align: "center",
      width: "200px",
      render: (value) => <a>{truncateString(value, 20)}</a>,
    },
    {
      title: "所属块高",
      dataIndex: "blockNumber",
      align: "center",
      // fixed: "right",
      width: "100px",
    },
    {
      title: "交易板块ID",
      // colSpan: 2,
      dataIndex: "appId",
      align: "center",
    },
    {
      title: "交易时间",
      // colSpan: 0,
      dataIndex: "blockTimestamp",
      align: "center",
      // fixed: "right",
      width: "200px",
      render: (value) => {
        const time = transTimestamp(value, "YYYY-MM-DD HH:mm:ss");
        return <p>{time}</p>;
      },
    },
    {
      title: "交易发送者",
      dataIndex: "transFrom",
      align: "center",
      width: "300px",
      render: (value) => truncateString(value, 30),
    },
    {
      title: "交易接收者",
      dataIndex: "transTo",
      align: "center",
      width: "300px",
      render: (value) => truncateString(value, 30),
    },
    {
      title: "",
      dataIndex: "",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "transparent",
                colorPrimaryHover: "#4D51FF",
              },
            },
          }}
        >
          <Button
            type="primary"
            style={{ border: "1px solid #4D51FF" }}
            icon={<PlusOutlined />}
            onClick={() => details(record?.transHash)}
          >
            1T GROK
          </Button>
        </ConfigProvider>
      ),
    },
  ];
  const BlockColumns: ColumnsType<TbBlockListVo> = [
    {
      title: "块高",
      dataIndex: "blockNumber",
      align: "center",
      // fixed: "right",
      width: "100px",
    },
    {
      title: "块哈希",
      dataIndex: "pkHash",
      align: "center",
      width: "180px",
      render: (value) => <a>{truncateString(value, 15)}</a>,
    },
    {
      title: "共识节点",
      dataIndex: "sealerIndex",
      align: "center",
      width: "90px",
      // render: (value) => truncateString(value,30)
    },
    {
      title: "共识节点地址",
      dataIndex: "sealer",
      align: "center",
      width: "180px",
      render: (value) => truncateString(value, 15),
    },
    {
      title: "交易数",
      dataIndex: "transCount",
      align: "center",
      width: "80px",
      // render: (value) => truncateString(value,30)
    },
    {
      title: "出块时间",
      // colSpan: 0,
      dataIndex: "blockTimestamp",
      align: "center",
      // fixed: "right",
      width: "200px",
      render: (value) => {
        const time = transTimestamp(value, "YYYY-MM-DD HH:mm:ss");
        return <p>{time}</p>;
      },
    },
    {
      title: "创建时间",
      // colSpan: 0,
      dataIndex: "createTime",
      align: "center",
      // fixed: "right",
      width: "200px",
      render: (value) => {
        const time = transTimestamp(value, "YYYY-MM-DD HH:mm:ss");
        return <p>{time}</p>;
      },
    },
    {
      title: "修改时间",
      // colSpan: 0,
      dataIndex: "modifyTime",
      align: "center",
      fixed: "right",
      width: "200px",
      render: (value) => {
        const time = transTimestamp(value, "YYYY-MM-DD HH:mm:ss");
        return <p>{time}</p>;
      },
    },
    {
      title: "",
      dataIndex: "",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "transparent",
                colorPrimaryHover: "#4D51FF",
              },
            },
          }}
        >
          <Button
            type="primary"
            style={{ border: "1px solid #4D51FF" }}
            icon={<PlusOutlined />}
            onClick={() => blockDetail(record?.blockNumber)}
          >
            1T GROK
          </Button>
        </ConfigProvider>
      ),
    },
  ];
  const blockDetail = (blockNumber: number) =>
    navigate("/overview/blockdetails", { state: { id: blockNumber } });
  const details = (transHash: string) =>
    navigate("/overview/details", { state: { id: transHash } });

  const options: echarts.EChartsOption = {
    color: ["#80FFA5"],
    title: {
      // text: "交易总数",
      // textStyle:{
      //   color:"#FFFFFF"
      // }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#327DFF33",
        },
      },
      formatter: function (params: any) {
        // Use the correct type for params
        return (
          (params[0]?.name || "") +
          "<br>" +
          (params[0]?.seriesName || "") +
          "：" +
          (params[0]?.data || "")
        );
      },
    },
    legend: {
      data: ["Line 1", "Line 2"],
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      // containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        show: false,
      },
    ],
    yAxis: [
      {
        type: "value",
        show: false,
      },
    ],

    series: [
      {
        name: "",
        type: "line",
        stack: "Total",
        smooth: true,
        sampling: "lttb",
        lineStyle: {
          width: 2,
          color: "#327DFF",
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.9,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#327DFF33",
            },
            {
              offset: 1,
              color: "#327DFF33",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 156, 120, 180, 90, 200, 250],
      },
    ],
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "最新交易",
      children: (
        <Table
          rowKey="blockNumber"
          columns={columns}
          dataSource={state.dealList}
          scroll={{ x: 1200 }}
          pagination={{
            showSizeChanger: true,
            current: state.pagination.page,
            pageSize: state.pagination.pageSize,
            total: state.pagination.total,
            showTotal: (total) => `总共 ${total} 条`,
            onChange: handlerChangepage,
          }}
        />
      ),
    },
    {
      key: "2",
      label: "区块",
      children: (
        <Table
          rowKey="blockNumber"
          columns={BlockColumns}
          dataSource={state.blockList}
          scroll={{ x: 1200 }}
          pagination={{
            showSizeChanger: true,
            current: state.paginationBlock.page,
            pageSize: state.paginationBlock.pageSize,
            total: state.paginationBlock.total,
            showTotal: (total) => `总共 ${total} 条`,
            onChange: handlerBlockChangepage,
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    OverView.getDealList(state.pagination);
    
  }, []);
  // useEffect(() => {
  //   const fetchData = async() => {
  //     try {
  //       const res = await OverView.getDayDealData()
  //       setDayData(res)
  //     } catch (error) {
  //       message.error("er"+ error)
  //     }
  //   }
  //   fetchData();

  //   const interval:number = 5000

  //   // 轮询间隔时间（例如：每5秒查询一次）
  //   const timerId = setInterval(fetchData, interval); // 开始轮询，并获取定时器ID
  //   return () => {
  //     clearInterval(timerId); // 在组件卸载时清除轮询
  //   }
  // },[])
  return (
    <Row justify="center">
      <Image src={topBg} preview={false} width="100%" />
      <Col span={18} className="overview" style={{ maxWidth: 1400 }}>
        <Row justify="center">
          <Gap height={50}></Gap>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBorder: "#A0A0A0",
                  colorBorderSecondary: "red",
                  colorBgContainer: "transparent",
                  addonBg: "#5E62FF",
                },
                Button: {
                  colorBorder: "#A0A0A0",
                  colorBgContainer: "transparent",
                },
              },
            }}
          >
            <Search
              placeholder="按区块/交易量信息进行搜索"
              onSearch={onSearch}
              style={{ maxWidth: 600 }}
            />
          </ConfigProvider>
        </Row>
        <Gap height={70} />
        <Row justify="space-around">
          <Col span={7}>
            <div className="card-name">
              <div className="card-title">
                <div className="title-le">交易总数</div>
                <div className="title-ri">
                  <div className="title-num">17298278</div>
                  <div className="ri-time">
                    <span style={{ color: "#327DFF" }}>+25112</span> 24h
                  </div>
                </div>
              </div>
              <EchartsWrapper options={options} />
            </div>
          </Col>
          <Col span={1} />
          <Col span={7}>
            <div className="card-name">
              <div className="card-title">
                <div className="title-le">活跃地址</div>
                <div className="title-ri">
                  <div className="title-num">13422102</div>
                  <div className="ri-time">
                    <span style={{ color: "#327DFF" }}>+20</span> 24h
                  </div>
                </div>
              </div>
              <EchartsWrapper options={options} />
            </div>
          </Col>
          <Col span={1} />
          <Col span={8}>
            <div className="contract">
              <div className="contract-le">
                <Image src={chuck1} preview={false} />
                <div className="contract-le-title">
                  <div className="contract-le-title-num">22102 个</div>
                  <div>合约数</div>
                </div>
              </div>
              <div className="contract-le">
                <Image src={chuck2} preview={false} />
                <div className="contract-le-title">
                  <div className="contract-le-title-num">50 毫秒</div>
                  <div>平均出块时间</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Gap height={50}></Gap>
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemHoverColor: "#FFFFFF",
                inkBarColor: "transparent",
                itemSelectedColor: "#5E62FF",
              },
            },
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={items}
            tabBarStyle={
              {
                // background:"red"
              }
            }
            onChange={handleChangeTabs}
          />
        </ConfigProvider>
      </Col>

      <Col span={24} className="subscription">
        <Row justify="center">
          <Col span={9} style={{ minWidth: 600, maxWidth: 700 }}>
            <Gap height={58} />
            <div className="subscription-title">随时随地掌握加密货币</div>
            <Gap height={14} />
            <div className="subscription-email">
              请通过电子邮件向我通报最新的加密货币新闻、研究结果、奖励计划、活动更新、代币列表等更多信息。
            </div>
            <Gap height={14} />
            <div className="subscription-now">现在订阅</div>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    activeBg: "#0E1D3C",
                    activeBorderColor: "#89B5FF",
                    colorBgContainer: "#0D1421",
                    // colorBorder:"#89B5FF"
                  },
                  Button: {
                    colorPrimary: "#5E62FF",
                    colorPrimaryHover: "#4D51FF",
                  },
                },
              }}
            >
              <div style={{ marginTop: 8 }}>
                <Input
                  placeholder="输入你的电子邮箱地址"
                  style={{ width: 498, height: 45 }}
                />
              </div>
              <Gap height={8} />
              <Button type="primary" style={{ width: 498, height: 45 }}>
                订阅
              </Button>
            </ConfigProvider>
          </Col>
          <Col
            span={9}
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth: 600,
              maxWidth: 700,
            }}
          >
            <div className="box">
              <Image className="bg" src={boxBg} preview={false}></Image>
              <div className="top">
                <Image className="img" src={boxTop} preview={false}></Image>
              </div>
              <div className="top-left">
                <Image src={boxTopLeft} preview={false}></Image>
              </div>
              <div className="bottom-left">
                <Image src={boxBottomLeft} preview={false}></Image>
              </div>
              <div className="top-right">
                <Image src={boxTopRight} preview={false}></Image>
              </div>
              <div className="bottom-right">
                <Image src={boxBottomRight} preview={false}></Image>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
});

export default Overview;
