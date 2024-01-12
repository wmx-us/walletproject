
import { useEffect } from "react"
import "./index.scoped.css"
import { Layout } from "antd"
import LayoutHeader from "./components/Header"
import { Outlet } from "react-router-dom"
import LayoutFooter from "./components/Footer"
const LayoutIndex = () => {

    const { Content } = Layout
    useEffect(() => {

    }, [])
    return (
        <Layout>
            <LayoutHeader />
            <Content style={{
                minHeight: "calc(100vh - 113px)"
            }}>
                <Outlet />
            </Content>
            <LayoutFooter />
        </Layout>
    )
}

export default LayoutIndex