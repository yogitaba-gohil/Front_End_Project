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
import { DecodedUser } from '../utils/type-guards'
import { api, apiWithHeader } from '../utils/api'
import { getTokenFromLocalStorage } from '../utils/token'

export type userType = {
  email: string
  password: string
  isAdmin: boolean | null
  fname: string | null
  lname: string | null
  id:string
  token:string
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

  const login = async(user: userType) => {
    console.log('user', user)
    dispatch({ type: LOGGED_IN_BEGIN })
    try {
      console.log('first')
      const queryResult = await api.post('/users/signin', user)
      console.log('queryResult.data', queryResult.data)
      localStorage.setItem('token', queryResult.data)
      getTokenFromLocalStorage()
        dispatch({ type: LOGGED_IN, payload: queryResult.data })
    } catch (error) {
      console.log(error)
    }
  }
 
  const addNewUser = (user: userType) => {
    dispatch({ type: LOGGED_IN_BEGIN })
    try {
      user['id'] = state.users.length + 1
      const isUserExit: userType = state.users.includes(user.email)
      if (!isUserExit) {
        dispatch({ type: SIGN_UP, payload: user })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('token', token)
    const fetchUsers = async () => {
      dispatch({ type: GET_ALL_USERS })
      try {

        const queryResult = await apiWithHeader.get('/users')
        console.log('queryResult.data', queryResult.data)

        dispatch({ type: GET_USERS_SUCCESS, payload: queryResult })
      } catch (error) {
        dispatch({ type: GET_USERS_ERROR })
      }
    }
    if(token){
      fetchUsers()

    }
  }, [])

  return (
    <UserContext.Provider value={{ ...state, login, addNewUser }}>{children}</UserContext.Provider>
  )
}
export const useUserContext = () => {
  return useContext(UserContext)
}
