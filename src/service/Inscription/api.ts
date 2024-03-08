import { http } from "@/utils";
import {
  MintInfoVo,
  PageRetTickListInfoVo,
  TickHolderRankListInfoVo,
  detailInfoRep,
  detailListIprops,
  detailListRequest,
  reqParamsRequest,
} from "./interface";

/**
 *
 * @param params 铭文列表
 */
export const getDataList = async (
  params: reqParamsRequest,
): Promise<PageRetTickListInfoVo> => {
  try {
    const { data } = await http.post("/insland/inscription/tick/list", params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param tickId 详情页
 */
export const getDatailData = async (tickId: string): Promise<detailInfoRep> => {
  try {
    const { data } = await http.post<detailInfoRep>(
      "/insland/inscription/tick/info",
      {
        tickId: tickId,
      },
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param params 详情页列表
 */
export const getDatailList = async (
  params: detailListRequest,
): Promise<detailListIprops> => {
  try {
    const { data } = await http.post(
      "/insland/inscription/tick/trans/list",
      params,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const holderRankList = async (tickId: string) => {
  try {
    const { data } = await http.post<TickHolderRankListInfoVo[]>(
      "/insland/inscription/tick/holderRankList",
      { tickId },
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param tickId 创建铭刻
 */
export const createMintInfo = async (tickId: string): Promise<MintInfoVo> => {
  try {
    const { data } = await http.post("/insland/inscription/mint/info", {
      tickId,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param tickId 支付接口
 */
export const payHandler = async (tickId: string)=> {
  try {
    const { data } = await http.post("/insland/inscription/mint", {
      tickId,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
