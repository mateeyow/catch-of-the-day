import { combineReducers } from 'redux'

import * as types from './action_types'
import { slugify } from '../helpers'

const fishes = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_SAMPLE_DATA:
      return [...state, ...action.fishes]
    case types.ADD_ITEM:
      return [action.data, ...state]
    case types.REMOVE_ITEM:
      return [
        ...state.slice(0, action.idx),
        ...state.slice(action.idx + 1)
      ]
    case types.EDIT_ITEM:
      return [
        ...state.slice(0, action.idx),
        Object.assign({}, state[action.idx], action.data),
        ...state.slice(action.idx + 1)
      ]
    default:
      return state
  }
}

const orders = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_TO_ORDER: {
      const slugified = slugify(action.data.name)
      const quantity = state[slugified]
        ? state[slugified].quantity + 1
        : 1
      const order = {
        [slugified]: Object.assign({}, action.data, { quantity })
      }

      return Object.assign({}, state, order)
    }
    case types.EDIT_ITEM: {
      const slugified = slugify(action.data.name)
      if (state[slugified]) {
        const item = Object.assign({}, state[slugified], action.data)
        return Object.assign({}, state, { [slugified]: item })
      }

      return state
    }
    default:
      return state
  }
}

export default combineReducers({
  fishes,
  orders
})
