import type { PaginatedResponse } from '@/types/PaginatedResponse';
import type { TenementDataType } from '@/types/tenement';
import { get } from '@/utils/http/request';

interface GetDataOption {
  page: number;
  pageSize: number;
}


/**
 * 取得租戶分頁資訊
 * @param option 查詢參數
 * @returns 分頁後的租戶資料
 */
export async function getData(option: GetDataOption): Promise<PaginatedResponse<TenementDataType>> {
  const response = await get<PaginatedResponse<TenementDataType>>('/tenement', {
    page: option.page,
    pageSize: option.pageSize
  });


  if (response.code === 200) {
    return response.data;
  }
  throw new Error(response.message || 'Failed to fetch data');
}
