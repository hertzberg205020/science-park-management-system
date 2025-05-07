import logo from '@/assets/logo.png'
import backgroundPicture from '@/assets/bg.jpg'
import loginBackground from '@/assets/login-background.png'
import './index.scss'

function Login() {

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundPicture})`,
  };


  const loginStyle: React.CSSProperties = {
    backgroundImage: `url(${loginBackground})`,
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
        </div>
      </div>

    </div>
  );
}

export default Login;
