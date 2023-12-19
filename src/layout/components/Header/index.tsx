import { Layout } from "antd"

const LayoutHeader =() => {
    const {Header} = Layout

    return (
        <Header>
            <div className="header-Lf">

            </div>
            <div className="header-ri">
                <span className="username"></span>
            </div>
        </Header>
    )
}

export default LayoutHeader