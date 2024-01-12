import { Image } from "antd";
import introduce from "@/assets/images/introduce.png";
import advantage from "@/assets/images/advantage.png";
import serves from "@/assets/images/serves.png";
import cooperation from "@/assets/images/cooperation.png";

// banner
import banner1 from "@/assets/images/banner1.png";
import banner2 from "@/assets/images/banner2.png";
import banner3 from "@/assets/images/banner3.png";
import banner4 from "@/assets/images/banner4.png";

// opBanner
import opBanner1 from "@/assets/images/opBanner1.png";
import opBanner2 from "@/assets/images/opBanner2.png";
import { WeiboOutlined, WechatOutlined } from "@ant-design/icons";
import redBook from "@/assets/images/redBook.png";
import frame from "@/assets/images/Frame.png";

// 动态库
import * as THREE from "three";
import { createCylinder } from "@/utils/dynamic/core";

export type tabslist = {
  id: string;
  name: string;
  icon: React.ReactNode;
};
export type servesbannertypes = {
  id: string;
  icon: React.ReactNode;
  name: string;
  content: string;
};

export const cardTabs: Array<tabslist> = [
  {
    id: "#part-1",
    name: "平台介绍",
    icon: <Image src={introduce} preview={false} />,
  },
  {
    id: "#part-2",
    name: "特色与优势",
    icon: <Image src={advantage} preview={false} />,
  },
  {
    id: "#part-3",
    name: "服务内容",
    icon: <Image src={serves} preview={false} />,
  },
  {
    id: "#part-4",
    name: "合作项目案例",
    icon: <Image src={cooperation} preview={false} />,
  },
];
export const integratedService = {
  title: "国内首家铭文mint综合性服务平台铭文大陆",
  explain:
    "铭文大陆（Inscribed Continent）作为国内首家铭文mint综合性服务平台，致力于为每一位用户提供专业、便捷、流畅、有价值的铭文服务。在国内大力推进数字经济发展的浪潮中，我们紧跟潮流，创新性的推出了铭文mint平台，让打铭文变得简单易懂、让WEB3.0的应用更加广泛深入、让数字经济的发展普惠到更多的大众。",
  btn: [
    {
      id: "1",
      name: "专业",
    },
    {
      id: "2",
      name: "便捷",
    },
    {
      id: "3",
      name: "流畅",
    },
    {
      id: "4",
      name: "价值",
    },
  ],
};

export const servesbanner: servesbannertypes[] = [
  {
    id: "banner1",
    icon: <Image src={banner1} preview={false} width="100%" />,
    name: "专业至上",
    content:
      "铭文的出现，为市场提供了一种新的交易方式，同时也为铭文所有者提供了更多的权益保护。因此我们汇聚了一批专业的WEB3.0技术及运营团队，致力于为用户提供最流畅、最安全、最便捷的铭文服务",
  },
  {
    id: "banner2",
    icon: <Image src={banner2} preview={false} width="100%" />,
    name: "用户为本",
    content:
      "我们始终将用户的需求放在首位，不断优化我们的服务，深化平台的服务内容，以满足用户更具个性化的需求和期望。",
  },
  {
    id: "banner3",
    icon: <Image src={banner3} preview={false} width="100%" />,
    name: "创新驱动",
    content:
      "在快速发展的互联网时代，尤其是在日新月异的数字经济发展中，我们始终保持敏锐的洞察力，不断推陈出新，创新模式和玩法，不断完善我们的产品和服务，以满足市场的不断变化。",
  },
  {
    id: "banner4",
    icon: <Image src={banner4} preview={false} width="100%" />,
    name: "平台宗旨",
    content:
      "致力于打造全方位、综合性的铭文服务平台，让铭刻更加简易便捷，让上链更具安全保障，让信息更能透明全面。",
  },
];

export const operationBanner = [
  {
    id: "1",
    icon: <Image src={opBanner1} preview={false} width="100%" />,
    operationType: "项目方合作指引",
    title: "快速发行自有铭文，打造专属社区",
    btn: "申请入驻",
  },
  {
    id: "2",
    icon: <Image src={opBanner2} preview={false} width="100%" />,
    operationType: "用户铭文mint操作指引",
    title: "快捷 安全 一键mint",
    btn: "打铭文入口",
  },
];

