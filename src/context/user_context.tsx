import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../redux/reducers/user_reducer'
import { LOGGED_IN, LOGGED_OUT } from '../redux/actions/action'

export type userType = {
  email: string
  password: number
  isAdmin: boolean
}
export type initialStateType = {
  users: userType[] | null
  isLoading: boolean
  login: (user:userType) => void
}
const initialState: initialStateType = {
  users: null,
  isLoading: false,
  login: () => {}
}

const UserContext = React.createContext<initialStateType>(initialState)

type userProps = {
  children: React.ReactNode // children prop typr
}

export const UserProvider: React.FC<userProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = (user:userType) => {
    dispatch({ type: LOGGED_IN , payload:user})
  }

  return <UserContext.Provider value={{ ...state, login }}>{children}</UserContext.Provider>
}
export const useUserContext = () => {
    return useContext(UserContext)
  }