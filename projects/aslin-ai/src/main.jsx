import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/reset.css'
import './styles/tokens.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'

const routerBase = new URL(import.meta.env.BASE_URL, window.location.href)
  .pathname
  .replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={routerBase}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
