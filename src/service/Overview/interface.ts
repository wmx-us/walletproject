

/**
 * PageRet«TbTransHashVo»
 */
export interface dealListResponse {
    list: dealListVo[] 
    /**
     * 是否有下一页
     */
    next: number 
    /**
     * 总条数
     */
    total: number 
}

export interface blockListResponse {
    list: TbBlockListVo[] 
    /**
     * 是否有下一页
     */
    next: number 
    /**
     * 总条数
     */
    total: number 
}
/**
 * dealList
 *
 * TbTransHashVo
 */
export interface dealListVo {
    appId?:  string;
    blockNumber?: number 
    blockTimestamp?: number 
    createTime?: number 
    extraData?:  string;
    gasUsed?:  string;
    modifyTime?: number 
    statisticsFlag?: number 
    status?:  string;
    transFrom?:  string;
    transHash:  string;
    transTo?:  string;
}

/**
 * TransTotalListParams
 */
export interface dealRequest {
    /**
     * 是否正序排序 false：倒叙 ture: 正序 默认为倒叙
     */
    orders?: OrderParams[] ;
    /**
     * 页码
     */
    page?: number ;
    /**
     * 每页数量
     */
    pageSize?: number ;
    /**
     * 查询内容（可以为空）
     */
    searchCondition?:  string;
}

/**
 * OrderParams
 */
export interface OrderParams {
    /**
     * 排序 ：正序排序 ASC 倒叙排序：DESC
     */
    orderBy?:  string;
    /**
     * 属性
     */
    property?:  string;
}


/**
 * BlockListParams
 */
export interface BlockListParams {
    /**
     * 块高
     */
    blockNumber?: number ;
    /**
     * 是否正序排序 false：倒叙 ture: 正序 默认为倒叙
     */
    orders?: OrderParams[] ;
    /**
     * 页码
     */
    page?: number ;
    /**
     * 每页数量
     */
    pageSize?: number ;
    /**
     * 块哈希
     */
    pkHash?:  string;
    /**
     * 查询内容（可以为空）
     */
    searchCondition?:  string;
}


/**
 * Entity class of table tb_block.
 *
 * TbBlockVo
 */
export interface TbBlockListVo {
    /**
     * 块高
     */
    blockNumber: number ;
    /**
     * 出块时间
     */
    blockTimestamp?: number ;
    createTime?: number ;
    modifyTime?: number ;
    /**
     * 块哈希
     */
    pkHash:  string;
    /**
     * 共识节点地址
     */
    sealer?:  string;
    /**
     * 共识节点INDEX
     */
    sealerIndex?: number ;
    /**
     * 交易数
     */
    transCount?: number ;
}


export interface dealDatailInfoVo {
    /**
     * 块高
     */
    blockNumber?: number | null;
    /**
     * 发送者
     */
    form?:  string;
    /**
     * gas
     */
    gas?: number | null;
    /**
     * 哈希
     */
    hash?:  string;
    /**
     * 交易订单HASHID
     */
    id?:  string;
    /**
     * 输入
     */
    input?:  string;
    /**
     * 输出
     */
    output?:  string;
    /**
     * 接收者
     */
    to?:  string;
    /**
     * 交易哈希
     */
    transHash?:  string;
}


/**
 * TbBlockVo
 */
export interface BlockDetailVo {
    /**
     * 块高
     */
    blockNumber?: number 
    /**
     * 出块时间
     */
    blockTimestamp?: number 
    createTime?: number 
    modifyTime?: number 
    /**
     * 块哈希
     */
    pkHash?: string;
    /**
     * 共识节点地址
     */
    sealer?: string;
    /**
     * 共识节点INDEX
     */
    sealerIndex?: number 
    /**
     * 交易数
     */
    transCount?: number 
}

/**
 * Entity class of Trading within seven days.
 *
 * SeventDaysTrans
 */
export interface SeventDaysTrans {
    day?: string;
    groupId?: string;
    transCount?: number 
}

export interface WebaseAbiRequest {
    groupId: string;
    methodId: string;
}

/**
 * TbMethod
 */
export interface TbMethodRes {
    /**
     * ABI详情
     */
    abiInfo?: any;
    /**
     * 合约类型
     */
    contractType?: number
    createTime?:  string;
    /**
     * 分组
     */
    groupId?:  string;
    /**
     * 方法ID
     */
    methodId?:  string;
    /**
     * 方法类型
     */
    methodType?:  string;
    modifyTime?:  string;
}

export interface AbiList {
    name?:string;
    type?: string;
    data?: string;
}