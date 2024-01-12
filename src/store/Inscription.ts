import {
  createMintInfo,
  getDataList,
  getDatailData,
  getDatailList,
  payHandler,
} from "@/service/Inscription/api";
import {
  MintInfoVo,
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
    datailData: detailInfoRep;
    datailDataList: TickTransferListInfoVo[];
    createMintData: MintInfoVo;
    orderId: string;
  } = {
    dataList: [],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    // 详情数据
    datailData: {},
    datailDataList: [],
    createMintData: {},
    orderId: "",
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
   * @param {id} params
   */
  @action
  async getDatailData(params: string) {
    try {
      const [datailData, datailDataList] = await Promise.all([
        getDatailData(params),
        getDatailList({ ...this.state.pagination, tickId: params }),
      ]);
      console.log("data", datailData, datailDataList);
      runInAction(() => {
        this.state.datailData = datailData;
        this.state.datailDataList = datailDataList.list;
      });
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
        this.state.orderId = data.orderId;
        return data;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
export default new Inscription();
