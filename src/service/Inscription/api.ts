import { http } from "@/utils";
import {
  MintInfoVo,
  PageRetTickListInfoVo,
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
 * @param id 详情页
 */
export const getDatailData = async (id: string): Promise<detailInfoRep> => {
  try {
    const { data } = await http.post("/insland/inscription/tick/info", {
      tickId: id,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param params 详情页列表
 */
export const getDatailList = async (params: detailListRequest): Promise<detailListIprops> => {
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
export const payHandler = async (
  tickId: string,
): Promise<{ orderId: string }> => {
  try {
    const { data } = await http.post<MintInfoVo>("/insland/inscription/mint", {
      tickId,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
