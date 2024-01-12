import Gap from "@/components/Gap"
import { Alert, Button, Col, ConfigProvider, Form, Input, Select, Space, Upload, message } from "antd"

import './verified.scoped.css'
import { useEffect, useState } from "react"
import { apiFirstCertified, apiGetCertified } from "@/service/user/api"

const Verified = (() => {

  const [certified, setCertified] = useState({} as ApiUserResult.UserAuthRet)

  const getCertified = async () => {
    try {
      const data = await apiGetCertified()

      setCertified(data)
      console.log(certified);

    } catch (error) {

    }
  }

  const onFinish = async (values: ApiUserParams.UserAuthParams) => {
    try {
      await apiFirstCertified(values)
      message.success('认证成功')
      getCertified()
    } catch (error) {

    }
  }

  useEffect(() => {
    getCertified()
  }, [])

  return (

    <Col span={16} style={{ marginLeft: 60 }}>
      <Gap height={110}></Gap>
      <p className="title">实名认证</p>
      <Gap height={10} />
      <ConfigProvider theme={{
        token: {
          colorInfoBg: 'rgba(134, 137, 226, .3)',
          colorInfoBorder: '#8689E2',
          colorInfo: '#8689E2',
          colorText: '#8689E2'
        }
      }}>
        <Alert message="证件信息仅用于实名认证，不会泄露您的任何证件信息。" type="info" showIcon />
      </ConfigProvider>

      <Gap height={20} />
      <Form
        wrapperCol={{ span: 14 }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="type" label="证件类型">
          <Select
            defaultValue="0"
            options={[
              { value: '0', label: '中华人民共和国居民身份证' }
            ]}
          />
        </Form.Item>
        <Form.Item name="realName" label="身份证姓名" rules={[{ required: true }]} initialValue={certified.realName}>
          <Input disabled={certified.isAuth == 0 ? false : true} />
        </Form.Item>
        <Form.Item name="idcardNumber" label="身份证号码" rules={[{ required: true }]} initialValue={certified.idcardNumber}>
          <Input disabled={certified.isAuth == 0 ? false : true} />
        </Form.Item>
        {/* <Form.Item name="nickname" label="请上传附件" rules={[{ required: true }]}>
          <p className="file-type">支持JPG，JPEG，png格式图片，大小不超过5M</p>
          <Gap height={50}></Gap>
          <Space size="large">
            {
              [1, 1, 1].map(() => (
                <div className="item">
                  <p className="item-label">身份证人像面</p>
                  <Gap height={20}></Gap>
                  <Upload>
                    <div style={{ width: 220, height: 135, background: 'red' }}></div>
                  </Upload>
                </div>
              ))
            }
          </Space>
        </Form.Item> */}

        <Form.Item>
          <Space >
            <ConfigProvider theme={{
              components: {
                Button: {
                  primaryColor: '#FFFFFF'
                }
              },
              token: {
                colorPrimary: '#5E62FF'
              }
            }}>
              <Button type="primary" htmlType="submit">
                提交审核
              </Button>
            </ConfigProvider>
            <ConfigProvider theme={{
              components: {
                Button: {
                  defaultColor: '#919191',
                  defaultBg: '#FFFFFF'
                }
              }
            }}>
              <Button htmlType="reset">
                取消
              </Button>
            </ConfigProvider>
          </Space>
        </Form.Item>
      </Form>
    </Col>
  )
})


export default Verified