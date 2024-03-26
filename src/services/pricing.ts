import request from '@/utils/request';

export async function queryCard(): Promise<any> {
  return request('/api/pricing/card');
}
export async function searchPrice(): Promise<any> {
  return request('/api/pricing/searchPrice');
}
