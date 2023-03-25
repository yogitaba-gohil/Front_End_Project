import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import  Navbar  from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage/SingleProductPage'
import CartPage from './pages/CartPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route  path="/" element={<HomePage />} />
          <Route  path='/products' element={<ProductsPage />} />
          <Route  path='/products/:slug' element={<SingleProductPage />} />
          <Route  path='/cart' element={<CartPage />} />
            
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

type LayoutProps = {
  children: React.ReactNode; // children prop typr
};

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  )
}
