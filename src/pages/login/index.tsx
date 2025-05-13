import logo from '@/assets/logo.png'
import backgroundPicture from '@/assets/bg.jpg'
import loginBackground from '@/assets/login-background.png'
import './index.scss'
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '@/api/users';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/login/authSlice';


function Login() {
  // hook
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundPicture})`,
  };


  const loginStyle: React.CSSProperties = {
    backgroundImage: `url(${loginBackground})`,
  };


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();


      const { token } = await login(values);
      // 將 token 存入 Redux store
      dispatch(setToken(token));
      // 處理登入成功
      console.log('Login successful:', token);

    } catch (error) {
      console.error('Login failed:', error);
      // 處理登入失敗
    }
  };

  return (
    <div className='login' style={backgroundStyle}>
      <div className='container'>
        <div className='login-background' style={loginStyle}>
        </div>
        <div className='part'>
          <div className="title">
            <div className="logo">
              <img src={logo} alt="Logo" width={100} />
            </div>
            <h1>管理平台</h1>
          </div>
          <Form
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Account"
              name="account"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder='輸入帳號' prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder='輸入密碼' prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" style={{ width: '100%' }} htmlType="submit" >
                登入
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

    </div>
  );
}

export default Login;
