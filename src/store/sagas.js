import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
  saveNewDiarySuccess,
  saveNewDiaryFailure,
  loadDiariesSuccess,
  loadDiariesFailure,
  loadEntriesSuccess,
  loadEntriesFailure
} from './actions'
import browserHistory from '../services/history'

import { addDiary, fetchDiaries, fetchEntries } from '../services/diaryApi'

function* saveDiarySaga(action) {
  const res = addDiary(action.payload)

  // successful save
  if (typeof res.id === 'string' && res.id.length > 0) {
    yield put(saveNewDiarySuccess(res))
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

function* loadDiariesSaga(action) {
  const res = fetchDiaries()

  // successful save
  if (res.length > 0) {
    yield put(loadDiariesSuccess(res))
  } else {
    yield put(loadDiariesFailure('Error. Failed to load new diaries'))
  }
}

function* watchLoadDiariesSaga() {
  yield takeEvery('LOAD_DIARIES_REQUEST', loadDiariesSaga)
}

function* loadEntriesSaga(action) {
  const res = fetchEntries(action.payload.diaryId)

  // successful save
  if (res.length > 0) {
    yield put(loadEntriesSuccess(res))
  } else {
    yield put(
      loadEntriesFailure(`Error. Failed to load diary ${action.payload.name}`)
    )
  }
}

function* watchLoadEntriesSaga() {
  yield takeEvery('LOAD_ENTRIES_REQUEST', loadEntriesSaga)
}

export function* rootSaga() {
  yield all([
    watchSaveDiarySaga(),
    watchLoadDiariesSaga(),
    watchLoadEntriesSaga()
  ])
}
