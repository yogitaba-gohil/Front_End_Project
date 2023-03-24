import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'

export const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="header logo" />
    </Link>
  )
}
