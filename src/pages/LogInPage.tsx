import React from 'react'
import styled from 'styled-components'
import LogInContent from '../components/LogInContent'
import PageHero from '../components/PageHero'
import { GoogleLogin } from '@react-oauth/google'

const LogInPage = () => {
  return (
    <main>
      <PageHero title="Log-In" />
      <Wrapper className="page">
        <LogInContent />
      </Wrapper>
      <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
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
