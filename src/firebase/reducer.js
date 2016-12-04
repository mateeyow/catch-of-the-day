import { combineReducers } from 'redux'
import * as types from './constants'

const isInitializing = (state = false, action) => {
  switch (action.type) {
    case types.INIT:
    case types.LOGIN:
    case types.LOGOUT:
      return true
    case types.LOGIN_ERROR:
    case types.LOGIN_SUCCESS:
    case types.LOGOUT_SUCCESS:
    case types.LOGOUT_ERROR:
      return false
    default:
      return state
  }
}

const uid = (state = null, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.data.uid
    case types.LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}

const profile = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, action.data)
    case types.LOGOUT_SUCCESS:
      return {}
    default:
      return state
  }
}

const authError = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {}
    case types.LOGIN_ERROR:
    case types.LOGOUT_ERROR:
      return Object.assign({}, state, action.error)
    default:
      return state
  }
}

const isUpdated = (state = false, action) => {
  switch (action.type) {
    case types.UPDATE_PROPS:
      return true
    default:
      return state
  }
}

export default combineReducers({
  isInitializing,
  uid,
  profile,
  authError,
  isUpdated
})
