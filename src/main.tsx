import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App'
import { CartProvider } from './context/cart_context'
import { FilterProvider } from './context/filter_context'
import { ProductsProvider } from './context/products_context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
    <FilterProvider>
    <CartProvider>
    <GoogleOAuthProvider clientId="846719632922-mihncalmr1bstnsnaonuakis6qt6k9rr.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
      </CartProvider>
    </FilterProvider>
  </ProductsProvider>
)
