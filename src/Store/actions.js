import * as types from './action_types'

export const loadSamples = fishes => ({
  type: types.LOAD_SAMPLE_DATA,
  fishes
})

export const addItem = data => ({
  type: types.ADD_ITEM,
  data
})

export const removeItem = key => ({
  type: types.REMOVE_ITEM,
  key
})

export const editItem = (data, key) => ({
  type: types.EDIT_ITEM,
  data,
  key
})

export const addOrder = data => ({
  type: types.ADD_TO_ORDER,
  data
})

export const removeOrder = key => ({
  type: types.REMOVE_ORDER,
  key
})
