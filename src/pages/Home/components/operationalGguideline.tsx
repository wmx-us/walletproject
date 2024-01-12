import { Col, Row } from "antd";
import "../index.scoped.css";
import Gap from "@/components/Gap";
import { operationBanner } from "../constant";
import { useEffect, useRef, useState } from "react";

interface Iprops {
  handlerLink: (id: string) => void;
}

const OperationalGguideline = (props: Iprops) => {
  const operationuseRef = useRef<HTMLDivElement | null>(null);
  const scrolled = useRef<boolean>(false);
  const [styledy, setStyledy] = useState<React.CSSProperties>({});
  const HandlerScroll = () => {
    const node = operationuseRef?.current;
    if (node && document.documentElement) {
      const rect = node?.getBoundingClientRect();
      const isScrolledToCenter = operationuseRef.current
        ? rect.top <= window.innerHeight - 250
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
      <Row justify="center" ref={operationuseRef}>
        <h2
          className="operation"
          style={{ transitionDelay: "0.2s", ...styledy }}
        >
          操作指引
        </h2>
        <Gap height={10} />
        <h4
          className="operation-explain"
          style={{ transitionDelay: "0.2s", ...styledy }}
        >
          让项目方更便捷发行，让用户更安全铭刻
        </h4>
        <Gap height={23} />
        {operationBanner.map((item) => (
          <Col
            span={9}
            className="operationBanner-item"
            key={item?.id}
            style={{ transitionDelay: "0.2s", maxWidth:680, minWidth:600, ...styledy }}
          >
            <div className="operationBanner-icon"> {item?.icon}</div>
            <div className="operationBanner-content">
              <h2>{item.operationType}</h2>
              <Gap height={10} />
              <h4>{item.title}</h4>
              <Gap height={10} />
              <div
                className="operationBanner-content-btn"
                onClick={() => props.handlerLink(item?.id)}
              >
                {item?.btn}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default OperationalGguideline;
