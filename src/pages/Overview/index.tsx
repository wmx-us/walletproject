import Gap from "@/components/Gap";
import { Button, Col, ConfigProvider, Row, Table } from "antd";
import Search, { SearchProps } from "antd/es/input/Search"
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


interface DataType {
  key: string;
  name: string;
  age: number;
  tel: string;
  phone: string;
  address: string;
}

// <FastForwardFilled />
const data: DataType[] = [
  {
    key: '1',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: '01234',
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '2',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: '01234',
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '3',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: '01234',
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '4',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: '01234',
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }
];

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const Overview = () => {

  const navigate = useNavigate()


  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'key',
      rowScope: 'row',
      align: 'center',
      width: 80
    },
    {
      title: '哈希',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '所属块',
      dataIndex: 'age',
      align: 'center'
    },
    {
      title: '交易板块ID',
      // colSpan: 2,
      dataIndex: 'tel',
      align: 'center'
    },
    {
      title: '交易时间',
      // colSpan: 0,
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: '发送者',
      dataIndex: 'address',
      align: 'center'
    },
    {
      title: '接收者',
      dataIndex: 'address',
      align: 'center'
    },
    {
      title: '',
      dataIndex: 'address',
      align: 'center',
      fixed: 'right',
      render: () => (<Button icon={<PlusOutlined />} onClick={details}>1T GROK</Button>)
    }
  ]

  const details = () => navigate('/overview/details')

  return (
    <Row justify="center">
      <Col span={18}>
        <Gap height={50}></Gap>
        <ConfigProvider theme={{
          components: {
            Input: {
              colorBorder: '#A0A0A0',
              colorBorderSecondary: 'red',
              colorBgContainer: 'transparent'
            },
            Button: {
              colorBorder: '#A0A0A0',
              colorBgContainer: 'transparent'
            }
          }
        }}>
          <Search placeholder="按区块/交易量信息进行搜索" onSearch={onSearch} style={{ maxWidth: 600 }} />
        </ConfigProvider>

        <Gap height={50}></Gap>
        <Table columns={columns} dataSource={data} scroll={{ x: 1200 }} />
      </Col>
    </Row>
  )
}

export default Overview