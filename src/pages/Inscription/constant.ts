
import type { ColumnsType } from "antd/es/table";
import * as echarts from "echarts"
export interface DataType {
  key: string;
  name: string;
  age: number;
  tel: string | number;
  phone: string;
  address: string;
}
export interface DataDetailColType {
  id:number,
  hash: string,
  owningblock:string,
  dealId: number,
  dealTime:string,
  sendUser:string,
  acceptUser:string,
}
export const DataDetail:DataDetailColType[] = [
  {
    id:1,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:2,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:2,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:3,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:4,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:5,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:6,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:7,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:8,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:2,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:9,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:10,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:11,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
  {
    id:12,
    hash:"1212312312",
    owningblock:"34343534",
    dealId:1,
    dealTime:"2023.12.22",
    sendUser:"小明",
    acceptUser:"小王",
  },
]
export const itemTabs = [
    {
        value: '1',
        label: '推荐',
        // children: 'Content of Tab Pane 1',
      },
      {
        value: '2',
        label: '正在进行',
        // children: 'Content of Tab Pane 2',
      },
      {
        value: '3',
        label: '完成铭刻',
        // children: 'Content of Tab Pane 3',
      },
      {
        value: '4',
        label: '所有',
        // children: 'Content of Tab Pane 3',
      },
]
export const createTabs = [
  {
      value: '1',
      label: '公平帽',
      // children: 'Content of Tab Pane 1',
    },
    {
      value: '2',
      label: '固定铭刻',
      // children: 'Content of Tab Pane 2',
    },
]
export const columns:ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    rowScope: 'row',
  },
  {
    title: '铭文',
    dataIndex: 'name'
  },
  {
    title: '供应',
    dataIndex: 'age',
  },
  {
    title: '进步',
    // colSpan: 2,
    dataIndex: 'tel'
  },
  {
    title: '支架',
    // colSpan: 0,
    dataIndex: 'phone'
  },
  {
    title: '交易',
    dataIndex: 'address',
  },
  {
    title: '创建于',
    dataIndex: 'address',
  },
]

export const data: DataType[] =[
  {
    key: '1',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 1,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '2',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 2,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '3',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 1,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '4',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 2,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  },
  {
    key: '5',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 1,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '6',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 2,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '7',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 1,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '8',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 2,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  },
  {
    key: '9',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 1,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '10',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 2,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '11',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 1,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }, {
    key: '12',
    name: '56sdfadASDAsdqwwrd345esfsa234csdac',
    age: 6541122,
    tel: 2,
    phone: '2023-12-16 09:27:12',
    address: 'ASFCCSdFSDF1...',
  }
]

export const options: echarts.EChartsOption = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
