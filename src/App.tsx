/* eslint-disable @typescript-eslint/no-explicit-any */


import { useEffect } from 'react'
import './app.scoped.css'
import { ConfigProvider } from 'antd'
import { useRoutes } from 'react-router-dom'
import { routes } from './router'

function App() {

  // const {} = props
  useEffect(() => {

  },[])

  return (
    <ConfigProvider>
      {useRoutes(routes)}
    </ConfigProvider>
  )
}

export default App
