import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App'
import { CartProvider } from './context/cart_context'
import { FilterProvider } from './context/filter_context'
import { ProductsProvider } from './context/products_context'
import './index.css'
import { UserProvider } from './context/user_context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_KEY}>
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </GoogleOAuthProvider>
)
