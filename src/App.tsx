import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  Navbar  from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route  path="/" element={<HomePage />} />
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
    </>
  )
}
