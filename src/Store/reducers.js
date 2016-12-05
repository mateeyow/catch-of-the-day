import { combineReducers } from 'redux'

import * as types from './action_types'
import * as firebaseTypes from '../firebase/constants'

const fishes = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_SAMPLE_DATA:
      return Object.assign({}, state, action.fishes)
    case types.ADD_ITEM:
      return Object.assign({}, action.data, state)
    case types.REMOVE_ITEM: {
      const newState = Object.assign({}, state)
      delete newState[action.key]
      return newState
    }
    case types.EDIT_ITEM:
      return Object.assign({}, state, action.data)
    case firebaseTypes.UPDATE_PROPS:
      return {...action.data}
    default:
      return state
  }
}

const orders = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_TO_ORDER:
      return Object.assign({}, state, action.data)
    case types.EDIT_ITEM: {
      if (state[action.key]) {
        const item = Object.assign({}, state[action.key], action.data[action.key])
        return Object.assign({}, state, { [action.key]: item })
      }

      return state
    }
    case types.REMOVE_ITEM: {
      const newState = Object.assign({}, state)
      delete newState[action.key]
      return newState
    }
    case types.REMOVE_ORDER: {
      const newState = Object.assign({}, state)
      delete newState[action.key]
      return newState
    }
    case types.INITIALIZE_ORDER:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  fishes,
  orders
})
