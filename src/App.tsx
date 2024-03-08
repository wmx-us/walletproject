import { useEffect, useState } from 'react'
import './app.scoped.css'
import { ConfigProvider, theme } from 'antd'
import Router from "@/router/index"
import AuthRouter from './router/utils/authRouter'
import Global from './store/Global'
import enUS from "antd/locale/en_US"
import zhCN from "antd/locale/zh_CN"
import { Locale } from 'antd/es/locale'

function App() {
  const [locale, setLocale] = useState<Locale>(zhCN); // 默认语言为中文

  const changeLocale = (language: string) => {
    const newLocale = language === 'en' ? enUS : zhCN;
    setLocale(newLocale);
  };

  // const {} = props
  useEffect(() => {
    // 生成设备UUID 
    Global.getUUid()
  }, [])
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Table: {
            borderColor: '#494949',
            headerBg: "transparent",
            headerSplitColor: 'transparent',
            colorBgContainer: 'transparent',
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
