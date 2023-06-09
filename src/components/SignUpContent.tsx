import React, { useState } from 'react'
import styled from 'styled-components'
import { FormControlLabel, Switch } from '@mui/material'
import { useNavigate } from "react-router-dom";


import { useUserContext } from '../context/user_context'
import { api } from '../utils/api';
import { getTokenFromLocalStorage } from '../utils/token';

const SignUpContent = () => {
  const { addNewUser, users } = useUserContext()
  const navigate = useNavigate();

  const [addUser, setAddUser] = useState({
    fname: '',
    lname: '',
    password: '',
    email: '',
    username:'',
    phone:'',
    isAdmin: false
  })
  const handleIsAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddUser({
      ...addUser,
      [event.target.name]: event.target.checked
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddUser({ ...addUser, [event.target.name]: event.target.value })
  }

  const handleSignUp = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      !addUser.username ||
      !addUser.fname ||
      !addUser.lname ||
      !addUser.email ||
      !addUser.phone ||
      !addUser.password
    ) {
      alert('please fill all the fields');
      return;
    }
    const NewUser = {
      username: addUser.username,
      firstname: addUser.fname,
      lastname: addUser.lname,
      email: addUser.email,
      phone: addUser.phone,
      password: addUser.password,
    };
    const request = await api.post('/users/signup', NewUser);
    localStorage.setItem('token', request.data);
    getTokenFromLocalStorage();
    navigate('/logIn');
    // addNewUser(NewUser)
    // navigate("/logIn");

  }
  return (
    <Wrapper>
      <div className="section">
        <h3>Sign Up</h3>
        <form className="log-form" onSubmit={(e) => handleSignUp(e)}>
          <input
            type="text"
            name="fname"
            className="log-input"
            placeholder="enter your  first name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lname"
            className="log-input"
            placeholder="enter your  last name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            className="log-input"
            placeholder="enter your  user name"
            onChange={handleChange}
          />
          <input
            type="email"
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
          <input
            type="text"
            name="phone"
            className="log-input"
            placeholder="enter your  phone number"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Switch onChange={handleIsAdmin} name="isAdmin" checked={addUser.isAdmin} />}
            label="Admin"
          />

          <button type="submit" className="submit-btn">
            Sign-Up
          </button>
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

export default SignUpContent
