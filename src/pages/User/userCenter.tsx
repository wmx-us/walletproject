import Gap from "@/components/Gap"
import { Avatar, Button, Card, Col, ConfigProvider, Row, Space, Statistic, Image, Segmented, Form } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons";

import accInscription from "@/assets/images/acc-inscription.png";
import accQty from "@/assets/images/acc-qty.png";
import accGAS from "@/assets/images/acc-GAS.png";
import accBalance from "@/assets/images/acc-balance.png";
import "./userCenter.scoped.css"
import Table, { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useInject } from "@/hooks/inject";

interface DataType {
  id: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag, index) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <div key={index}>123</div>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    id: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    id: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const UserCenter: React.FC = useInject(['Global'])(({ Global }) => {

  const { userInfo } = Global.state

  const navigate = useNavigate()

  const edit = () => navigate("/user/edit")

  return (
    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">个人中心</p>
      <Gap height={30}></Gap>
      <ConfigProvider theme={{
        token: {
          colorBgContainer: '#323546'
        }
      }}>
        <Card>
          <Row justify="space-between" style={{ display: 'flex', alignItems: 'center' }}>
            <Space size="middle">
              <Avatar size={60} />
              <div className="user-info">
                <p className="name">{userInfo.nickname}</p>
                <p className="id">区块链ID：{userInfo.address}</p>
              </div>
            </Space>
            <ConfigProvider theme={{
              components: {
                Button: {
                  defaultBg: 'rgba(0,0,0,.5)',
                  defaultBorderColor: '#5E62FF',
                  defaultColor: '#5E62FF'
                }
              }
            }}>
              <Button onClick={edit}>编辑</Button>
            </ConfigProvider>
          </Row>
          <Gap height={20} />
          <ConfigProvider theme={{
            token: {
              colorBgContainer: '#222531',
              colorPrimary: '#FFFFFF',
              colorBorderSecondary: 'transparent'
            }
          }}>
            <Card tabList={[{ label: '账户概览', key: '' }]} style={{ borderTop: '1.5px solid #6281FF' }}>
              <Row justify="space-around">
                <Space direction="vertical">
                  <Statistic value={651} />
                  <div className="acc-label">
                    <img className="icon" src={accInscription} />
                    <p className="text">我参与的铭文</p>
                    <QuestionCircleOutlined style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  </div>
                </Space>
                <Space direction="vertical">
                  <Statistic value={51651} />
                  <div className="acc-label">
                    <img className="icon" src={accQty} />
                    <p className="text">我拥有的铭文数量</p>
                    <QuestionCircleOutlined style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  </div>
                </Space>
                <Space direction="vertical">
                  <Statistic value={0.25} precision={2} />
                  <div className="acc-label">
                    <img className="icon" src={accGAS} />
                    <p className="text">总消耗的GAS</p>
                    <QuestionCircleOutlined style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  </div>
                </Space>
                <Space direction="vertical">
                  <Statistic value={4658} precision={2} />
                  <div className="acc-label">
                    <img className="icon" src={accBalance} />
                    <p className="text">GAS余额</p>
                    <QuestionCircleOutlined style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  </div>
                </Space>
              </Row>
            </Card>
          </ConfigProvider>
        </Card>
      </ConfigProvider>
      <Gap height={15} />
      <ConfigProvider theme={{
        token: {
          colorBgLayout: '#222531',
          controlPaddingHorizontal: 20
        },
        components: {
          Segmented: {
            itemSelectedBg: '#323546'
          }
        }
      }}>
        <Segmented size="large" options={['所有', '我的创建', '我的参与']}></Segmented>
      </ConfigProvider>
      <Gap height={20} />
      <ConfigProvider theme={{
        components: {
          Table: {
            headerBg: 'transparent'
          }
        }
      }}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </ConfigProvider>
    </Col>
  )
})

export default UserCenter