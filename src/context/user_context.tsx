import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../redux/reducers/user_reducer'
import {
  LOGGED_IN,
  SIGN_UP,
  GET_ALL_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  LOGGED_IN_BEGIN,
  REMOVE_USER
} from '../redux/actions/action'
import { api, apiWithHeader } from '../utils/api'
import { getTokenFromLocalStorage } from '../utils/token'
import jwtDecode from 'jwt-decode'

export type userType = {
  email: string
  password: string
  isAdmin: boolean | null
  fname: string | null
  lname: string | null
  id: string
  token: string
  role: string
}
export type initialStateType = {
  users: userType[]
  isLoading: boolean
  login: (user: any) => void
  addNewUser: (user: any) => void
  fetchUsers: () => void
  deleteUser:(id:string) => void
  usersLoading: boolean
  usersError: boolean
  user: userType
  userLoading: boolean
}
const initialState: initialStateType = {
  users: [],
  isLoading: false,
  login: () => {},
  addNewUser: () => {},
  fetchUsers: () => {},
  deleteUser:() =>{},
  usersLoading: false,
  usersError: false,
  user: {
    email: '',
    password: '',
    isAdmin: false,
    fname: '',
    lname: '',
    id: '',
    token: '',
    role: ''
  },
  userLoading: false
}

const UserContext = React.createContext<initialStateType>(initialState)

type userProps = {
  children: React.ReactNode // children prop typr
}

export const UserProvider: React.FC<userProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (user: userType) => {
    dispatch({ type: LOGGED_IN_BEGIN })
    try {
      const queryResult = await api.post('/users/signin', user)
      localStorage.setItem('token', queryResult.data)
      getTokenFromLocalStorage()
      const userDecoded: userType = jwtDecode(queryResult.data)
      const userToLocalStorage = JSON.stringify(userDecoded)
      localStorage.setItem('user', userToLocalStorage)
      localStorage.setItem('token', queryResult.data)

      dispatch({ type: LOGGED_IN, payload: userDecoded })
    } catch (error) {
      console.log(error)
    }
  }
  const deleteUser = async (id: string) => {
    const removeUser = await api.delete(`/users/${id}`)
    if (removeUser.status) {
      fetchUsers()
    }
    dispatch({ type: REMOVE_USER, payload: removeUser.status })
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
  const fetchUsers = async () => {
    dispatch({ type: GET_ALL_USERS })
    try {
      const queryResult = await api.get('/users')
      dispatch({ type: GET_USERS_SUCCESS, payload: queryResult.data })
    } catch (error) {
      dispatch({ type: GET_USERS_ERROR })
    }
  }

  return (
    <UserContext.Provider value={{ ...state, login, addNewUser, fetchUsers, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}
export const useUserContext = () => {
  return useContext(UserContext)
}
