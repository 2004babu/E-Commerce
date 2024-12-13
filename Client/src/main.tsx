import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './Context/authContextPrivider.tsx'
import ProductContext from './Context/ProductContext.tsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ProductContext>
    <BrowserRouter>
    
    <App />
    </BrowserRouter>
    </ProductContext>
  </AuthContextProvider>,
)
