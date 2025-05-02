import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from '@/context/SocketContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ThemeProvider>
    <SocketContextProvider>
    <App />
    </SocketContextProvider>
  </ThemeProvider>
  </BrowserRouter>
)
