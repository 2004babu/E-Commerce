import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './Context/authContextPrivider.tsx'
import ProductContext from './Context/ProductContext.tsx'


createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ProductContext>
    <App />
    </ProductContext>
  </AuthContextProvider>,
)
