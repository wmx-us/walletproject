import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { Col, Row, Image, Carousel, ConfigProvider, Button } from "antd";
import "../index.scoped.css";
import Gap from "@/components/Gap";
import { useEffect, useRef, useState } from "react";
import { CarouselRef } from "antd/es/carousel";
import { chain } from "../constant";
import b3 from "@/assets/images/bg3.png";
const CarouselCard = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const carouseluseRef = useRef<HTMLDivElement | null>(null);
  const scrolled = useRef<boolean>(false);
  const [styledy, setStyledy] = useState<React.CSSProperties>({});
  const HandlerScroll = () => {
    const node = carouseluseRef?.current;
    if (node && document.documentElement) {
      const rect = node?.getBoundingClientRect();
      const isScrolledToCenter = carouseluseRef.current
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
      <Row justify="center" ref={carouseluseRef}>
        <div className="online" style={{ transitionDelay: "0.2s", ...styledy }}>
          <h2>
            铭文大陆正式上线1个月，已获<span>10＋</span>项目方战略合
          </h2>
          <Gap height={10} />
          <h2>
            作，<span>50＋</span>品牌方意向合作
          </h2>
        </div>
        <Gap height={57} />

        <Col
          span={18}
          className="transtionCarourel"
          style={{
            position: "relative",
            boxShadow: "0px 4px 77.5px 0px rgba(22, 0, 44,0.3)",
            transitionDelay: "0.2s",
            maxWidth:1400,minWidth:1200,
            ...styledy,
          }}
        >
          <Carousel
            dotPosition="bottom"
            autoplay
            // autoplaySpeed={1000}
            ref={carouselRef}
          >
            <div className="carousel">
              <div className="carousel-le">
                <h3>{chain.p1}</h3>
                <Gap height={13} />
                <h4>{chain.p2}</h4>
                <Gap height={25} />
                <h3>{chain.p3}</h3>
                <Gap height={10} />
                <h4>{chain.p4}</h4>
                <Gap height={93} />
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultBg: "#5E62FF",
                        defaultColor: "#FFFFFF",
                        defaultBorderColor: "#5E62FF",
                      },
                    },
                  }}
                >
                  <Button className="carousel-btn">铭刻</Button>
                </ConfigProvider>
              </div>
              <Image src={b3} preview={false} />
            </div>
            <div className="carousel">
              <div className="carousel-le">
                <h3>{chain.p1} test111</h3>
                <Gap height={13} />
                <h4>{chain.p2}</h4>
                <Gap height={25} />
                <h3>{chain.p3}</h3>
                <Gap height={10} />
                <h4>{chain.p4}</h4>
                <Gap height={93} />
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultBg: "#5E62FF",
                        defaultColor: "#FFFFFF",
                        defaultBorderColor: "#5E62FF",
                      },
                    },
                  }}
                >
                  <Button className="carousel-btn">铭刻</Button>
                </ConfigProvider>
              </div>
              <Image src={b3} preview={false} />
            </div>
            <div className="carousel">
              <div className="carousel-le">
                <h3>{chain.p1}test22</h3>
                <Gap height={13} />
                <h4>{chain.p2}</h4>
                <Gap height={25} />
                <h3>{chain.p3}</h3>
                <Gap height={10} />
                <h4>{chain.p4}</h4>
                <Gap height={93} />
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultBg: "#5E62FF",
                        defaultColor: "#FFFFFF",
                        defaultBorderColor: "#5E62FF",
                      },
                    },
                  }}
                >
                  <Button className="carousel-btn">铭刻</Button>
                </ConfigProvider>
              </div>
              <Image src={b3} preview={false} />
            </div>
          </Carousel>
          <div
            className="arrow"
            style={{ transitionDelay: "0.2s", ...styledy }}
          >
            <LeftCircleFilled
              className="arrow-le"
              onClick={() => carouselRef.current?.prev()}
            />
            <RightCircleFilled
              className="arrow-ri"
              onClick={() => carouselRef.current?.next()}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CarouselCard;
