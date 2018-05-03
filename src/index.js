import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const config = {
  apiKey: 'AIzaSyBlDtKtXPEwcCTDvwdGBAEC6xlSBgjMyW8',
  authDomain: 'eod-diary.firebaseapp.com',
  databaseURL: 'https://eod-diary.firebaseio.com',
  projectId: 'eod-diary',
  storageBucket: 'eod-diary.appspot.com',
  messagingSenderId: '951019636236'
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
