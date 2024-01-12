import { Col, Row, Image } from "antd";
import "../index.scoped.css";

import bg from "@/assets/images/bg1.png";
import { _InscriptionExplain } from "../constant";
import React, { useEffect, useRef, useState } from "react";

const InscriptionCard = () => {
  const firstuseRef = useRef<HTMLDivElement | null>(null);
  const scrolled = useRef<boolean>(false);
  const [styledy, setStyledy] = useState<React.CSSProperties>({});
  const HandlerScroll = () => {
    const node = firstuseRef?.current;
    if (node && document.documentElement) {
      const rect = node?.getBoundingClientRect();
      const isScrolledToCenter = scrolled.current
        ? rect.top <= window.innerHeight - 200
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
      <Row justify="center" style={{ alignItems: "flex-start" }}>
        <Col span={18} style={{maxWidth:1400,minWidth:1200,display:"flex",justifyContent:"space-between"}} >
          <Col
            span={12}
            className="inherited"
            ref={firstuseRef}
            style={{ ...styledy }}
          >
            <Image src={bg} width="100%" preview={false}></Image>
            <div className="bg-layout">
              <p className="item">
                区块链技术，确保
                <br />
                铭文安全与透明
              </p>
              <p className="item">
                综合性服务
                <br />
                省时省力
              </p>
              <p className="item" style={{ alignSelf: "end" }}>
                快捷钱包
                <br />
                安全支付
              </p>
              <p className="item" style={{ alignSelf: "end" }}>
                创新与传承，共筑
                <br />
                文化未来
              </p>
            </div>
          </Col>
          <Col span={1}></Col>
          <Col
            span={11}
            className="presentation"
            style={{ opacity: styledy.opacity }}
          >
            <div>
              <div className="presentation-title">
                <h2>在传承中发展，从传统中挖掘创新</h2>
              </div>
              {_InscriptionExplain.map((item, index) => (
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
        </Col>
      </Row>
    </>
  );
};

export default InscriptionCard;
