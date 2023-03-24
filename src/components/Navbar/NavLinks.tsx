import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../../utils/constants'

export const NavLinks: React.FC<{ className: string; isSidebar?: boolean }> = ({
  className,
  isSidebar
}) => {
  return (
    <ul className={className}>
      {links.map(({ id, text, url }) => {
        return (
          <li key={id}>
            <Link to={url}>{text}</Link>
          </li>
        )
      })}
      {/* 'checkout' only available in sidebar, not in Navbar */}
      {isSidebar && (
        <li>
          <Link to="/checkout">checkout</Link>
        </li>
      )}
    </ul>
  )
}
