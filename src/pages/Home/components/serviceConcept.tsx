import { Col, Row } from "antd";
import "../index.scoped.css";
import Gap from "@/components/Gap";
import { servesbanner } from "../constant";
import { useEffect, useRef, useState } from "react";

const ServiceConcept = () => {
  const servesuseRef = useRef<HTMLDivElement | null>(null);
  const scrolled = useRef<boolean>(false);
  const [styledy, setStyledy] = useState<React.CSSProperties>({});
  const HandlerScroll = () => {
    const node = servesuseRef?.current;
    if (node && document.documentElement) {
      const rect = node?.getBoundingClientRect();
      const isScrolledToCenter = scrolled.current
        ? rect.top <= window.innerHeight
        : rect.top - window.innerHeight * 0.8 <= 0;
      if (isScrolledToCenter == scrolled.current) return;
      scrolled.current = isScrolledToCenter;
      if (isScrolledToCenter) {
        setStyledy({
          opacity: "1",
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
  }, [scrolled]);
  return (
    <>
      <Row justify="center">
        <h2 className="serves">服务理念</h2>
        <Gap height={25} />
        <Col span={18} style={{ display: "flex", flexWrap: "wrap",maxWidth:1400,minWidth:1200 }}>
          {servesbanner.map((item) => (
            <Col
              span={6}
              key={item?.id}
              ref={servesuseRef}
            >
              <div className="banner-item">
                <div style={styledy} className="serves-content">
                  {item?.icon}
                  <div className="banner-title">
                    <h2>{item?.name}</h2>
                  </div>
                  <div className="banner-content">{item?.content} </div>
                </div>
              </div>
            </Col>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ServiceConcept;
