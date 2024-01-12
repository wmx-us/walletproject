import Gap from "@/components/Gap"
import { Button, Card, Checkbox, Col, ConfigProvider, Form, Input, Row, Select, Space } from "antd"

import "./index.scoped.css"

const Give = () => {
  return (

    <Row justify="center">
      <Col span={16} style={{ maxWidth: 1000 }}>
        <ConfigProvider theme={{
          components: {
            Select: {
              selectorBg: '#34343E'
            },
            Card: {
              headerBg: '#272832',
              headerHeight: 95
            },
            Button: {

            }
          },
          token: {
            colorBgContainer: '#222531',
            colorLink: '#FF3737'
          }
        }}>
          <Gap height={40}></Gap>
          <p className="title">我的铭文</p>
          <Gap height={30}></Gap>
          <Card style={{ maxWidth: 1000, margin: '0 auto', minWidth: 350 }}>
            <Row justify="center" >
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ flex: 1, maxWidth: 700 }}
              >
                <Form.Item
                  label="请选择铭文"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                  >
                    <Select.Option value="male">male</Select.Option>
                    <Select.Option value="female">female</Select.Option>
                    <Select.Option value="other">other</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="接收者"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input style={{ backgroundColor: '#34343E' }} />
                </Form.Item>

                <Form.Item
                  label="数量"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input style={{ backgroundColor: '#34343E' }} />
                </Form.Item>

              </Form>
            </Row>
          </Card>
          <Gap height={25}></Gap>
          <ConfigProvider theme={{
            token: {
              paddingLG: 0
            }
          }}>
            <Card title={
              (
                <Row justify="space-between" align="middle" style={{ padding: '0 40px' }}>
                  <p className="label">选择你要支付的转赠GAS费</p>
                  <p className="sub-title">不保证显示的时间。价值仅为估算值。</p>
                </Row>
              )
            } style={{ maxWidth: 1000, margin: '0 auto', minWidth: 350 }}>
              <Row justify="space-between" align="middle" className="item">
                <p className="label">服务基本费：</p>
                <Space className="ri">
                  <p className="gas">168</p>
                  <p className="gas-unit">GAS</p>
                </Space>
              </Row>
              <Gap height={1} bgColor="#494949"></Gap>
              <Row justify="space-between" align="middle" className="item">
                <p className="label">转赠费用：</p>
                <Space className="ri">
                  <p className="gas">168</p>
                  <p className="gas-unit">GAS</p>
                </Space>
              </Row>
              <Gap height={1} bgColor="#494949"></Gap>
              <Row justify="space-between" align="middle" className="item item-all">
                <p className="label">全部：</p>
                <Space className="ri">
                  <p className="gas">168</p>
                  <p className="gas-unit">GAS</p>
                </Space>
              </Row>
            </Card>
          </ConfigProvider>
          <Gap height={40}></Gap>
          <ConfigProvider theme={{
            token: {
              colorPrimary: '#FF3737'
            }
          }}>
            <Checkbox >
              <Row>
                <p className="risk-warning">我已阅读并同意</p>
                <a>风险警告</a>
              </Row>
            </Checkbox>
          </ConfigProvider>
          <Gap height={40}></Gap>
          <ConfigProvider theme={{
            components: {
              Button: {
              }
            },
            token: {
              colorPrimary: '#5E62FF',
              controlHeight: 45
            }
          }}>
            <Button type="primary" style={{ width: '100%' }} shape="round" size="large">支付</Button>
          </ConfigProvider>
        </ConfigProvider>
      </Col>
    </Row>
  )
}

export default Give