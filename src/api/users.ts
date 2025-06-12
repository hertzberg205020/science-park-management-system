import type { MenuItemInRow } from '@/types/MenuItemInRow';
import { get, post, } from '@/utils/http/request';


interface LoginData {
  account: string;
  password: string;
}

interface LoginResponse {
  token: string;
  account: string;
}



export async function login(data: LoginData): Promise<LoginResponse> {
  const res = await post<LoginResponse, LoginData>('/login', data)

  return res.data;
}


export async function getMenu(): Promise<MenuItemInRow[]> {
  const res = await get<MenuItemInRow[]>('/menu')
  return res.data;
}
