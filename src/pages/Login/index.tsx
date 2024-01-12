import { useInject } from "@/hooks/inject"
import "./index.scoped.css"
import { Col, Image, Row, } from "antd";
import imageurl from "@/assets/images/title_1.png"
import LoginCom from "./components/LoginCom";
import RegisterCom from "./components/RegisterCom";

const Login = useInject(["Login"])((props) => {

    const { Login } = props
    const { state } = Login
    const { isRegister } = state

    return (
        <div className="login">
            <Row justify="center">
                <Col span={18} style={{ height: "100vh", alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                    <Col span={1}></Col>
                    <Col span={12} style={{ height: 500 }}>
                        <div className="welcome-l">
                            <div className="welcome-land">欢迎来到铭文大陆</div>
                            <div className="star"></div>
                        </div>
                        <Image src={imageurl} preview={false} style={{ marginTop: 10 }} />
                    </Col>
                    <Col span={8}>
                        {isRegister && <LoginCom />}
                        {!isRegister && <RegisterCom />}
                    </Col>
                </Col>

            </Row>
        </div>
    )
})

export default Login
