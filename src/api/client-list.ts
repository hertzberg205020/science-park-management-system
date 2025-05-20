import type { CompanyDataType } from '@/pages/users/interface';
import { get, type ApiResponse } from '@/utils/http/request';

export function getClientList(data: {
  name: string,
  phone: string,
  contact: string,
  page: number,
  pageSize: number
}):
  Promise<ApiResponse<{
    list: CompanyDataType[],
    total: number
  }>> {
  return get('/client-list', data)
}
