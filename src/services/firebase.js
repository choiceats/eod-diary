import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

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

const config = {
  apiKey: 'AIzaSyBlDtKtXPEwcCTDvwdGBAEC6xlSBgjMyW8',
  authDomain: 'eod-diary.firebaseapp.com',
  databaseURL: 'https://eod-diary.firebaseio.com',
  projectId: 'eod-diary',
  storageBucket: 'eod-diary.appspot.com',
  messagingSenderId: '951019636236'
}
firebase.initializeApp(config)

const firebaseDb = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firebaseDb.settings(settings)

export default firebaseDb
