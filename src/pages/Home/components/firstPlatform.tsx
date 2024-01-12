import { Row, Image, Space } from "antd";
import "../index.scoped.css";
import Gap from "@/components/Gap";
import { channelBtn } from "../constant";
import bg4 from "@/assets/images/bg5.png";
import { useEffect, useRef, useState } from "react";
const FirstPlatfrom = () => {

  const platfromuseRef = useRef<HTMLDivElement | null>(null);
  const scrolled = useRef<boolean>(false);
  const [styledy, setStyledy] = useState<React.CSSProperties>({});
  const HandlerScroll = () => {
    const node = platfromuseRef?.current;
    if (node && document.documentElement) {
      const rect = node?.getBoundingClientRect();
      const isScrolledToCenter = platfromuseRef.current
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
      <Row justify="center" style={{ position: "relative" }}>
        <Image src={bg4} preview={false} style={{maxWidth:1920}}/>
        <div className="channel" ref={platfromuseRef} style={{ transitionDelay: "0.2s", ...styledy }}>
          <h2>国内首家铭文mint综合性服务平台</h2>
          <Gap height={16} />
          <h5>
            铭文市场早知道，可在平台了解最新的行业资讯，提前布局，掌握一手信息。
          </h5>
          <Gap height={29} />
          <Space>
            {channelBtn.map((item) => (
              <div key={item?.id} className="channelBtn" style={{ transitionDelay: "0.2s", ...styledy }}>
                {item?.icon} {item?.name}
              </div>
            ))}
          </Space>
        </div>
      </Row>
    </>
  );
};

export default FirstPlatfrom;
