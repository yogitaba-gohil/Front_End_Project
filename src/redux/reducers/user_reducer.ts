import React from 'react'
import { AnyAction } from 'redux'
import { initialStateType } from '../../context/user_context'
import {
  LOGGED_IN,
  LOGGED_OUT,
  GET_ALL_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  LOGGED_IN_BEGIN,
  SIGN_UP
} from '../actions/action'

const user_reducer = (state: initialStateType, action: AnyAction) => {
  if (action.type === GET_ALL_USERS) {
    return { ...state, usersLoading: true }
  }
  if (action.type === GET_USERS_SUCCESS) {
    const allUsers = action.payload.map((user: any) => {
      let { email, password, isAdmin , id} = user
      return {
        email,
        password,
        isAdmin,
        id
      }
    })
    
    return { ...state, usersLoading: false, users: allUsers }
  }
  if (action.type === GET_USERS_ERROR) {
    return { ...state, usersError: true, usersLoading: false }
  }
  if (action.type === LOGGED_IN_BEGIN) {
    return { ...state, userLoading: true }
  }
  if(action.type === SIGN_UP){
    return {
      ...state,
      users: [...state.users, action.payload]
    }
    
  }
  if (action.type === LOGGED_IN) {
    return {
      ...state,
      user: action.payload
    }
  }
  if (action.type === LOGGED_OUT) {
    return {
      ...state,
      user: null
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default user_reducer
