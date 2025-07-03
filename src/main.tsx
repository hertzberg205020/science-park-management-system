import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import './mock';
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';

createRoot(document.getElementById('root') as HTMLElement)
  .render(

    <Provider store={store}>
      <ConfigProvider locale={enUS}>
        <App />
      </ConfigProvider>
    </Provider>
    ,
  );
