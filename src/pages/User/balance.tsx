import { Button, Card, Col, Space, ConfigProvider, Table } from "antd"
import "./balance.scoped.css"
import Gap from "@/components/Gap"
import { ColumnsType } from "antd/es/table"
import { useInject } from "@/hooks/inject"
import { useEffect } from "react"

const Balance: React.FC = useInject(['Global'])((props) => {

  const { Global } = props

  const userInfo = Global.state.userInfo

  const columns: ColumnsType<typeof data[0]> = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div>
          <p>{record.time}</p>
          <p>{record.name}</p>
        </div>
      )
    }, {
      title: '',
      dataIndex: 'GAS',
      key: 'GAS',
      render: (text) => <p>{text} GAS</p>
    }
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      GAS: 32,
      time: '2023-12-16 09:27:12 '
    },
    {
      key: '2',
      name: 'Jim Green',
      GAS: 42,
      time: '2023-12-16 09:27:12 '
    },
    {
      key: '3',
      name: 'Joe Black',
      GAS: 32,
      time: '2023-12-16 09:27:12 '
    },
  ];

  useEffect(() => {
    console.log(Global.state)
  }, [])

  return (
    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">账户余额</p>
      <Gap height={30}></Gap>
      <Card className="layout">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="label">我的余额</span>
            <p className="GAS">
              <span className="number">{userInfo?.gas}</span>
              <span className="unit">GAS</span>
            </p>
          </div>
          <div>
            <Space>
              <ConfigProvider theme={{
                components: {
                  Button: {
                    defaultGhostBorderColor: '#5E62FF',
                    defaultGhostColor: '#5E62FF'
                  }
                }
              }}>
                <Button ghost>同步数据</Button>
              </ConfigProvider>
              <ConfigProvider theme={{
                components: {
                  Button: {
                    defaultBg: '#5E62FF',
                    defaultColor: '#FFFFFF',
                    defaultBorderColor: '#5E62FF'
                  }
                }
              }}>
                <Button>充值</Button>
              </ConfigProvider>
            </Space>
          </div>
        </div>
      </Card>
      <Gap height={40}></Gap>
      <p className="title">消费记录</p>
      <ConfigProvider theme={{
        components: {
          Table: { headerBg: 'transparent', headerSplitColor: 'transparent' }
        }
      }}>
        <Table style={{ background: 'transparent' }} columns={columns} dataSource={data} />
      </ConfigProvider>
    </Col>
  )
})

export default Balance