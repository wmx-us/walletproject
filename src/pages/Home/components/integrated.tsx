import { Col, Row, Image } from "antd";
import "../index.scoped.css";
import mask from "@/assets/images/Mask.png";
import { integratedService } from "../constant";
import { useEffect, useRef, useState } from "react";
const Integrate = () => {

  const integrateduseRef = useRef<HTMLDivElement | null>(null);
  const scrolled = useRef<boolean>(false);
  const [styledy, setStyledy] = useState<React.CSSProperties>({});
  const HandlerScroll = () => {
    const node = integrateduseRef?.current;
    if (node && document.documentElement) {
      const rect = node?.getBoundingClientRect();
      const isScrolledToCenter = integrateduseRef.current
        ? rect.top <= window.innerHeight 
        : rect.top - window.innerHeight <= 0;
      if (isScrolledToCenter == scrolled.current) return;
      scrolled.current = isScrolledToCenter // 在这里更新 scrolled 状态

      if (isScrolledToCenter) {
        setStyledy({
          opacity: 1,
          // transform: "translateY(0px)"
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
      document.removeEventListener("scroll",HandlerScroll)
    }
  }, []);
  return (
    <>
      <Row justify="center">
        <Col span={18} style={{maxWidth:1400,minWidth:1200}} >
          <div className="mask" ref={integrateduseRef}>
            <Image src={mask} preview={false} width="100%" />
            <div className="mask-left">
              <div className="title" style={{ transitionDelay: "0.2s", ...styledy }}>{integratedService?.title}</div>
              <div className="explain" style={{ transitionDelay: "0.3s", ...styledy }}>{integratedService?.explain}</div>
              <div className="btn" style={{ transitionDelay: "0.4s", ...styledy }}>
                {integratedService?.btn.map((item) => (
                  <div key={item?.id} id={item?.id} className="btn_1">
                    {item?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Integrate;
