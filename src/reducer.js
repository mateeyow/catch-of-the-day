import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { storeReducer as store } from './Store'
import firebase from './firebase/reducer'
import { navReducer as navbar } from './Navbar'

export default combineReducers({
  routing,
  firebase,
  navbar,
  store
})
