import type { CompanyDataType } from '@/pages/users/interface';
import { get, post, type ApiResponse } from '@/utils/http/request';

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

export function deleteClient(id: string): Promise<ApiResponse<string>> {
  return post('/client/delete', { id })
}
