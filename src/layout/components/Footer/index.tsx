import "./index.scoped.css";
import { Col, ConfigProvider, Layout, Row } from "antd";
import {
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
const LayoutFooter = () => {
  const { Footer } = Layout;
  const { pathname } = useLocation();
  return (
    <ConfigProvider
        theme={{
            components:{
                Layout:{
                    footerBg:  pathname.startsWith("/home") ? '#000000': "transparent",
                }
            }
        }}
    >
      <Footer className="footer" style={{ borderTop: '1px solid #303030'}}>
        <Row justify="center">
          <Col span={9} className="footer-le">
            <div className="footer-dom">文档</div>
            <div className="footer-dom">常见问题</div>
            <div className="footer-version">隐私和保护</div>
            <div className="footer-version">版权</div>
          </Col>
          <Col span={6}></Col>
          <Col span={3} style={{ textAlign: "center" }}>
            <YoutubeOutlined style={{ fontSize: 25, color: "#4B4B4B" }} />
            <FacebookOutlined
              style={{ fontSize: 25, padding: "0px 20px", color: "#4B4B4B" }}
            />
            <TwitterOutlined style={{ fontSize: 25, color: "#4B4B4B" }} />
          </Col>
        </Row>
        {/* <a target="_blank" rel="noreferrer">2023.12.20 © 2442845618@qq.com</a> */}
      </Footer>
    </ConfigProvider>
  );
};

export default LayoutFooter;
