import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LogInButtons = () => {
  return (
    <Wrapper className="log-btn-wrapper">
      <Link to="/logIn" className="log-btn">
        <FaUserAlt />
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  width: 50px;

  .log-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
export default LogInButtons
