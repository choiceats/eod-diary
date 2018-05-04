import { put, takeEvery, all } from 'redux-saga/effects'
import {
  saveNewDiarySuccess,
  saveNewDiaryFailure,
  clearDiaryFields
} from './actions'

import { addDiary } from '../services/diaryApi'

function* saveDiarySaga(action) {
  const res = addDiary(action.payload)

  if (typeof res.id === 'string' && res.id.length > 0) {
    // successful save
    yield put(saveNewDiarySuccess(res))
    yield put(clearDiaryFields())

    // TODO: Add some sort of routing logic, action, or side effect here.
    // Possibly using react-router-redux v5
    // (see https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux)
  } else {
    // unsuccessful save
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
