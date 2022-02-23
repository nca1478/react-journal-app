import { types } from '../types/types'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password) // signin on firebase
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(finishLoading())
      })
  }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password) // create user on firebase
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name }) // update displayName by name on firebase
        dispatch(login(user.uid, user.displayName))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider) // google signin on firebase
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: { uid, displayName },
  }
}

export const startLoading = () => {
  return {
    type: types.uiStartLoading,
  }
}

export const finishLoading = () => {
  return {
    type: types.uiFinishLoading,
  }
}
