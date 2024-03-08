import { http } from "@/utils";
import {
  BlockDetailVo,
  BlockListParams,
  SeventDaysTrans,
  TbMethodRes,
  WebaseAbiRequest,
  blockListResponse,
  dealDatailInfoVo,
  dealListResponse,
  dealRequest,
} from "./interface";

/**
 *
 * @param params 最新交易列表
 */
export const getDealList = async (params: dealRequest) => {
  try {
    const data = await http.post<dealListResponse>(
      "/insland/browser/transList",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * 块列表
 * @param params
 * @returns
 */
export const getBlockList = async (params: BlockListParams) => {
  try {
    const data = await http.post<blockListResponse>(
      "/insland/browser/blockList",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * 交易详情
 * @param transferHash
 * @returns
 */
export const getDealData = async (transferHash: string) => {
  try {
    const { data } = await http.get<dealDatailInfoVo>(
      `/insland/inscription/trans/info/${transferHash}`,
      { transferHash },
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description 获取webBase Abi信息 
 * @param params 
 * @returns 
 */
export const getWeBaseAbi = async (params:WebaseAbiRequest) => {
  try {
    const { data } = await http.get<TbMethodRes>(`/insland/browser/findById/${params.groupId}/${params.methodId}`)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * @description 块详情
 * @param blockNumber
 * @returns
 */
export const getBlockData = async (blockNumber: string) => {
  try {
    const { data } = await http.get<BlockDetailVo>(
      `/insland/browser/blockByNumber/${blockNumber}`,
      { blockNumber },
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @description 获取日交易量
 * @returns
 */
export const getDayDealData = async () => {
  try {
    const { data } = await http.get<SeventDaysTrans[]>(`/insland/browser/transDaily`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
