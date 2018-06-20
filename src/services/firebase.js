import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui'

import { setCurrentUser } from './user'

export function login(callback) {
  const auth = firebase.auth()
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('firebaseui-auth-container').remove()
      setCurrentUser(user)
      callback()
    } else {
      handleSignedOutUser(auth)
    }
  })
}

function handleSignedOutUser(auth) {
  const config = {
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        return false
      }
    }
  }
  const ui = new firebaseui.auth.AuthUI(auth)
  ui.start('#firebaseui-auth-container', config)
}
