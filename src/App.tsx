import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage/SingleProductPage'
import CartPage from './pages/CartPage'
import Sidebar from './components/Sidebar/Sidebar'
import LogInPage from './pages/LogInPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<SingleProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/logIn" element={<LogInPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

type LayoutProps = {
  children: React.ReactNode // children prop typr
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {props.children}
      <Footer />
    </>
  )
}
