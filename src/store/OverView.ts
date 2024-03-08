import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { message } from "antd";
import web3 from "web3";
import {
  BlockDetailVo,
  BlockListParams,
  SeventDaysTrans,
  TbBlockListVo,
  TbMethodRes,
  dealDatailInfoVo,
  dealListVo,
  dealRequest,
} from "@/service/Overview/interface";
import {
  getBlockData,
  getBlockList,
  getDayDealData,
  getDealData,
  getDealList,
  getWeBaseAbi,
} from "@/service/Overview/api";
interface Cache<T> {
  data: T | null;
  loading: boolean;
}
const _web3 = new web3();
class OverView {
  @observable
  state: {
    dayDataDeal: SeventDaysTrans[];
    dealList: dealListVo[];
    pagination: typePagination;
    blockList: TbBlockListVo[];
    paginationBlock: typePagination;
    dealDetail: dealDatailInfoVo;
    blockDetail: BlockDetailVo;
    abiDataInfo: TbMethodRes | null;
    apitype: any[];
    inputData: any[];
    outputType: any;
  } = {
    dayDataDeal: [],
    dealList: [],
    pagination: {
      page: 1,
      pageSize: 10,
    },

    blockList: [],
    paginationBlock: {
      page: 1,
      pageSize: 10,
    },
    // 详情
    dealDetail: {},
    blockDetail: {},

    // abi信息
    abiDataInfo: null,
    apitype: [],
    inputData: [],
    outputType: null,
  };

  @observable
  cache = new Map<string, any>();

  constructor() {
    makeAutoObservable(this);
  }

  @action
  private async fetchCacheData<T>(
    apiFunction: () => Promise<T>,
    cacheKey: string,
  ): Promise<Cache<T>> {
    let data: T | null = null;
    let loading: boolean = true;
    try {
      const cachedData = this.cache.get(cacheKey);
      if (cachedData) {
        data = cachedData;
      } else {
        const apiData = await apiFunction();
        this.cache.set(cacheKey, apiData);
        data = apiData;
      }
    } catch (error) {
      message.error("Error:" + error);
    } finally {
      loading = false;
    }
    return { data, loading };
  }
  /**
   * @description 交易列表
   * @param params
   */
  @action
  async getDealList(params: dealRequest) {
    try {
      this.state.pagination.page = params.page ? params.page : 1;
      this.state.pagination.pageSize = params.pageSize ? params.pageSize : 10;
      const { data } = await getDealList({
        ...params,
        page: this.state.pagination.page,
      });
      runInAction(() => {
        this.state.dealList = data?.list;
        this.state.pagination.total = data?.total;
      });
    } catch (error) {
      //   message.error('error'+ error)
    }
  }

  /**
   * @description 块列表
   * @param params
   */
  @action
  async getBlockList(params: BlockListParams) {
    try {
      this.state.paginationBlock.page = params.page ? params.page : 1;
      this.state.paginationBlock.pageSize = params.pageSize
        ? params.pageSize
        : 10;
      const { data } = await getBlockList(params);
      runInAction(() => {
        this.state.blockList = data?.list;
        this.state.paginationBlock.total = data?.total;
      });
    } catch (error) {
      //   message.error('error'+ error)
    }
  }

  /**
   * @description 交易详情
   * @param params
   */
  @action
  async getDealDetailData(params: string) {
    try {
      const data = await getDealData(params);
      const inputData = data?.input || "";

      // const outputData = data?.output || "";
      // const to = data?.to || "";

      const methodId = inputData.substring(0, 10);
      const inputDatas = "0x" + inputData.substring(10);

      const { data: abiData } = await this.fetchCacheData<TbMethodRes>(
        async () => await getWeBaseAbi({ groupId: "group0", methodId }),
        `cacheKey_${methodId}`,
      );

      if (abiData && abiData.abiInfo) {
        const abiInfo = JSON.parse(abiData.abiInfo).inputs;
        this.state.apitype = abiInfo.map(
          (val: { type: string; name: string }) =>
            [val.type, val.name].filter(Boolean).join(" "),
        );

        // 输出 outputs
        const outputType = abiData.abiInfo?.outputs?.map(
          (val: { type: string; name: string }) =>
            [val.type, val.name].filter(Boolean).join(" "),
        );

        this.state.outputType =
          outputType && outputType.length > 0 ? "返回" + outputType.join(" ") : "";
        // abi 解码
        const decodeData = _web3.eth.abi.decodeParameters(abiInfo, inputDatas);

        if (Object.entries(decodeData).length !== 0) {
          this.state.inputData = Object.entries(decodeData).map(
            ([key, value], index:any) => {
              const matchedVal = abiInfo.find(
                (val: { name: string; type: string }) => val.name === key,
              );
              if(matchedVal) {
                return {
                  id: index,
                  name: matchedVal?.name,
                  type: matchedVal?.type,
                  data: String(value),
                };
              } else {
                return null
              }
            },
          ).filter(Boolean);
        }
        runInAction(() => {
          this.state.dealDetail = data;
          this.state.abiDataInfo = abiData;
        });
      }
    } catch (error) {
      message.error("error" + error);
    }
  }
  /**
   * @description 块详情
   * @param params
   */
  @action
  async getBlockDetailData(params: string) {
    try {
      const data = await getBlockData(params);
      this.state.blockDetail = data;
    } catch (error) {
      message.error("error" + error);
    }
  }

  @action
  async getDayDealData(): Promise<SeventDaysTrans[]> {
    try {
      const data = await getDayDealData();
      console.log("day", data);
      this.state.dayDataDeal = data;
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new OverView();
