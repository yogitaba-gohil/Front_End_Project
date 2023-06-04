import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import AdminContent from '../components/AdminContent'
import AdminSidebar from '../components/AdminSidebar'
import PageHero from '../components/PageHero'
import UserContent from '../components/UserContent'
import OrderContent from '../components/OrderContent'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'

const AdminPage = () => {
  const [data, setData] = useState('products')
  const { fetchOrders } = useCartContext()
  const { fetchUsers } = useUserContext()

  const handleChange = (arg: string) => {
    setData(arg)
  }
  useEffect(() => {
    fetchOrders()
    fetchUsers()
  }, [])
  return (
    <Wrapper>
      <PageHero title="Admin" />
      <div className="content">
        <div className="select">
          <AdminSidebar handleChange={handleChange} />
        </div>
        <Wrapper className="page">
          {data == 'products' ? (
            <AdminContent />
          ) : data == 'users' ? (
            <UserContent />
          ) : (
            <OrderContent />
          )}
        </Wrapper>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .content {
    display: flex;
  }
  .form-control {
    display: block;
    text-align: center;
    margin-bottom: 1.25rem;
  }
  .select {
    flex: 0.5;
    text-align: cente;
  }
  .page {
    flex: 2;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`

export default AdminPage
