import { useInject } from "@/hooks/inject";
import {
  Button,
  Col,
  ConfigProvider,
  Progress,
  Row,
  Segmented,
  Space,
  Table,
} from "antd";
import { useEffect } from "react";
import Search, { SearchProps } from "antd/es/input/Search";
import Gap from "@/components/Gap";
import type { ColumnsType } from "antd/es/table";
import { itemTabs } from "./constant";
import type { PaginationProps } from "antd";
import "./index.scoped.css";
import { useNavigate } from "react-router-dom";
import { TickListInfoVo } from "@/service/Inscription/interface";
import { transTimestamp } from "@/utils";
const Inscription = useInject(["Inscription"])((props) => {
  const { Inscription } = props;
  const { state } = Inscription;
  const { dataList, pagination } = state;
  const navigate = useNavigate();
  const onSearchHandler: SearchProps["onSearch"] = (value) => {
    Inscription.getDataList({ searchCondition: value });
  };
  const handlerChangepage: PaginationProps["onChange"] = (page, pageSize) => {
    Inscription.getDataList({ page, pageSize });
  };
  const handlerDetail = (record: any) => {
    navigate("/inscription/detail", { state: { id: record.id } });
  };
  const columns: ColumnsType<TickListInfoVo> = [
    {
      title: "ID",
      dataIndex: "id",
      rowScope: "row",
      align: "center",
    },
    {
      title: "铭文",
      dataIndex: "tick",
      align: "center",
    },
    {
      title: "供应",
      dataIndex: "supply",
      align: "center",
      //   defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "已铭刻数",
      dataIndex: "mintCount",
      align: "center",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "进度",
      // colSpan: 2,
      dataIndex: "progress",
      align: "center",
      width: 150,
      render: (value) => {
        if (value === 100) {
          return <Button>完成铭刻</Button>;
        } else {
          return (
            <div>
              <div>{value}%</div>
              <Progress showInfo={false} percent={value} />
            </div>
          );
        }
      },
    },

    {
      title: "INS_address",
      dataIndex: "insAddress",
      align: "center",
      //   defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "持有人数",
      dataIndex: "holders",
      align: "center",
      //   defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "交易数量",
      dataIndex: "transactions",
      align: "center",
      //   defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      //   fixed: "right",
      render: (value) => {
        const time = transTimestamp(value, "YYYY-MM-DD HH:mm:ss");
        return <p>{time}</p>;
      },
    },
    {
      title: "操作",
      dataIndex: "",
      //   fixed: "right",
      render: (_, record) => {
        return (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  // #4044FF
                  colorPrimary: "#5E62FF",
                  colorPrimaryHover: "#4D51FF",
                },
              },
            }}
          >
            <Button type="primary" onClick={() => handlerDetail(record)}>铭刻</Button>
          </ConfigProvider>
        );
      },
    },
  ];

  useEffect(() => {
    Inscription.getDataList(pagination);
  }, []);
  return (
    <>
      <Row justify="center">
        <Col span={18} style={{ maxWidth: 1400 }}>
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
              onSearch={onSearchHandler}
              style={{ maxWidth: 600 }}
            />
          </ConfigProvider>
          <Gap height={30} />
          <Space size={35}>
            <div className="inscript">铭文</div>
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#323546",
                  },
                },
              }}
            >
              <Segmented
                block={true}
                size="large"
                options={itemTabs}
                style={{ marginTop: 18 }}
              />
            </ConfigProvider>
          </Space>
          <Gap height={50}></Gap>
          <ConfigProvider
            theme={{
              components: {
                Table: {},
              },
              token: {
                colorBgContainer: "transparent",
              },
            }}
          >
            <Table
              rowKey="id"
              columns={columns}
              pagination={{
                current: pagination.page,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showTotal: (total) => `总共 ${total} 条`,
                onChange: handlerChangepage,
              }}
              dataSource={dataList}
              style={{ color: "transparent" }}
              scroll={{ x: 1200 }}
            />
          </ConfigProvider>
        </Col>
      </Row>
    </>
  );
});

export default Inscription;
