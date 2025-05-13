import Mock from 'mockjs';


const BASE_URL: string = import.meta.env.VITE_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Mock.mock(`${BASE_URL}/login`, "post", (options: any): any => {

  const { account, password } = JSON.parse(options.body);

  let response;

  switch (`${account}:${password}`) {
    case 'admin:123456':
      response = {
        code: 200,
        message: '登入成功',
        data: {
          account: 'admin',
          token: 'mocktoken123456admin',
        }
      };
      break;
    case 'user:123456':
      response = {
        code: 200,
        message: '登入成功',
        data: {
          account: 'user',
          token: 'mocktoken123456user'
        }
      };
      break;
    case 'manager:123456':
      response = {
        code: 200,
        message: '登入成功',
        data: {
          account: 'manager',
          token: 'mocktoken123456manager'
        }
      };
      break;
    default:
      response = {
        code: 401,
        message: '帳號或密碼錯誤',
        data: null
      };
  }

  return response;

});
