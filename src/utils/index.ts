import React from 'react';
import { Tooltip } from 'antd';

/**
 * @description: 清洗data数据
 * @param {any} data 要清洗的数据
 * @param {'base'|'complex'} useMode 清洗模式
 * @return {any}
 */
export function cleanData<T = any>(
  data: any,
  useMode: 'base' | 'complex' = 'base',
): T {
  const newData: any = {};
  Object.entries(data).forEach(([keyname, value]: any) => {
    // 基本模式
    if (useMode === 'base') {
      if (value === 0 || value) newData[keyname] = value;
    }
    if (useMode === 'complex') {
      if (value && typeof value === 'object' && Object.keys(value).length)
        newData[keyname] = value;
      else if (value === 0 || value) newData[keyname] = value;
      else;
    }
  });
  return newData;
}

/**
 * @description: 获取数据类型
 * @param {any} data
 * @return {string}
 */
export function types(data: any): string {
  const type = Object.prototype.toString.call(data).toLowerCase();
  const typeMap = {
    '[object object]': 'object',
    '[object array]': 'array',
    '[object string]': 'string',
    '[object number]': 'number',
    '[object null]': 'null',
    '[object undefined]': 'undefined',
    '[object boolean]': 'boolean',
    '[object function]': 'function',
  } as any;
  return typeMap[type] || '[unknown]';
}

export default {
  types,
  cleanData,
};
