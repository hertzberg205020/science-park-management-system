import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
