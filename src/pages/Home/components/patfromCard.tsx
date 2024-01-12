import { Col, Row } from "antd";
import "../index.scoped.css";
import { useEffect, useState } from "react";
const PlatfromCard = () => {

  const [isShow,setIsShow] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true)
    }, 500);
  },[])
  // style={{opacity: isShow ? "1": "0"}}
  return (
    <>
      <Row id="container" className="container " justify="center">
        <Col className="container-Box"  span={18} />
        <Col className="container-text" span={9}>
          <div className="title">
            国内首家铭文mint <span className="platfrom">综合性服务平台</span>
          </div>
          <div className="title">铭文大陆，正式上线啦</div>
        </Col>
      </Row>
    </>
  );
};

export default PlatfromCard;
