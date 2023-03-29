import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../redux/reducers/user_reducer'
import {
  LOGGED_IN,
  LOGGED_OUT,
  GET_ALL_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  LOGGED_IN_BEGIN
} from '../redux/actions/action'
import { Email } from '@mui/icons-material'

export type userType = {
  email: string
  password: string
}
export type initialStateType = {
  users: userType[] | null
  isLoading: boolean
  login: (user: userType) => void
  usersLoading: boolean
  usersError: boolean
  user: userType[] | null
  isAdmin: boolean
  userLoading: boolean
}
const initialState: initialStateType = {
  users: null,
  isLoading: false,
  login: () => {},
  usersLoading: false,
  usersError: false,
  user: null,
  isAdmin: false,
  userLoading: false
}

const UserContext = React.createContext<initialStateType>(initialState)

type userProps = {
  children: React.ReactNode // children prop typr
}

export const UserProvider: React.FC<userProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = (user: userType) => {
    dispatch({ type: LOGGED_IN_BEGIN })
    try {
      const newUser: userType = state.users.filter((item: userType) => item.email === user.email)
      if (newUser) {
        dispatch({ type: LOGGED_IN, payload: newUser })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchUsers = async () => {
      console.log('first-----')
      dispatch({ type: GET_ALL_USERS })
      try {
        const queryResult = await fetch('http://localhost:5173/products.json')
        const result = await queryResult.json()
        dispatch({ type: GET_USERS_SUCCESS, payload: result.users })
      } catch (error) {
        console.log(error)
        dispatch({ type: GET_USERS_ERROR })
      }
    }
    fetchUsers()
  }, [])

  return <UserContext.Provider value={{ ...state, login }}>{children}</UserContext.Provider>
}
export const useUserContext = () => {
  return useContext(UserContext)
}
