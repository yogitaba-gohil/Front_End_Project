import React from 'react'
import styled from 'styled-components'

import PageHero from '../components/PageHero'
import SignUpContent from '../components/SignUpContent'

const SignUpPage = () => {
  return (
    <main>
    <PageHero title="Sign-Up" />
    <Wrapper className="page">
      <SignUpContent />
    </Wrapper>
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

export default SignUpPage
