import { Layout } from "antd"

const LayoutHeader =() => {
    const {Header} = Layout

    return (
        <Header>
            <div className="header-Lf">
                111
            </div>
            <div className="header-ri">
                <span className="username">Hooks</span>
            </div>
        </Header>
    )
}

export default LayoutHeader