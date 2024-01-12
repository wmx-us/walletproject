import { Col, Row, Image } from "antd";
import "../index.scoped.css";
import { InscriptionExplain } from "../constant";
import bg2 from "@/assets/images/bg2.png";
import { useEffect, useRef, useState } from "react";
const InscriptionCardOne = () => {
  const seconduseRef = useRef<HTMLDivElement | null>(null);
  const scrolled = useRef<boolean>(false);
  const [styledy, setStyledy] = useState<React.CSSProperties>({});
  const HandlerScroll = () => {
    const node = seconduseRef?.current;
    if (node && document.documentElement) {
      const rect = node?.getBoundingClientRect();
      const isScrolledToCenter = scrolled.current
        ? rect.top <= window.innerHeight
        : rect.top - window.innerHeight <= 0;
      if (isScrolledToCenter == scrolled.current) return;
      scrolled.current = isScrolledToCenter; // 在这里更新 scrolled 状态
      if (isScrolledToCenter) {
        setStyledy({
          opacity: 1,
          transform: "translateY(0px)",
        });
      } else {
        setStyledy({});
      }
    }
  };

  useEffect(() => {
    // 初始化渐变
    document.addEventListener("scroll", HandlerScroll);
    return () => {
      document.removeEventListener("scroll", HandlerScroll);
    };
  }, []);
  return (
    <>
      <Row justify="center">
        <Col
          span={18}
          style={{
            maxWidth: 1400,
            minWidth: 1200,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Col
            span={11}
            className="presentation"
            style={{ opacity: styledy.opacity }}
          >
            <div style={{ flex: 1 }}>
              <div className="presentation-title">
                <h2>全方位挖掘·多角度体验</h2>
                <h2>铭文大陆带来全新的数字铭文mint新感受</h2>
              </div>
              {InscriptionExplain.map((item, index) => (
                <div
                  key={item?.id}
                  className="presentation-ele"
                  style={{ transitionDelay: `${index * 0.2}s`, ...styledy }}
                >
                  <div className="presentation-item">
                    <div>{item?.icon}</div>
                    <span>{item?.title}</span>
                  </div>
                  <div className="presentation-content"> {item?.content}</div>
                </div>
              ))}
            </div>
          </Col>
          <Col span={1} />
          <Col span={12} ref={seconduseRef} style={{ ...styledy }}>
            <Image src={bg2} preview={false} width="100%" />
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default InscriptionCardOne;
