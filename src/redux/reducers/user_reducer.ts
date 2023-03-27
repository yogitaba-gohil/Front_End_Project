import React from 'react'
import { AnyAction } from 'redux'
import { initialStateType } from '../../context/user_context'
import { LOGGED_IN, LOGGED_OUT } from '../actions/action'

const user_reducer = (state: initialStateType, action: AnyAction) => {
  if (action.type === LOGGED_IN) {
    return {
      ...state,
      users: action.payload
    }
  }
  if (action.type === LOGGED_OUT) {
    return {
      ...state,
      users: null
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default user_reducer
