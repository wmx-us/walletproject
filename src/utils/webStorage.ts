import { determineDataType } from "./index";

type TypeConfig = {
    prefix: string;
  };
  
  type TypeGetStorage = {
    has(key: string, original?: boolean): boolean;
    getLength(): number;
    getItem(key: string, original?: boolean): unknown;
    getIndex(index: number): Nullable<unknown>;
    getKey(index: number): Nullable<unknown>;
    getAll(): Record<string, unknown>;
    getAllKeys(): Array<string>;
    set(key: string, value: unknown): void;
    remove(key: string): void;
    clear(original?: boolean): void;
    isEmpty(): boolean;
  };
  
  class WebStorage {
    private PREFIX: string;
    constructor(config: TypeConfig = { prefix: "__EE__" }) {
      this.PREFIX = config.prefix;
    }
  
    /**
     * @description 根据类型生成前缀
     * @private
     * @param {string} dataType
     * @return {*}
     * @memberof WebStorage
     */
    private getPrefix(dataType: string): string {
      return `__${dataType.substring(0, 4).toLowerCase()}|`.trim();
    }
  
    /**
     * @description 重编码存的值，区别类型
     * @private
     * @param {unknown} value
     * @return {Nullable<string>} 重编码的值，为string或null
     * @memberof WebStorage
     */
    private encode(value: unknown): Nullable<string> {
      const valueType = determineDataType(value);
      const prefixValue = this.getPrefix(valueType);
  
      switch (valueType) {
        case "Date":
          return `${prefixValue}${(value as Date).toUTCString()}`;
        case "Number":
          return `${prefixValue}${value}`;
        case "Boolean":
          return `${prefixValue}${+(value as boolean)}`;
        case "String":
          return `${prefixValue}${value}`;
        case "Object":
          return `${prefixValue}${JSON.stringify(
            value as Record<string, unknown>
          )}`;
        case "Array":
          return `${prefixValue}${JSON.stringify(value as Array<unknown>)}`;
        default:
          console.error(
            `当前数据的类型为 ${valueType}，暂不支持存入LocalStorage/SessionStorage`
          );
          return null;
      }
    }
    /**
     * @description 解码存的值，根据类型还原
     * @private
     * @param {string}value
     * @returns {unknown} 解码获取到的值
     */
    private decode(value: string): unknown {
      // 当长度小于类型的时候，说明不是通过encode插入的值，此时直接返回取值
      if (value.length <= 7) return value;
      const prefixValue = value.substring(0, 7);
      const originValue = value.substring(7);
  
      // 根据前缀返回对应类型的数据
      switch (prefixValue) {
        case this.getPrefix("Date"):
          return new Date(originValue);
        // case this.getPrefix("Number"):
        //   return numeric.bigNumber(originValue).toNumber();
        case this.getPrefix("Boolean"):
          return Boolean(originValue);
        case this.getPrefix("String"):
          return originValue;
        case this.getPrefix("Object"):
        case this.getPrefix("Array"):
          return JSON.parse(originValue);
        default:
          return value;
      }
    }
  
    getEmptyStorage() {
      const getVal = () => null;
      return {
        /* eslint-disable @typescript-eslint/no-empty-function */
        has: () => false,
        getLength: () => 0,
        getItem: getVal,
        getIndex: getVal,
        getKey: getVal,
        getAll: () => {},
        getAllKeys: () => [],
        set: () => {},
        remove: () => {},
        clear: () => {},
        isEmpty: () => true,
        /* eslint-enable @typescript-eslint/no-empty-function */
      };
    }
    /**
     *
     *
     * @param {("local" | "session")} type
     * @return {TypeGetStorage} getStorage返回类型
     * @memberof WebStorage
     */
    getStorage(type: "local" | "session"): TypeGetStorage {
      const webStorage = window[`${type}Storage`],
        get = (key: string) => {
          const item = webStorage.getItem(key);
          return item ? this.decode(item) : null;
        };
  
      return {
        // 是否存在key的值，original为是否通过重编码
        has: (key: string, original = false) => {
          return (
            webStorage.getItem(original ? key : `${this.PREFIX}${key}`) !== null
          );
        },
        // 获取storage的长度
        getLength: () => {
          return webStorage.length;
        },
        // 获取key的值，original为是否通过重编码
        getItem: (key: string, original = false) => {
          return get(original ? key : `${this.PREFIX}${key}`);
        },
        // 通过索引获取值
        getIndex: (index: number) => {
          return index < webStorage.length
            ? get(webStorage.key(index) as string)
            : null;
        },
        // 通过索引获取key
        getKey: (index: number) => {
          return index < webStorage.length ? webStorage.key(index) : null;
        },
        // 获取所有的storage
        getAll: () => {
          let key: Nullable<string>;
          const result: Record<string, unknown> = {},
            len = webStorage.length;
  
          for (let i = 0; i < len; i++) {
            key = webStorage.key(i);
            if (key) {
              result[key] = get(key);
            }
          }
          return result;
        },
        // 获取所有storage的key
        getAllKeys: () => {
          const result: Array<string> = [],
            len = webStorage.length;
          for (let i = 0; i < len; i++) {
            const key = webStorage.key(i);
            if (key) {
              result.push(key);
            }
          }
          return result;
        },
        set: (key: string, value: unknown) => {
          const encodeValue = this.encode(value);
          if (encodeValue) {
            webStorage.setItem(`${this.PREFIX}${key}`, encodeValue);
          }
        },
        remove: (key: string) => {
          webStorage.removeItem(`${this.PREFIX}${key}`);
        },
        clear: (original = false) => {
          if (original) {
            webStorage.clear();
          } else {
            const len = webStorage.length;
            for (let i = 0; i < len; i++) {
              const key = webStorage.key(i);
              if (key?.includes(this.PREFIX)) {
                webStorage.removeItem(key);
              }
            }
          }
        },
        isEmpty: () => webStorage.length === 0,
      };
    }
  }
  
  const webStorage = new WebStorage({ prefix: "__HDC_CUSTOMER__" });
  
  const LocalStorage = window.localStorage
    ? webStorage.getStorage("local")
    : webStorage.getEmptyStorage();
  
  const SessionStorage = window.sessionStorage
    ? webStorage.getStorage("session")
    : webStorage.getEmptyStorage();
  
  export { LocalStorage, SessionStorage };
  export default WebStorage;