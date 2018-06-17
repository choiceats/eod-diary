import { call, put, takeEvery, all } from 'redux-saga/effects'
import { saveNewDiarySuccess, saveNewDiaryFailure } from './actions'
import browserHistory from '../services/history'

import { addDiary, addEntryToDiary } from '../services/diaryApi'

function* saveNewEntrySaga(action) {
  const { diaryId, entry } = action.payload
  const res = yield addEntryToDiary(entry, diaryId)
  yield put({
    type: 'SAVE_NEW_ENTRY_SUCCESS',
    payload: { entry: res, diaryId }
  })
}

function* watchSaveEntry() {
  yield takeEvery('SAVE_NEW_ENTRY', saveNewEntrySaga)
}

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

export function* rootSaga() {
  yield all([watchSaveDiarySaga(), watchSaveEntry()])
}
