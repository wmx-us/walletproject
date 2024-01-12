/**
 *  reqParamsRequest
 */
export interface reqParamsRequest {
  /**
   * 是否正序排序 false：倒叙 ture: 正序 默认为倒叙
   */
  orders?: OrderParams[];
  /**
   * 页码
   */
  page?: number;
  /**
   * 每页数量
   */
  pageSize?: number;
  /**
   * 查询内容（可以为空）
   */
  searchCondition?: string;
}

/**
 * OrderParams
 */
export interface OrderParams {
  /**
   * 排序 ：正序排序 ASC 倒叙排序：DESC
   */
  orderBy?: null | string;
  /**
   * 属性
   */
  property?: null | string;
  [property: string]: any;
}

export interface resResult {}

/**
 * R«PageRet«TickListInfoVo»»
 */
export interface resResultResponse {
  code?: number | null;
  data?: PageRetTickListInfoVo;
  msg?: null | string;
  [property: string]: any;
}

/**
 * PageRet«TickListInfoVo»
 */
export interface PageRetTickListInfoVo {
  list: TickListInfoVo[];
  /**
   * 总条数
   */
  total: number;

  /**
   * 是否下一页
   */
  next: 0;
}

/**
 * cn.com.coin.server.model.response.TickListInfoVo
 *
 * TickListInfoVo
 */
export interface TickListInfoVo {
  /**
   * 创建时间
   */
  createTime?: number | null;
  /**
   * 持有人数
   */
  holders?: number | null;
  /**
   * id
   */
  id?: null | string;
  /**
   * INS_address
   */
  insAddress?: null | string;
  /**
   * 已铭刻数
   */
  mintCount?: number | null;
  /**
   * 进度
   */
  progress?: number | null;
  /**
   * 供应
   */
  supply?: number | null;
  /**
   * tick
   */
  tick?: null | string;
  /**
   * 交易数量
   */
  transactions?: number | null;
  [property: string]: any;
}

/**
 * TickTransferListParams
 */
export interface detailListRequest {
  /**
   * 是否正序排序 false：倒叙 ture: 正序 默认为倒叙
   */
  orders?: OrderParams[] | null;
  /**
   * 页码
   */
  page?: number | null;
  /**
   * 每页数量
   */
  pageSize?: number | null;
  /**
   * hashID
   */
  tickId?: null | string;
}

/**
 * OrderParams
 */
export interface OrderParams {
  /**
   * 排序 ：正序排序 ASC 倒叙排序：DESC
   */
  orderBy?: null | string;
  /**
   * 属性
   */
  property?: null | string;
}

/**
 * TickInfoVo
 */
export interface detailInfoRep {
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * id
   */
  id?: string;
  /**
   * INS_address
   */
  insAddress?: string;
  /**
   * 已铭刻数
   */
  mintCount?: null;
  /**
   * 进度
   */
  progress?: number;
  /**
   * 供应
   */
  supply?: number;
  /**
   * tick
   */
  tick?: string;
  /**
   * 交易数量
   */
  transactions?: number;
}

/**
 * MintInfoVo
 */
export interface MintInfoVo {
  /**
   * 版费
   */
  fee?: number;
  /**
   * gas 费用
   */
  gas?: number;
  /**
   * hashId
   */
  id?: string;
  /**
   * 铭文地址
   */
  insAddress?: string;
  /**
   * TICK
   */
  tick?: string;
}

export interface detailListIprops {
  list: TickTransferListInfoVo[];
  /**
   * 是否有下一页
   */
  next: number;
  /**
   * 总条数
   */
  total: number;
}

/**
 * cn.com.coin.server.model.response.TickTransferListInfoVo
 *
 * TickTransferListInfoVo
 */
export interface TickTransferListInfoVo {
  /**
   * 块高
   */
  blockNumber?: number;
  /**
   * 发送者
   */
  from?: string;
  id?: string;
  /**
   * 接收者
   */
  to?: string;
  /**
   * 交易哈希
   */
  transferHash?: string;
  /**
   * 交易时间
   */
  transferTime?: number;
}
