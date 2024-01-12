// * 请求响应参数(不包含data)
export interface Result {
  code: string;
  msg: string;
}

// * 请求响应参数(包含data)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResultData<T = any> extends Result {
  data?: T | any;
}

// * 分页响应参数
export interface ResPage<T> {
  datalist: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// * 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}
