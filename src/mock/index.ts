import Mock from 'mockjs';


const BASE_URL: string = import.meta.env.VITE_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Mock.mock(`${BASE_URL}/login`, "post", (options: any): any => {

  if (options.body == null) {
    return {};
  }
  return {
    code: 200,
    message: "success",
    data: {
      username: "admin",
      token: "mocktoken123456"
    }
  };
});
