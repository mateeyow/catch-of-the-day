export default (state = false, action) => {
  switch (action.type) {
    case 'FOLD_MENU':
      return !state
    default:
      return state
  }
}
