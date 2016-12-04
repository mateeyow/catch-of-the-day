import Firebase from 'firebase'

import * as actions from './actions'
let firebaseInstance

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

    const database = Firebase.database()

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

    const watch = path =>
      actions.watch(dispatch, firebase, database, path)

    const unwatch = path =>
      actions.unwatch(dispatch, firebase, database, path)

    firebase.helpers = {
      login,
      logout,
      database,
      watch,
      unwatch
    }

    actions.init(dispatch, firebase)

    store.firebase = firebaseInstance = firebase

    return store
  }

export const getFirebase = () => {
  return firebaseInstance
}
