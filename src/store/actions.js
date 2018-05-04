import { fetchDiaries } from '../services/diaryApi'

export const LOAD_DIARIES = 'LOAD_DIARIES'
export const LOAD_ENTRIES = 'LOAD_ENTRIES'
export const UPDATE_NEW_DIARY_FIELDS = 'UPDATE_NEW_DIARY_FIELDS'
export const SAVE_NEW_DIARY = 'SAVE_NEW_DIARY'

export const updateDiaryFields = fields => ({
  type: UPDATE_NEW_DIARY_FIELDS,
  payload: { ...fields }
})

export const saveNewDiary = ({ name, description }) => ({
  type: SAVE_NEW_DIARY,
  payload: {
    name,
    description
  }
})

export const loadDiaries = () => ({
  type: 'LOAD_DIARIES',
  payload: {
    diaries: fetchDiaries()
  }
})
