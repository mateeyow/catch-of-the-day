import * as types from './action_types'

export const loadSamples = fishes => ({
  type: types.LOAD_SAMPLE_DATA,
  fishes
})

export const addItem = data => ({
  type: types.ADD_ITEM,
  data
})

export const removeItem = idx => ({
  type: types.REMOVE_ITEM,
  idx
})

export const editItem = (data, idx) => ({
  type: types.EDIT_ITEM,
  data,
  idx
})

export const addOrder = data => ({
  type: types.ADD_TO_ORDER,
  data
})
