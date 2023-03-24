import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProductsProvider } from './context/products_context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
      <App />
  </ProductsProvider>
)
