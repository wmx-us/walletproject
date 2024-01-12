/* eslint-disable @typescript-eslint/no-explicit-any */

import { RouteObject } from "@/router/interface";

/* eslint-disable @typescript-eslint/ban-types */
export * from "./webStorage";
export * from "./http"

export function determineDataType(value:unknown) {
    if (value instanceof Date) {
      return 'Date';
    } else if (typeof value === 'number') {
      return 'Number';
    } else if (typeof value === 'boolean') {
      return 'Boolean';
    } else if (typeof value === 'string') {
      return 'String';
    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return 'Array';
      } else {
        return 'Object';
      }
    } else {
      return 'Unknown';
    }
}
const toString = Object.prototype.toString;

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, "Function");
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
	return typeof val !== "undefined";
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
	return !isDef(val);
};
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
	return val !== null && is(val, "Object");
};

/**
 * @description:  是否为时间
 */
export function isDate(val: unknown): val is Date {
	return is(val, "Date");
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
	return is(val, "Number");
}

/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
	return is(val, "AsyncFunction");
}

/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
	return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
	return is(val, "String");
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
	return is(val, "Boolean");
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
	return val && Array.isArray(val);
}

/**
 * @description: 是否客户端
 */
export const isClient = () => {
	return typeof window !== "undefined";
};

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any): val is Window => {
	return typeof window !== "undefined" && is(val, "Window");
};

export const isElement = (val: unknown): val is Element => {
	return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === "undefined";

// 是否为图片节点
export function isImageDom(o: Element) {
	return o && ["IMAGE", "IMG"].includes(o.tagName);
}

export function isNull(val: unknown): val is null {
	return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) || isNull(val);
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
	let result: RouteObject = {};
	for (const item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res).length) result = res;
		}
	}
	return result;
};