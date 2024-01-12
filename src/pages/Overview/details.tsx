import Gap from "@/components/Gap"
import { Button, Card, Col, ConfigProvider, Descriptions, DescriptionsProps, Row, Space, Table } from "antd"
import Search from "antd/es/input/Search"

import { PlusOutlined } from '@ant-design/icons';

import './details.scoped.css'
import Paragraph from "antd/es/typography/Paragraph";
import { ColumnsType } from "antd/es/table";

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '区块哈希',
    children: <a>0x773bdafcebc47400d2f07c7ad4eb4bcfad1677d723769520d8dc756876a8a0e8</a>,
  },
  {
    key: '2',
    label: '区块编号',
    children: '0xd3158',
  },
  {
    key: '3',
    label: 'gas',
    children: '0x419ce0',
  },
  {
    key: '4',
    label: '发送者',
    children: '0x2b18f9673db8fe0141221256e90e19d343da2071=>',
  },
  {
    key: '5',
    label: '交易索引',
    children: '0x0',
  },
  {
    key: '6',
    label: '接收者',
    children: '0xc875e7d249398913753b63a59d3925c54ef9c481',
  },
  {
    key: '7',
    label: '随机数',
    children: '0x14ac7577701b0810be095f965f912b2878b550123e2fbb90360fb5986378b71',
  },
  {
    key: '8',
    label: '价值',
    children: '0x0',
  },
  {
    key: '9',
    label: '哈希',
    children: '0x3db6fe5f573781d199cf8c7d53300a44010bad1a07dd19be003697d08ec08fdb',
  },
  {
    key: '10',
    label: 'gas价格',
    children: '0x51f4d5c00',
  },
];

const columns: ColumnsType<{
  key: string | number
  name: string
  type: string
  data: string
}> = [
    { title: '名称', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '类型', dataIndex: 'type', key: 'type', align: 'center' },
    {
      title: '数据', dataIndex: 'data', key: 'data', width: '40%', align: 'center', render: (text) => {
        return <ConfigProvider theme={{
          token: {
            colorLink: 'rgba(255,255,255, .9)'
          }
        }}><Paragraph copyable style={{ margin: 0 }}>56sdfadASDAsdqwwrd345esfsa234csdac</Paragraph></ConfigProvider>
      }
    }]

const Details = () => {
  return (
    <Row justify="center">
      <Col span={18}>
        <ConfigProvider theme={{
          components: {
            Descriptions: {
              itemPaddingBottom: 30,
              contentColor: 'rgba(255,255,255,.9)'
            }
          },
          token: {
            colorBgContainer: '#222531'
          }
        }}>
          <Gap height={50}></Gap>
          <Search placeholder="按区块/交易量信息进行搜索" enterButton style={{ maxWidth: 600 }} />
          <Gap height={50}></Gap>
          <Row justify="space-between">
            <Space size="middle" className="title" >
              <p className="text">交易</p><Paragraph copyable style={{ margin: 0 }}><a className="hash">56sdfadASDAsdqwwrd345esfsa234csdac</a></Paragraph>
            </Space>
            <ConfigProvider theme={{
              components: {
                Button: {
                  defaultBg: '#5E62FF',
                  defaultColor: '#FFFFFF'
                }
              }
            }}><Button>5S 确认</Button></ConfigProvider>
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
                <p className="text">功能</p><p className="text">mint(address _to,uint256 _tokenId)</p><p className="text">方法</p><p className="text">0x40c10f19</p>
              </Space>
              <ConfigProvider theme={{
                components: {
                  Button: {
                    defaultBg: '#151515',
                    defaultColor: '#FFFFFF',
                    defaultBorderColor: '#5E62FF'
                  }
                }
              }}><Button icon={<PlusOutlined style={{ color: '#5E62FF' }} />}>1T GROK</Button></ConfigProvider>

            </Row>
            <Gap height={20}></Gap>
            <ConfigProvider theme={{
              components: {
                Table: {
                  headerBg: '#000102'
                }
              },
              token: {
                colorBgContainer: '#0D1421'
              }
            }}>
              <Table bordered pagination={false} columns={columns} dataSource={[{ key: 1, name: '_to', data: '', type: '1' }, { key: 1, name: '_to', data: '', type: '1' }]} />

            </ConfigProvider>
          </Card>
        </ConfigProvider>
      </Col>
    </Row>
  )
}

export default Details