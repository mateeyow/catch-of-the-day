import * as types from './constants'

const signIn = () => ({ type: types.LOGIN })
const signInSuccess = data => ({ type: types.LOGIN_SUCCESS, data })
const signInError = error => ({ type: types.LOGIN_ERROR, error })

const formatUser = user => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  avatarUrl: user.photoURL,
  providerData: user.providerData
})

export const login = (dispatch, firebase, providerName) => {
  const provider = new firebase.auth[`${providerName}AuthProvider`]()
  dispatch(signIn())

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      console.info('Login Success!')
    })
    .catch(error => {
      console.error('Error', error)
      dispatch(signInError(error))
    })
}

export const init = (dispatch, firebase) => {
  dispatch({ type: types.INIT })

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const data = formatUser(user)
      dispatch(signInSuccess(data))
    } else {
      dispatch({ type: types.LOGOUT_SUCCESS })
    }
  })
}

export const logout = (dispatch, firebase) => {
  dispatch({ type: types.LOGOUT })

  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Logout Success!')
    })
    .catch(error => {
      dispatch({ type: types.LOGOUT_ERROR, error })
    })
}

export const watch = (dispatch, firebase, database, path) => {
  database
    .ref(path)
    .on('value', (snapshot) => {
      const data = snapshot.val()
      const fishes = data.fishes || []
      dispatch({ type: types.UPDATE_PROPS, data: fishes })
    })
}

export const unwatch = (dispatch, firebase, database, path) => {
  database.ref(path).off()
}
