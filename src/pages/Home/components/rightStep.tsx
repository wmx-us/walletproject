import { Divider, Steps } from "antd";

import "../index.scoped.css";
import Gap from "@/components/Gap";
const RightStep = () => {
  return (
    <div className="rightContent">
      <div className="stepTitle">只需三步，即刻入驻：</div>
      <div className="rightContent-layout">
        <div className="rightContent-layout-item">
          <p className="label">01</p>
          <p className="text">信息填写：将项目方信息填写至表单，需全面、完整、真实</p>
        </div>
        <Gap height={50}/>
        <div className="rightContent-layout-item">
          <p className="label">02</p>
          <p className="text">专员审核：平台将对项目方信息进行审核，确保信息有效，审核通过后将有专员联系，请保持电话畅通</p>
        </div>
        <Gap height={50}/>
        <div className="rightContent-layout-item">
          <p className="label">03</p>
          <p className="text">发行铭文：审核通过后，平台将为项目方发行专属铭文，助力数字文化发展与繁荣</p>
        </div>
      </div>
      {/* <Steps
        direction="vertical"
        current={1}
        items={[
          {
            title: "",
            description:"信息填写：将项目方信息填写至表单，需全面、完整、真实",
          },
          {
            title: "",
            description:"专员审核：平台将对项目方信息进行审核，确保信息有效，审核通过后将有专员联系，请保持电话畅通",
          },
          {
            title: "",
            description:"发行铭文：审核通过后，平台将为项目方发行专属铭文，助力数字文化发展与繁荣",
          },
        ]}
      /> */}
    </div>
  );
};

export default RightStep;
