import request from '@/utils/request';
import qs from 'qs';

export async function getWorld(query:any): Promise<any>  {
  return request.get(`/idname/v1/world/?${qs.stringify(query)}`);
}

// 内部账户查询列表
export async function queryInnerAccountList (query:any, params:any) : Promise<any> {
  return request.post(`/pay/api/v1/SimulatorPay/account/query?${qs.stringify(query)}`, params)
}

// 内部账户查询列表
export async function queryInnerPayList (query:any, params:any) : Promise<any> {
  return request.post(`/pay/api/v1/SimulatorPay/pay/query?${qs.stringify(query)}`, params)
}

// 内部账户查询列表
export async function deleteYr () : Promise<any> {
  return request.delete(`http://webs.yr.dev.q1.com/doc/delData/085dd604-e56a-4d75-82ff-fc807f550260`)
}

// 内部账户查询列表
export async function getYr() : Promise<any> {
  return request.get(`http://webs.yr.dev.q1.com/`)
}
