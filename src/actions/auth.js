import { types } from '../types/types'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import Swal from 'sweetalert2'
import { noteLogout } from './notes'

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password) // Sign In on firebase
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error')
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
      .createUserWithEmailAndPassword(email, password) // Create user on firebase
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name }) // Update displayName by name on firebase
        dispatch(login(user.uid, user.displayName))
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error')
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider) // Google signin on firebase
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error')
      })
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut()
    dispatch(logout())
    dispatch(noteLogout())
  }
}

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: { uid, displayName },
  }
}

export const logout = () => {
  return {
    type: types.logout,
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
