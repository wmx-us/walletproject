import Gap from "@/components/Gap";
import { Col, ConfigProvider, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";

import "./userInscription.scoped.css";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDataInscript } from "@/service/user/api";
import type { PaginationProps } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

interface MineTickHoldsVo {
  /**
   * 链上地址
   */
  chainAddress?: string;
  /**
   * 持有数
   */
  num?: number;
  /**
   * 铭文
   */
  tick?: string;
}

const UserInscription = () => {
  const [dataInscript, setData] = useState<MineTickHoldsVo[]>([]);
  const [pagination, setPage] = useState<typePagination>({
    page: 1,
    pageSize: 10,
  });

  // const navigate = useNavigate();

  const columns: ColumnsType<MineTickHoldsVo> = [
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
      title: "铭文",
      dataIndex: "tick",
      key: "tick",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "持有数",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "链上地址",
      key: "chainAddress",
      dataIndex: "chainAddress",
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "操作",
    //   key: "action",
    //   align: "center",
    //   render: (_, record) => (
    //     <Button type="primary" shape="round" danger onClick={give}>
    //       转赠
    //     </Button>
    //   ),
    // },
  ];

  // const give = () => {
  //   navigate("/give");
  // };
  const handlerBlockChangepage: PaginationProps["onChange"] = (
    page,
    pageSize,
  ) => {
    setPage({
      page,
      pageSize,
    });
  };
  const getData = async () => {
    try {
      const data = await fetchDataInscript({ ...pagination });
      if (data && data?.list) {
        const newList = data?.list.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setData(newList);
      }
      console.log("wode ", data);
    } catch (error) {
      message.error("er" + error);
    }
  };

  useEffect(() => {
    getData();
  }, [pagination.page, pagination.pageSize]);
  return (
    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">我的铭文</p>
      <Gap height={30}></Gap>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#181D29",
              colorBgContainer: "#222531",
            },
          },
        }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataInscript}
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
};

export default UserInscription;
