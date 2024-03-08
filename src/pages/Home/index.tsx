import { Button, Col, ConfigProvider, Modal, Row, Space } from "antd";
import { cardTabs } from "./constant";
import "./index.scoped.css";
import "./index.css";
import { useEffect, useState } from "react";
import Gap from "@/components/Gap";
import { CloseOutlined } from "@ant-design/icons";
import { cleanScene, initializeScene } from "@/utils/dynamic";
import PlatfromCard from "./components/patfromCard";
import Integrate from "./components/integrated";
import ServiceConcept from "./components/serviceConcept";
import OperationalGguideline from "./components/operationalGguideline";
import InscriptionCard from "./components/InscriptionCard";
import InscriptionCardOne from "./components/InscriptionCardOne";
import CarouselCard from "./components/carouselCard";
import FirstPlatfrom from "./components/firstPlatform";
import ModalCooperation from "./components/modalCooperation";
import RightStep from "./components/rightStep";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [select, setSelect] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const navigator = useNavigate();
  const [id, setId] = useState<string>("");
  const handlerLink = (id: string) => {
    if (id == "1") setOpen(true);
    if (id == "2") navigator("/inscription");
  };

  /**
   * @description 实现锚点功能
   * @param id
   * @param index
   */
  const scrollToSection = (id: string, index: number) => {
    setSelect(index);
    setId(id);
  };

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [id]);
  useEffect(() => {
    // 初始化场景前进行 清除标签
    cleanScene();
    // 在初始化标签
    initializeScene();
  }, []);
  return (
    <section className="homeContentBG">
      <PlatfromCard />
      <Row justify="center">
        <Col span={18} className="cardTabs">
          <Space size="middle">
            {cardTabs.map((item, index) => (
              <a
                id={item.id}
                rel="noopener"
                key={item?.id}
                href={item?.id}
                className={`cardAnchor ${select === index ? "active" : ""}`}
                onClick={() => scrollToSection(item.id, index)}
              >
                <div>{item?.icon}</div>
                <div className="anchorId">{item.name}</div>
              </a>
            ))}
          </Space>
        </Col>
      </Row>
      <Gap height={60} />
      <div id="part-1">
        <Integrate />
      </div>

      <Gap height={80} />
      <div id="part-2">
        <ServiceConcept />
      </div>

      <Gap height={82} />
      <OperationalGguideline handlerLink={handlerLink} />

      <Gap height={134} />
      <div id="part-3">
        <InscriptionCard />
      </div>

      <Gap height={117} />
      <InscriptionCardOne />

      <Gap height={104} />
      <div id="part-4">
        <CarouselCard />
      </div>
      <Gap height={40} />
      <FirstPlatfrom />

      <ConfigProvider
        theme={{
          components: {
            Button: {
              // defaultBg: `linear-gradient(180deg, #241545 0%, #4B328E 100%),linear-gradient(180deg, #C7A4FF 0%, rgba(255, 255, 255, 0.4) 100%);`,
              paddingInline: 7,
            },
            Modal:{
              contentBg:"rgba(0,0,0,0)",
              headerBg: "rgba(0,0,0,0)"
            }
          },
        }}
      >
        <Modal
          title={<div className="modalOpen">项目方合作</div>}
          open={open}
          closeIcon={
            <Button style={{ height: 30}}>
              <CloseOutlined />
            </Button>
          }
          width={970}
          maskClosable={false}
          onCancel={() => setOpen(false)}
          footer={null}
        >
          <Row justify="space-around">
            <Col span={12}>
              <Gap height={30} />
              <ModalCooperation />
            </Col>
            <Col span={8}>
              <RightStep />
            </Col>
          </Row>
        </Modal>
      </ConfigProvider>
    </section>
  );
};

export default Home;
