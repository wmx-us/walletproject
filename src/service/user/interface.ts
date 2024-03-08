/* eslint-disable @typescript-eslint/no-namespace */

namespace ApiUserParams {
  export interface UserAuthParams {
    /**
     * 身份证号
     */
    idCardNumber?: string;
    /**
     * 姓名
     */
    name?: string;
  }

  export interface UpdateUserInfoParams {
    /**
     * 性别
     */
    gender?: number;
    /**
     * 昵称
     */
    nickname?: string;
  }

  /**
   * QRCodeParams
   */
  export interface QrCodeRequestParams {
    /**
     * 自选数额充值数额
     */
    amount: number;
    /**
     * GAS充值产品ID（自选数额充值时为空）
     */
    productId: string;
  }

  //获取消费记录
  export interface RecordParams {
    /**
     * 排序 ：正序排序 ASC 倒叙排序：DESC
     */
    "orders[0].orderBy"?: string;
    /**
     * 属性
     */
    "orders[0].property"?: string;
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
   * CashParams
   */
  export interface CustomRequest {
    /**
     * 是否正序排序 false：倒叙 ture: 正序 默认为倒叙
     */
    orders: OrderParams[];
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
    /**
     * 状态 0 进行中 1 已完成
     */
    stat?: number;
  }

  /**
   * OrderParams
   */
  export interface OrderParams {
    /**
     * 排序 ：正序排序 ASC 倒叙排序：DESC
     */
    orderBy?: string;
    /**
     * 属性
     */
    property?: string;
  }

  /**
   * BindMobileParams
   */
  export interface BindPhoneRequest {
    /**
     * 验证码
     */
    code?: string;
    /**
     * 电话号
     */
    mobile?: string;
  }
  export interface ParamsRequestPsw {
    /**
     * 旧密码
     */
    oldPsw?: string;
    /**
     * 修改后密码
     */
    psw?: string;
    /**
     * 修改后密码确认
     */
    psw2?: string;
  }

  /**
   * SetSecurityPasswordParams
   */
  export interface SceurityRequest {
    /**
     * 支付密码：MD5加密32位小写"
     */
    password?: string;
  }

  /**
   * UpdateSecurityPasswordParams
   */
  export interface UpdateSafetyRequest {
    /**
     * 新密码：MD5加密32位小写
     */
    newPassword?: string;
    /**
     * 旧密码：MD5加密32位小写
     */
    oldPassword?: string;
  }
  export interface ForgetPswRequest {
    /**
     * 验证码
     */
    code?: string;
    /**
     * 身份证号后六位
     */
    idCardNumber?: string;
    /**
     * 支付密码：MD5加密32位小写
     */
    password?: string;
  }
  /**
   * PageParams
   */
  export interface MineTickParams {
    /**
     * 是否正序排序 false：倒叙 ture: 正序 默认为倒叙
     */
    orders?: OrderParams[] 
    /**
     * 页码
     */
    page?: number 
    /**
     * 每页数量
     */
    pageSize?: number 
    /**
     * 查询内容（可以为空）
     */
    searchCondition?:  string;
    [property: string]: any;
  }
}

namespace ApiUserResult {
  export type UserAuthRet = {
    /**
     * 姓名
     */
    realName: string;
    /**
     * 手机号
     */
    phone: string;
    /**
     * 身份证号
     */
    idcardNumber: string;
    /**
     * 认证状态
     */
    isAuth: 0 | 1 | 2;
    /**
     * 是否设置了支付密码：1=是，0=否
     */
    isSecurityPassword: 1 | 0;
  };

  export type GasRechargeVo = {
    id?: number;

    ishot?: boolean;
    /**
     * GAS点数
     */
    gas: number;
    /**
     * 支付方式
     */
    payMethod: string[];
    /**
     * 价格
     */
    price: number;
    /**
     * 充值产品ID
     */
    productId: string;
  };

  /**
   * 消费记录
   */
  export type TransOrderInfo = {
    /**
     * createTime
     */
    createTime?: number;
    /**
     * GAS消费
     */
    gas?: number;
    /**
     * 订单号
     */
    orderSn?: string;
    /**
     * 消费类型
     */
    type?: string;
  };

  /**
   * PageRet«GasOrderInfo»
   */
  export type PageRetGasOrderInfo = {
    list: GasOrderInfo[];
    /**
     * 是否有下一页
     */
    next?: number;
    /**
     * 总条数
     */
    total?: number;
  };

  /**
   * cn.com.coin.base.model.dto.GasOrderInfo
   *
   * GasOrderInfo
   */
  export type GasOrderInfo = {
    /**
     * createTime
     */
    createTime?: number;
    /**
     * GAS消费
     */
    gas?: number;
    /**
     * 订单号
     */
    orderSn?: string;
  };

  /**
   * PageRet«CashLogVo»
   */
  export interface PageRetCashLogVo {
    list: CashLogVo[];
    /**
     * 是否有下一页
     */
    next?: number;
    /**
     * 总条数
     */
    total?: number;
  }

  /**
   * cn.com.coin.server.model.response.CashLogVo
   *
   * CashLogVo
   */
  export interface CashLogVo {
    /**
     * 创建时间
     */
    createTime?: number;
    /**
     * GAS消耗
     */
    gas?: number;
    /**
     * 交易哈希
     */
    hashId?: string;
    /**
     * 状态 0 排队中 1 等待上链 2 完成 3 失败
     */
    status?: number;
    /**
     * UUID
     */
    uuid?: string;
  }

  /**
   * UserInfoResponse 用户信息
   */
  export interface UserInfoResponse {
    /**
     * 钱包地址
     */
    address?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * gas余额
     */
    balance?: number;
    /**
     * hashId
     */
    id?: string;
    /**
     * 是否实名认证：1=是，0=否
     */
    isAuth?: number;
    /**
     * 是否设置了支付密码：1=是，0=否
     */
    isSecurityPassword?: number;
    /**
     * 电话
     */
    mobile?: string;
    /**
     * 参与的铭文
     */
    myParticipationTick?: number;
    /**
     * 昵称
     */
    nickName?: string;
    /**
     * 拥有的铭文数
     */
    owned?: number;
    /**
     * 总消耗的gas
     */
    usedGas?: number;
  }

  /**
   * PageRet«MineTickHoldsVo»
   */
  export interface PageRetMineTickHoldsVo {
    list?: MineTickHoldsVo[] 
    /**
     * 是否有下一页
     */
    next?: number 
    /**
     * 总条数
     */
    total?: number 
  }

  /**
   * cn.com.coin.server.model.response.MineTickHoldsVo
   *
   * MineTickHoldsVo
   */
  export interface MineTickHoldsVo {
    /**
     * 链上地址
     */
    chainAddress?:  string;
    /**
     * 持有数
     */
    num?: number 
    /**
     * 铭文
     */
    tick?:  string;
  }
}
