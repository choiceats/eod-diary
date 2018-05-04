import { createStore /*, applyMiddleware*/ } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// TODO: Hook up Redux saga middleware

import rootReducer from './reducers'

export function createAppStore() {
  return createStore(rootReducer)
}
