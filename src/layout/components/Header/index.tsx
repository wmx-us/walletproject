import { Col, ConfigProvider, Image, Layout, Menu, Row } from "antd";
import "./index.css";
import { menu } from "@/layout/constant";
import type { MenuProps } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AvatarIcon from "./AvatarIcon";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import Global from "@/store/Global";
import { LocalStorage } from "@/utils";
import { LoginPswResponseType } from "@/service/loginServes/loginServes.d";

const LayoutHeader = () => {
  const { Header } = Layout;
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const [current, setCurrent] = useState<string>("");
  const handlerClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigator(e.key);
  };
  useEffect(() => {
    // 根据当前路由设置选中的菜单项
    if (pathname.startsWith("/overview")) {
      setCurrent("overview");
    } else if (pathname.startsWith("/inscription")) {
      setCurrent("inscription");
    } else if (pathname.startsWith("/home")) {
      setCurrent("home");
    } else if (pathname.startsWith("/help")) {
      setCurrent("help");
    } else if (pathname.startsWith("/recommend_inscription")) {
      setCurrent("recommend_inscription");
    }
  }, [pathname]);
  // logo 返回首页
  const handlerBack = () => navigator("/home");
  return (
    <ConfigProvider theme={{
      components: {
        Layout: {
          headerBg:  pathname.startsWith("/home") ? '#000000': "transparent",
        }
      }
    }}>
      <Header style={{ borderBottom: '1px solid #303030'}}>
        <Row justify="center">
          <Col span={1} onClick={handlerBack} style={{minWidth:140}}>
            <Image src={logo} preview={false} width={120} />
          </Col>
          <Col
            span={18}
            style={{ display: "flex", justifyContent: "space-between",maxWidth:1400,minWidth:1200 }}
          >
            <div className="header-lf">
              <ConfigProvider theme={{
                components: {
                  Menu: {
                    horizontalItemSelectedColor: '#5E62FF'
                  }
                },
                token: {
                  colorBgContainer: 'transparent',
                  colorSplit: 'transparent'
                }
              }}>
                <Menu
                  items={menu}
                  mode="horizontal"
                  selectedKeys={[current]}
                  onClick={handlerClick}
                />
              </ConfigProvider>
            </div>
            <div className="header-ri">
              {Global.state?.token ||
                (LocalStorage.getItem("userInfo") as LoginPswResponseType)?.token ? (
                <>
                  <div style={{ whiteSpace: "nowrap" }}>GASS: 651</div>
                  <div>
                    <BellOutlined />
                  </div>
                  <AvatarIcon />
                </>
              ) : (
                <button className="loginBtn" onClick={() => navigator("/login")}>登录</button>
              )}
            </div>
          </Col>
          <Col span={2} />
        </Row>
      </Header>
    </ConfigProvider>
  );
};

export default LayoutHeader;