export const InscriptionExplain = [
  {
    id: "1",
    icon: <Image src={frame} preview={false} />,
    title: "铭文发行",
    content: "项目方可通过在平台发行铸造铭文，铭文将会在开始后向用户展示",
  },
  {
    id: "2",
    icon: <Image src={frame} preview={false} />,
    title: "铭文mint",
    content:
      "用户可直接在平台选择需要mint的铭文，成功铸造铭文后，平台将会为您上链",
  },
  {
    id: "3",
    icon: <Image src={frame} preview={false} />,
    title: "铭文浏览",
    content:
      "用户可在平台了解不同的铭文类型，找到更适合自己mint的铭文，以便发挥更高的价值和达成共识",
  },
  {
    id: "4",
    icon: <Image src={frame} preview={false} />,
    title: "铭文推荐",
    content:
      "平台将会为您推荐近期最为火爆的铭文，比如持有地址最多、进度最快、市场最活跃等。",
  },
  {
    id: "5",
    icon: <Image src={frame} preview={false} />,
    title: "新闻动态",
    content:
      "铭文市场早知道，可在平台了解最新的行业资讯，提前布局，掌握一手信息。",
  },
];
export const _InscriptionExplain = [
  {
    id: "1",
    icon: <Image src={frame} preview={false} />,
    title: "区块链技术，确保铭文安全与透明",
    content: "我们运用区块链技术，为您的铭文内容提供不可篡改、公开透明的存储和验证。每一个铭文都会被永久记录在区块链上，确保其真实性和唯一性。您不再需要担心铭文的来源、真伪或被篡改的问题，区块链为您提供了最强大的保障。",
  },
  {
    id: "2",
    icon: <Image src={frame} preview={false} />,
    title: "综合性服务，省时省力",
    content:
      "无论您是专业数字经济研究者、文化爱好者还是兴趣用户，我们提供便捷的铭文mint工具，清新简易的操作流程，一键mint，更加省时省力。",
  },
  {
    id: "3",
    icon: <Image src={frame} preview={false} />,
    title: "快捷钱包 安全支付",
    content:
      "您可以在我们的平台上进行在线交易，选择您喜欢的铭文作品并完成支付，安全便捷。",
  },
  {
    id: "4",
    icon: <Image src={frame} preview={false} />,
    title: "创新与传承，共筑文化未来",
    content:
      "铭文大陆将打造一个结合传统与现代、创新与传承的平台。我们相信，区块链技术与铭文的结合将为文化的传承和发展开启新的篇章。",
  },
];

export const chain = {
  p1: "盯链slogan：",
  p2: "国内首款数藏行情与Web3综合服务平台",
  p3: "盯链介绍",
  p4: "盯链app是一个数字藏品行情监控app，专业的收藏交易平台，数字收藏交易信息非常丰富，盯链向公众提供完整、详细的交易展览信息。同时也是国内首创的数字馆藏市场和数据分析应用，盯链提供准确、快速、全面的实时数据，实时定制行情提醒，用数据帮助数据采集者发现价值。",
};

export const channelBtn = [
  {
    id: "1",
    icon: <WeiboOutlined />,
    name: "新浪微博",
  },
  {
    id: "2",
    icon: <Image src={redBook} preview={false} />,
    name: "小红书",
  },
  {
    id: "3",
    icon: <WechatOutlined />,
    name: "微信",
  },
  {
    id: "4",
    icon: <WechatOutlined />,
    name: "微信公众号",
  },
];
const meshConfig1 = {
  geometry: createCylinder().geometry,
  mesh: createCylinder().mesh,
  config: {
    position: new THREE.Vector3(-4, 0.1, 0),
    rotation: new THREE.Euler(Math.PI / 1.4, Math.PI / 2.6, 0),
  },
};

const meshConfig2 = {
  geometry: createCylinder().geometry,
  mesh: createCylinder().mesh,
  config: {
    position: new THREE.Vector3(0, -1, -5),
    rotation: new THREE.Euler(2, Math.PI / 6, 0),
  },
};
const meshConfig3 = {
  geometry: createCylinder().geometry,
  mesh: createCylinder().mesh,
  config: {
    position: new THREE.Vector3(0, -1, -5),
    rotation: new THREE.Euler(2, Math.PI / 6, 0),
  },
};
export const meshes = [meshConfig1, meshConfig2, meshConfig3];
