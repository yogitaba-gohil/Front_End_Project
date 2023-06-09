import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useUserContext } from '../context/user_context'

const LogInContent = () => {
  const { login, user } = useUserContext()
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    password: '',
    email: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const postData = {
      username: newUser.email,
      password: newUser.password
    }
    login(postData)
    navigate('/')
  }

  return (
    <Wrapper>
      <div className="section">
        <h3>Login</h3>
        <form className="log-form" onSubmit={(e) => handleLogin(e)}>
          <input
            type="text"
            name="email"
            className="log-input"
            placeholder="enter email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="log-input"
            placeholder="enter password"
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            Log-In
          </button>
          Not a member? <Link to="/signUp">Register</Link>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  h3 {
    text-align: center;
  }
  .log-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .log-input {
    padding: 1em;
    margin: 1em;
    border: 2px solid var(--clr-black);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
    color: var(--clr-grey-3);
    width: 26%;
  }
  .log-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }

  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid black;
    margin: 10px;
  }

  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }

  .submit-btn {
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
`

export default LogInContent
