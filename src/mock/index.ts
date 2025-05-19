import Mock from 'mockjs';
import { menuList, userMenuList, managerMenuList } from './menus';

// simulate network delay 200-600ms
Mock.setup({
  timeout: '200-600'
});

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


// menu web API
Mock.mock(`${BASE_URL}/menu`, "get", () => {
  const token = sessionStorage.getItem("token");
  if (token == "mocktoken123456admin") {
    return {
      code: 200,
      message: 'success',
      data: menuList
    }
  } else if (token == "mocktoken123456user") {
    return {
      code: 200,
      message: 'success',
      data: userMenuList
    }
  } else if (token == "mocktoken123456manager") {
    return {
      code: 200,
      message: 'success',
      data: managerMenuList
    }
  } else {
    return {
      code: 200,
      message: "fail",
      data: []
    }
  }
})

Mock.mock(`${BASE_URL}/energyData`, "get", () => {
  return {
    code: 200,
    message: "Request successful",
    data: [
      { name: "Coal", data: [120, 132, 101, 134, 90, 230, 210] },
      { name: "Gas", data: [220, 182, 191, 234, 290, 330, 310] },
      { name: "Oil", data: [150, 232, 201, 154, 190, 330, 410] },
      { name: "Electricity", data: [320, 332, 301, 334, 390, 330, 320] },
      { name: "Heat", data: [820, 932, 901, 934, 1290, 1330, 1320] }
    ]
  }
})
