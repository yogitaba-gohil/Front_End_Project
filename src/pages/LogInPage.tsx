import React from 'react'
import styled from 'styled-components'
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import { userType } from '../context/user_context'
import { useUserContext } from '../context/user_context'

import LogInContent from '../components/LogInContent'
import PageHero from '../components/PageHero'

const LogInPage = () => {
  const { login } = useUserContext()

  const handleLogin = (response: any) => {
    if (response.credential) {
      const userDecoded: userType = jwtDecode(response.credential)
      login(userDecoded)
    }
  }

  return (
    <main>
      <PageHero title="Log-In" />
      <Wrapper className="page">
        <LogInContent />
      </Wrapper>
      <GoogleLogin onSuccess={handleLogin} />
    </main>
  )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`
export default LogInPage
