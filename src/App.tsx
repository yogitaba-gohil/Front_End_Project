import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import  Navbar  from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route  path="/" element={<HomePage />} />
          <Route  path='/products' element={<ProductsPage />} />
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
