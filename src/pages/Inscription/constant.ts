
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
