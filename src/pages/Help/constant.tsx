import type { CollapseProps } from "antd";
import type { CSSProperties } from "react";
export const getItems: (
  panelStyle?: CSSProperties,
) => CollapseProps["items"] = () => [
  {
    key: "1",
    label: "项目方如何入驻",
    children: (
      <p>
        铭文是一段元数据，通过采用Ordinals
        (序数)铭刻在聪(Satoshis，即sats)上。铭文意味着在某物(如石头、硬币、平板等)上刻有文字。每个聪都通过序数理论进行排序，有对应序数，是唯一编号。铭文就是指使用Ordinals
        协议将内容写入 satoshi 进行铭刻，写入的信息可以是文字图片，视频和音频等
      </p>
    ),
    style: {},
  },
  {
    key: "2",
    label: "用户如何打开铭文",
    children: (
      <p>
        铭文是一段元数据，通过采用Ordinals
        (序数)铭刻在聪(Satoshis，即sats)上。铭文意味着在某物(如石头、硬币、平板等)上刻有文字。每个聪都通过序数理论进行排序，有对应序数，是唯一编号。铭文就是指使用Ordinals
        协议将内容写入 satoshi 进行铭刻，写入的信息可以是文字图片，视频和音频等
      </p>
    ),
    style: {},
  },
];

export const _getItems: (
  panelStyle?: CSSProperties,
) => CollapseProps["items"] = () => [
  {
    key: "3",
    label: "什么是铭文？",
    children: (
      <p>
        铭文是一段元数据，通过采用Ordinals
        (序数)铭刻在聪(Satoshis，即sats)上。铭文意味着在某物(如石头、硬币、平板等)上刻有文字。每个聪都通过序数理论进行排序，有对应序数，是唯一编号。铭文就是指使用Ordinals
        协议将内容写入 satoshi 进行铭刻，写入的信息可以是文字图片，视频和音频等
      </p>
    ),
    style: {},
  },
  {
    key: "4",
    label: "铭文的特征是什么？",
    children: (
      <>
        <p>1. 先到先得：支付手续费越高越先处理</p>
        <p>2. 独一无二：每个人都将拥有独属于自己的铭刻铭文</p>
        <p>3. 相对公平：人人可mint，比拼眼光和手速</p>
        <p>4. 数量有限：铭文铸造的时候可以限定数量，限定后就无法再次更改</p>
      </>
    ),
    style: {},
  },
  {
    key: "5",
    label: "铭文上的是什么链？",
    children: (
      <p>
        平台发行的铭文是关于铭文大陆自建的底层区块链基础设施"xx链"，xx链已备案为可信区块链检测运行服务平台，链上数据真实可靠，用户权益安全有保障
      </p>
    ),
    style: {},
  },
];
