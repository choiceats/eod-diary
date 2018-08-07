import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import { setCurrentUser } from './user'

export function login(callback) {
  const auth = firebase.auth()
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  auth.onAuthStateChanged(user => {
    if (user) {
      setCurrentUser(user)
      callback()
    } else {
      handleSignedOutUser(auth)
    }
  })
}

function handleSignedOutUser(auth) {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithRedirect(provider)
  auth.getRedirectResult().then(result => {
    setCurrentUser(result.user)
  })
}
