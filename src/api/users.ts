import { post, } from '@/utils/http/request';


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

  if (res.code !== 200) {
    throw new Error(res.message);
  }
  return res.data;
}
