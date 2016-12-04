import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import immutableChecker from 'redux-immutable-state-invariant'

import rootReducer from './reducer'
import firebaseEnhancer from './firebase/enhancer'

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket
}

export default (initialState) => {
  const middleware = [thunk, routerMiddleware(browserHistory)]
  let store

  if (__DEVELOPMENT__) {
    middleware.push(immutableChecker(), createLogger())
    store = createStore(rootReducer, initialState, compose(
      firebaseEnhancer(firebaseConfig),
      applyMiddleware(...middleware),
      typeof window === 'object' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    ))
  } else {
    store = createStore(rootReducer, initialState, compose(
      firebaseEnhancer(firebaseConfig),
      applyMiddleware(...middleware)
    ))
  }

  return store
}
