import {
  createMintInfo,
  getDataList,
  getDatailData,
  getDatailList,
  holderRankList,
  payHandler,
} from "@/service/Inscription/api";
import {
  MintInfoVo,
  TickHolder,
  TickListInfoVo,
  TickTransferListInfoVo,
  detailInfoRep,
  reqParamsRequest,
} from "@/service/Inscription/interface";
import { message } from "antd";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

class Inscription {
  @observable
  state: {
    dataList: TickListInfoVo[];
    pagination: typePagination;
    paginationDetail: typePagination;
    datailData: detailInfoRep;
    datailDataList: TickTransferListInfoVo[];
    createMintData: MintInfoVo;
    orderId: string;
    percentage: any;
    percentageList: TickHolder[];
  } = {
    dataList: [],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    paginationDetail: {
      page: 1,
      pageSize: 10,
    },
    // 详情数据
    datailData: {},
    datailDataList: [],
    createMintData: {},
    orderId: "",
    percentage: [],
    percentageList: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * @description 铭文列表查询
   * @param {reqParamsRequest} params
   */
  @action
  async getDataList(params: reqParamsRequest) {
    try {
      this.state.pagination.page = params.page ? params.page : 1;
      const data = await getDataList({
        ...params,
        page: this.state.pagination.page,
      });
      runInAction(() => {
        this.state.dataList = data.list;
        this.state.pagination.total = data.total;
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  /**
   *  铭文详情查询
   * @param {reqParamsRequest} params
   */
  @action
  async getDatailData(params: reqParamsRequest, isRefrsh?: boolean) {
    try {
      if (!isRefrsh) {
        const [datailData, datailDataList, holdersList] = await Promise.all([
          getDatailData(params.tickId!),
          getDatailList({
            ...this.state.paginationDetail,
            tickId: params?.tickId,
          }),
          holderRankList(params.tickId!),
        ]);
        const percentage = holdersList.map((item) => ({
          value: item?.rate,
          name: item?.num,
        }));
        const percentageList = holdersList.map((item, index) => ({
          ...item,
          id: index,
        }));
        runInAction(() => {
          this.state.datailData = datailData;
          this.state.datailDataList = datailDataList.list;
          this.state.paginationDetail.total = datailDataList.total;
          this.state.percentage = percentage;
          this.state.percentageList = percentageList;
        });
      } else {
        this.state.paginationDetail.page = params.page ? params.page : 1;
        const data = await getDatailList({
          tickId: params?.tickId,
          page: this.state.paginationDetail.page,
        });
        runInAction(() => {
          this.state.datailDataList = data?.list;
          this.state.paginationDetail.total = data?.total;
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  /**
   *
   * @param params 创建铭刻
   * @returns
   */
  @action
  async createMintInfo(params: string) {
    try {
      const data = await createMintInfo(params);
      this.state.createMintData = data;
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  /**
   *
   * @param id 支付订单
   */
  @action
  async payHandler(id: string) {
    try {
      const data = await payHandler(id);
      if (data) {
        message.success("支付成功！");
        this.state.orderId = data;
        return data;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
export default new Inscription();
