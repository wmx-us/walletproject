import { useEffect } from 'react'
import './app.scoped.css'
import { ConfigProvider, theme } from 'antd'
import Router from "@/router/index"
import AuthRouter from './router/utils/authRouter'
import Global from './store/Global'

function App() {

  // const {} = props
  useEffect(() => {
    // 生成设备UUID 
    Global.getUUid()
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Table: {
            borderColor: '#494949',
            headerSplitColor: '#494949',
            colorBgContainer: 'transparent'
          },
          Input: {
            colorBgContainer: '#222531',
            colorBorder: '#434343'
          },
          Select: {
            colorBgContainer: '#222531',
            colorBorder: '#434343',
            colorBgElevated: '#434343',
            // optionSelectedBg: '#222531'
          }
        },
        token: {
          colorBgBase: '#0D1421',

        }
      }}
    >
      <AuthRouter>
        <Router />
      </AuthRouter>
    </ConfigProvider>
  )
}

export default App
