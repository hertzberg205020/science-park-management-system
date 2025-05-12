import logo from '@/assets/logo.png'
import backgroundPicture from '@/assets/bg.jpg'
import loginBackground from '@/assets/login-background.png'
import './index.scss'
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import http from '@/utils/http/http';


function Login() {

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundPicture})`,
  };


  const loginStyle: React.CSSProperties = {
    backgroundImage: `url(${loginBackground})`,
  };

  const [form] = Form.useForm();

  useEffect(() => {

    http({
      url: '/login',
      method: 'post',
      data: {
        username: 'admin',
        password: '123456'
      }
    })
      .then((response) => {
        console.log('Response:', response);
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      }
      );
  }, []);

  function handleSubmit() {
    form.validateFields()
      .then(values => {
        console.log('Received values:', values);
        // Handle login logic here
      })
      .catch(errorInfo => {
        console.error('Validation failed:', errorInfo);
      });
  }

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
          >
            <Form.Item
              label="Username"
              name="username"
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
              <Button type="primary" style={{ width: '100%' }} onClick={handleSubmit} >
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
