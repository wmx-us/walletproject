import Gap from "@/components/Gap"
import { Button, Col, ConfigProvider, Table } from "antd"
import { ColumnsType } from "antd/es/table";

import "./userInscription.scoped.css"
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: 'nice',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: 'loser',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: 'teacher',
  },
];

const UserInscription = () => {

  const navigate = useNavigate()

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags'
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button type="primary" shape="round" danger onClick={give}>转赠</Button>
      ),
    },
  ];

  const give = () => {
    navigate("/give")
  }

  return (
    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">我的铭文</p>
      <Gap height={30}></Gap>
      <ConfigProvider theme={{
        components: {
          Table: {
            headerBg: '#181D29',
            colorBgContainer: '#222531'
          }
        }
      }}>
        <Table columns={columns} dataSource={data} />
      </ConfigProvider>
    </Col>
  )
}

export default UserInscription