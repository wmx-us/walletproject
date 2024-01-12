import Gap from "@/components/Gap"
import { Avatar, Button, Card, Col, ConfigProvider, Form, Input, Radio, Row, Space, Upload, message } from "antd"
import { UserOutlined } from "@ant-design/icons";

import "./edit.scoped.css"
import { useInject } from "@/hooks/inject";
import { apiUpdateUserInfo } from "@/service/user/api";
import { useNavigate } from "react-router-dom";



const Edit: React.FC = useInject(['Global'])(({ Global }) => {

  const { userInfo } = Global.state

  const navigate = useNavigate()

  const onFinish = async (values: ApiUserParams.UpdateUserInfoParams) => {
    console.log(values);
    try {
      await apiUpdateUserInfo(values)
      message.success('修改成功')
    } catch (error) {

    }
  }

  const logout = async () => {
    try {
      await Global.logout()
      navigate('/home')
      message.success('退出登录成功')
    } catch (error) {

    }
  }

  return (
    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">个人中心</p>
      <Gap height={30}></Gap>
      <ConfigProvider theme={{
        token: {
          colorBgContainer: '#222531'
        },
        components: {
          Input: {
            colorBgContainer: '#34343E'
          },
          Button: {
            borderRadiusLG: 5
          }
        }
      }}>
        <Card title="基本信息">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            // layout=""
            onFinish={onFinish}
          >
            <Form.Item name="" label="头像">
              <Row>
                {/* <Upload>
                  <Avatar size={110} shape="square" icon={<UserOutlined />}></Avatar>
                  <p className="file-type">允许的文件类型：png，jpg，jpeg</p>
                </Upload>
                <Col span={2}></Col> */}
                <div className="preview">
                  <Avatar size={95} shape="circle"></Avatar>
                  <p className="label">头像预览</p>
                </div>
              </Row>
            </Form.Item>
            <Form.Item name="nickname" label="帐号昵称" initialValue={userInfo?.nickname} rules={[{ required: true, message: '请输入账号昵称！' }]}>
              <Input size="large" />
            </Form.Item>
            {/* <Form.Item label="性别">
              <Radio.Group defaultValue={userInfo.gas}>
                <Radio value="apple">男</Radio>
                <Radio value="pear">女</Radio>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space size="large">
                <ConfigProvider theme={{
                  components: {
                    Button: {
                      primaryShadow: '#5E62FF'
                    }
                  },
                  token: {
                    colorPrimary: '#5E62FF'
                  }
                }}>
                  <Button size="large" type="primary" htmlType="submit">
                    保存
                  </Button>
                </ConfigProvider>
                <ConfigProvider theme={{
                  components: {
                    Button: {
                      defaultBg: 'rgba(255, 255, 255, 0.7)',
                      defaultColor: '#2F2F2F',
                      colorBorder: '#FFFFFF'
                    }
                  }
                }}>
                  <Button size="large" htmlType="reset">
                    取消
                  </Button>
                </ConfigProvider>
                <ConfigProvider theme={{
                  components: {
                    Button: {
                      defaultBg: 'rgba(255, 255, 255, 0.7)',
                      defaultColor: '#2F2F2F',
                      colorBorder: '#FFFFFF'
                    }
                  }
                }}>
                  <Button size="large" htmlType="button" onClick={logout}>
                    退出登录
                  </Button>
                </ConfigProvider>


              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Gap height={20}></Gap>
        <Card title="修改密码">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
          >
            <Form.Item label="登录密码">
              <Space direction="horizontal" wrap>
                <Input.Password size="large" value={'1231313'} visibilityToggle={false} />
                <Button size="large">确认</Button>
              </Space>
            </Form.Item>
            <Form.Item label="安全密码">
              <Space direction="horizontal" wrap>
                <Input.Password size="large" placeholder="你当前未设置安全密码" visibilityToggle={false} />
                <Button size="large">设置安全密码</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </ConfigProvider>
    </Col>
  )
})

export default Edit