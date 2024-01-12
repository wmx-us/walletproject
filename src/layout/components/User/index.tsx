import Gap from "@/components/Gap";
import { Col, Menu, MenuProps, Row, ConfigProvider } from "antd"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CodeSandboxOutlined } from "@ant-design/icons";
import "./index.scoped.css";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items = [
  { label: '账户余额', key: 'balance', path: '/user/balance', icon: <CodeSandboxOutlined /> },
  { label: '个人中心', key: 'center', path: '/user/center', icon: <CodeSandboxOutlined /> },
  { label: '实名认证', key: 'verified', path: '/user/verified', icon: <CodeSandboxOutlined /> },
  { label: '我的铭文', key: 'inscription', path: '/user/inscription', icon: <CodeSandboxOutlined /> }
]

const User = () => {
  const location = useLocation()

  const navigate = useNavigate()

  const [selectedKey, setSelectedKey] = useState('')

  useEffect(() => {
    const key = items.find(e => e.path == location.pathname)?.key
    if (key) setSelectedKey(key)

  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key)
    navigate(items.find(item => item.key == e.key)?.path!)
  };
  return (
    <Row justify="center">
      <Col span={18} style={{ display: 'flex', maxWidth: 1200 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Gap height={115} />
          <ConfigProvider theme={{
            components: {
              Menu: {
                itemSelectedColor: '#FFFFFF',
                itemSelectedBg: 'rgba(50, 125, 255, .1)',
                colorBgContainer: 'transparent',
                colorSplit: 'transparent'
              }
            }
          }}>
            <Menu
              onClick={onClick}
              style={{ width: 200 }}
              mode="inline"
              selectedKeys={[selectedKey]}
              items={items.filter((e) => getItem(e.label, e.key, e.icon))}
            />
          </ConfigProvider>
        </div>
        <Outlet />
      </Col>
    </Row>
  )
}

export default User