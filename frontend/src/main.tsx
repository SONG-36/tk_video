import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { AppRouter } from './router'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
