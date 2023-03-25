import React from 'react'
import styled from 'styled-components'
import PageHero from '../components/PageHero'

const LogInPage = () => {
  return (
    <main>
        <PageHero title="Log-In" />
      <Wrapper className="page">log-in</Wrapper>
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
