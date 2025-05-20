import Mock from 'mockjs';
import { menuList, userMenuList, managerMenuList } from './menus';

// simulate network delay 200-600ms
Mock.setup({
  timeout: '200-600'
});

const BASE_URL: string = import.meta.env.VITE_API_URL;

const getQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const queryString = url.split('?')[1];
  if (!queryString) return params;
  queryString.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });
  return params;
};

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

Mock.Random.extend({
  taiwanPhone: function () {
    // 台灣市話區域碼 + 市話號碼或行動電話前綴
    const areaCodes = ['02', '03', '04', '05', '06', '07', '08', '037', '039', '049'];
    const mobilePrefixes = ['09'];
    const isLandline = Math.random() > 0.5;

    if (isLandline) {
      // 市話 2-8碼，可能加上分機
      const prefix = this.pick(areaCodes);
      const number = Mock.mock(/\d{7,8}/);
      const hasExt = Math.random() > 0.7;
      return hasExt ? `${prefix}-${number}#${Mock.mock(/\d{3}/)}` : `${prefix}-${number}`;
    } else {
      // 行動電話 09XX-XXX-XXX
      return `${this.pick(mobilePrefixes)}${Mock.mock(/\d{2}-\d{3}-\d{3}/)}`;
    }
  },

  taiwanCompanyName: function () {
    // 台灣公司名稱通常有後綴
    const prefixes = ['台灣', '中華', '高雄', '台北', '台中', '新竹', '彰化', '桃園'];
    const suffixes = ['股份有限公司', '有限公司', '企業社', '工作室', '商行'];
    const industries = ['科技', '電子', '資訊', '半導體', '金融', '生技', '傳媒', '製造', '物流', '顧問'];

    return this.pick(prefixes) + this.cword(2, 4) + this.pick(industries) + this.pick(suffixes);
  },

  // 台灣統一編號 (8位數字)
  unifiedBusinessNumber: function () {
    return Mock.mock(/\d{8}/);
  }
});

// 公司資料列表的介面
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Mock.mock(new RegExp(`${BASE_URL}/client-list.*`), "get", (options: any) => {
  const { pageSize, page, name, contact, phone } = getQueryParams(options.url);
  console.log("公司列表接收到 query string", page, pageSize, name, contact, phone);

  return {
    code: 200,
    message: "success",
    data: Mock.mock({
      [`list|${pageSize}`]: [
        {
          "id": "@unifiedBusinessNumber", // 使用統一編號作為ID
          "name": "@taiwanCompanyName", // 台灣公司名稱
          "status|1": ["核准設立", "停業", "解散", "撤銷", "廢止"], // 台灣公司狀態
          "phoneNumber": "@taiwanPhone", // 台灣電話號碼
          "industryCategory|1": ['製造業', '資訊服務業', '金融保險業', '批發零售業', '專業科學及技術服務業', '營建工程業', '運輸倉儲業'],
          "email": "@email",
          "unifiedBusinessNumber": "@unifiedBusinessNumber", // 台灣統一編號 (8位數字)
          "industryCode|1": ['F101', 'J201', 'I301', 'C501', 'G801', 'H701', 'D401'], // 模擬行業代碼
          "responsiblePerson": "@last", // 公司負責人姓名
        },
      ],
      total: 78
    })
  }
});
