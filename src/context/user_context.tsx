import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../redux/reducers/user_reducer'
import {
  LOGGED_IN,
  SIGN_UP,
  GET_ALL_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  LOGGED_IN_BEGIN
} from '../redux/actions/action'

export type userType = {
  email: string
  password: string
  id: string
  isAdmin: boolean
  fname: string | null
  lname: string | null
}
export type initialStateType = {
  users: userType[]
  isLoading: boolean
  login: (user: any) => void
  addNewUser: (user: any) => void
  usersLoading: boolean
  usersError: boolean
  user: userType[]
  userLoading: boolean
}
const initialState: initialStateType = {
  users: [],
  isLoading: false,
  login: () => {},
  addNewUser: () => {},
  usersLoading: false,
  usersError: false,
  user: [],
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
  const addNewUser = (user: userType) => {
    dispatch({ type: LOGGED_IN_BEGIN })
    try {
      user['id'] = state.users.length + 1 ;
      const isUserExit: userType = state.users.includes(user.email)
      if (!isUserExit) {
        dispatch({ type: SIGN_UP, payload: user })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: GET_ALL_USERS })
      try {
        const queryResult = await fetch('http://localhost:5173/products.json')
        const result = await queryResult.json()
        dispatch({ type: GET_USERS_SUCCESS, payload: result.users })
      } catch (error) {
        dispatch({ type: GET_USERS_ERROR })
      }
    }
    fetchUsers()
  }, [])

  return (
    <UserContext.Provider value={{ ...state, login, addNewUser }}>{children}</UserContext.Provider>
  )
}
export const useUserContext = () => {
  return useContext(UserContext)
}
