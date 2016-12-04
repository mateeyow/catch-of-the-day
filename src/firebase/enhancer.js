import Firebase from 'firebase'

import * as actions from './actions'

export default (config, otherConfig) => next =>
  (reducer, initialState, middleware) => {
    const defaultConfig = {
      userProfile: null,
      enableLogging: false,
      updateProfileOnLogin: true
    }
    const store = next(reducer, initialState, middleware)
    const configs = Object.assign({}, defaultConfig, config, otherConfig)
    const { dispatch } = store

    try {
      Firebase.initializeApp(config)
    } catch (err) {
      console.error('Firebase initialize error', err)
    }

    if (configs.enableLogging) {
      Firebase.database.enableLogging(configs.enableLogging)
    }

    const firebase = Object.defineProperty(Firebase, '_', {
      value: {
        watchers: {},
        config: configs,
        authUid: null
      },
      writable: true,
      enumerable: true,
      configurable: true
    })

    const login = provider =>
      actions.login(dispatch, firebase, provider)

    const logout = () =>
      actions.logout(dispatch, firebase)

    firebase.helpers = {
      login,
      logout
    }

    actions.init(dispatch, firebase)

    store.firebase = firebase

    return store
  }
