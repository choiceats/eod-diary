import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
  saveNewDiarySuccess,
  saveNewDiaryFailure,
  clearDiaryFields
} from './actions'
import browserHistory from '../services/history'

import { addDiary } from '../services/diaryApi'

function* saveDiarySaga(action) {
  const res = addDiary(action.payload)

  // successful save
  if (typeof res.id === 'string' && res.id.length > 0) {
    yield put(saveNewDiarySuccess(res))
    yield put(clearDiaryFields())
    yield call(browserHistory.push, '/')
  } else {
    yield put(
      saveNewDiaryFailure(`Error. Failed to save diary ${action.payload.name}`)
    )
  }
}

function* watchSaveDiarySaga() {
  yield takeEvery('SAVE_NEW_DIARY_REQUEST', saveDiarySaga)
}

export function* rootSaga() {
  yield all([watchSaveDiarySaga()])
}
