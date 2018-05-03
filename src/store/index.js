import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'

export function createAppStore() {
  return createStore(rootReducer)
}
