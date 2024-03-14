/* eslint-disable no-continue */
import { useEffect, useState } from 'react';

class KVStruct {
  key: string;

  value: string;

  constructor() {
    this.key = '';
    this.value = '';
  }
}

interface QueryData {
  [key: string]: string;
}

type CombineType = 'mixin' | 'replace';

/**
 * @description: 解析url信息
 * @param {string} url 合法的url地址
 * @return {*} 返回url信息
 */
export function parseUrl(url: string = window.location.href) {
  let state = '';
  let pos = -1;
  let cache: KVStruct = new KVStruct();
  let cleanUrl = '';
  const query: KVStruct[] = [];

  while (pos < url.length) {
    const char = url.charAt(pos);
    pos += 1;
    // 匹配到query segment
    if ((!state && char.match(/\?/)) || char.match(/&/)) {
      state = 'key';
      cache = new KVStruct();
      query.push(cache);
      continue;
    }
    // 匹配到query key
    if (state === 'key' && !char.match(/[/#&=]/)) {
      cache.key += char;
      continue;
    }
    // 匹配到query value
    if (state === 'key' && char.match(/=/)) {
      state = 'value';
      continue;
    }
    if (state === 'value' && !char.match(/[/#&=]/)) {
      cache.value += char;
      continue;
    }
    // query segment结束
    if (state && char.match(/[/#]/)) {
      state = '';
      pos -= 1;
      continue;
    }
    cleanUrl += char;
  }
  return {
    segments: query,
    cleanUrl,
    query: Object.fromEntries(
      query.map(item => [item.key, decodeURIComponent(item.value)]),
    ),
  };
}

/**
 * @description: 获取query信息
 * @param {string} url 合法的url地址
 * @return {*} 返回query信息
 */
export function getQuery(url: string = window.location.href) {
  return parseUrl(url).query;
}

/**
 * @description: url与query合并
 * @param {string} url 合法的url地址
 * @param {QueryData} data query数据
 * @param {CombineType} type 合并方式
 * @return {string} 返回合并后的url
 */
export function combineUrlAndQuery(
  url: string,
  data: QueryData = {},
  type: CombineType = 'replace',
) {
  const urlInfo = parseUrl(url);
  const { query } = urlInfo;
  let newQuery = {};
  if (type === 'mixin') {
    newQuery = { ...query, ...data };
  }
  if (type === 'replace') {
    newQuery = data;
  }
  let queryStr = '';
  Object.entries(newQuery).forEach(([key, value]: any) => {
    let valiValue = value || (value === 0 ? value : '');
    if (typeof valiValue !== 'string') valiValue = JSON.stringify(valiValue);
    queryStr += `${key}=${decodeURIComponent(valiValue)}&`;
  });
  queryStr = queryStr.slice(0, -1);
  if (!queryStr) return urlInfo.cleanUrl;
  return `${urlInfo.cleanUrl}?${queryStr}`;
}

/**
 * @description: 设置query数据
 * @param {string} url 合法的url地址
 * @param {QueryData} data query数据
 */
export function setQuery(data: QueryData, type: CombineType = 'replace') {
  const url = window.location.href;
  const newUrl = combineUrlAndQuery(url, data, type);
  window.location.href = newUrl;
}

/**
 * @description: query操作的React Hook
 * @param {string} url 合法的url地址
 * @return {*}
 */
export function useQuery() {
  const [queryInfo, setQueryInfo] = useState(getQuery());

  useEffect(() => {
    setQueryInfo(getQuery());
  }, []);

  /**
   * @description: 更新query数据
   * @param {QueryData} data query数据
   * @param {CombineType} type 合并方式
   */
  function dispatchQueryInfo(data: QueryData, type: CombineType = 'replace') {
    setQuery(data, type);
    setQueryInfo(getQuery());
  }

  /**
   * @description: 通过key获取对应的query
   * @param {string} key query key
   * @return {string} 返回对应的query数据
   */
  function get(key: string) {
    return queryInfo[key];
  }

  /**
   * @description: 通过key获取对应的对象类型query
   * @param {string} key query key
   * @return {object} 返回对应的query数据
   */
  function getObj(key: string) {
    let res = null;
    try {
      res = JSON.parse(queryInfo[key]);
    } catch (e) {
      res = queryInfo[key];
    }
    return res;
  }

  return {
    query: queryInfo,
    setQuery: dispatchQueryInfo,
    get,
    getObj,
  };
}
