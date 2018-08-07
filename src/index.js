import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import 'firebaseui/dist/firebaseui.css'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
