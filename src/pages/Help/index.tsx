import {
  Col,
  Collapse,
  ConfigProvider,
  Divider,
  Image,
  Row,
  Space,
  theme,
} from "antd";
import type { CollapseProps } from "antd";
import { useState} from "react";
import Search, { SearchProps } from "antd/es/input/Search";
import topBg from "@/assets/images/helpTopBg.png";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import "./index.css";
import "./index.scoped.css";

import Gap from "@/components/Gap";
import { _getItems, getItems } from "./constant";
import qrCode from "@/assets/images/qrcode.png";

const helpIndex = () => {
  const { token } = theme.useToken();
  const [isActive,setIsActive] = useState<boolean>(false)
  const [isActiveQuestion,setIsActiveQuestion] = useState<boolean>(false)

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const handlerCollapes = (key: string | string[]) => {

    if(key.includes("1")|| key.includes("2")){
        setIsActive(true)
    } else {
        setIsActiveQuestion(false)
    }
  };
  const _handlerCollapes = (key: string | string[]) => {

    if(key.includes("3")|| key.includes("4")|| key.includes("5")) {
        setIsActiveQuestion(true)
    } else {
        setIsActive(false)
    }
  };
  return (
    <Row justify="center" className="help">
      <Image src={topBg} preview={false} width="100%" height={335} />
      <Col span={18} className="helpview">
        {/* <ConfigProvider
          theme={{
            components: {
              Input: {
                colorBorder: "#A0A0A0",
                colorBgContainer: "transparent",
                addonBg: "#5E62FF",
                //   lineHeight:49
              },
              Button: {
                colorBorder: "#A0A0A0",
                colorBgContainer: "transparent",
              },
            },
          }}
        >
          <Search
            placeholder="搜索关键词，例如 “ 什么是铭文？”"
            onSearch={onSearch}
            size="large"
            style={{ maxWidth: 600 }}
          />
        </ConfigProvider> */}
        <p className="helpCenter">铭文大陆帮助中心</p>
        <Gap height={85}/>
        <Row className="help-content">
          <Col span={4} className="help-sidebar">
            <div className="sidebar-title">问题分类</div>
            <div className={isActive ? "isActive": "sidebar-active"}>操作指引</div>
            <div className={isActiveQuestion ? "isActive": "sidebar-active"}>常见问题指引</div>
            <div className="sidebar-active">如何联系</div>
          </Col>

          <Col span={18}>
            <Gap height={35} />
            <div className="help-content-opeartion">操作指引</div>
            <Divider />
            <Collapse
              bordered={false}
            //   accordion
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusCircleOutlined style={{ fontSize: 18 }} />
                ) : (
                  <PlusCircleOutlined style={{ fontSize: 18 }} />
                )
              }
              onChange={handlerCollapes}
              items={getItems()}
            />
            <Gap height={65} />
            <div className="help-content-opeartion">常见问题</div>
            <Divider />
            <Collapse
              bordered={false}
            //   accordion
              defaultActiveKey={["3"]}
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusCircleOutlined style={{ fontSize: 18 }} />
                ) : (
                  <PlusCircleOutlined style={{ fontSize: 18 }} />
                )
              }
              onChange={_handlerCollapes}
              //   style={{ background: token.colorBgContainer }}
              items={_getItems()}
            />
            <Gap height={60} />

            <div className="help-content-opeartion">如何联系</div>
            <Divider />
            <Image src={qrCode} preview={false} />
            <Gap height={90} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default helpIndex;
