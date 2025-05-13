import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import "./mock"
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';

createRoot(document.getElementById('root') as HTMLElement)
  .render(

    <Provider store={store}>
      <App />
    </Provider>
    ,
  )
