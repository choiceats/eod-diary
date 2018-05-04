import { fetchDiaries } from '../services/diaryApi'

export const LOAD_DIARIES = 'LOAD_DIARIES'
export const LOAD_ENTRIES = 'LOAD_ENTRIES'
export const UPDATE_NEW_DIARY_FIELDS = 'UPDATE_NEW_DIARY_FIELDS'

export const SAVE_NEW_DIARY_SUCCESS = 'SAVE_NEW_DIARY_SUCCESS'
export const SAVE_NEW_DIARY_REQUEST = 'SAVE_NEW_DIARY_REQUEST'
export const SAVE_NEW_DIARY_FAILURE = 'SAVE_NEW_DIARY_FAILURE'

export const updateDiaryFields = fields => ({
  type: UPDATE_NEW_DIARY_FIELDS,
  payload: { ...fields }
})

export const clearDiaryFields = () =>
  updateDiaryFields({ name: '', description: '' })

export const saveNewDiaryRequest = ({ name, description }) => ({
  type: SAVE_NEW_DIARY_REQUEST,
  payload: {
    name,
    description
  }
})

export const saveNewDiarySuccess = ({
  id,
  name,
  description,
  entries = []
}) => ({
  type: SAVE_NEW_DIARY_SUCCESS,
  payload: {
    id,
    name,
    description,
    entries
  }
})

export const saveNewDiaryFailure = error => ({
  type: SAVE_NEW_DIARY_REQUEST,
  payload: {
    error
  }
})

export const loadDiaries = () => ({
  type: LOAD_DIARIES,
  payload: {
    diaries: fetchDiaries()
  }
})
