export const LOAD_DIARIES_REQUEST = 'LOAD_DIARIES_REQUEST'
export const LOAD_DIARIES_SUCCESS = 'LOAD_DIARIES_SUCCESS'
export const LOAD_DIARIES_FAILURE = 'LOAD_DIARIES_FAILURE'

export const LOAD_ENTRIES_REQUEST = 'LOAD_ENTRIES_REQUEST'
export const LOAD_ENTRIES_SUCCESS = 'LOAD_ENTRIES_SUCCESS'
export const LOAD_ENTRIES_FAILURE = 'LOAD_ENTRIES_FAILURE'

export const UPDATE_NEW_DIARY_FIELDS = 'UPDATE_NEW_DIARY_FIELDS'

export const SAVE_NEW_DIARY_REQUEST = 'SAVE_NEW_DIARY_REQUEST'
export const SAVE_NEW_DIARY_SUCCESS = 'SAVE_NEW_DIARY_SUCCESS'
export const SAVE_NEW_DIARY_FAILURE = 'SAVE_NEW_DIARY_FAILURE'

export const updateDiaryFields = fields => ({
  type: UPDATE_NEW_DIARY_FIELDS,
  payload: { ...fields }
})

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

export const loadDiariesRequest = () => ({
  type: LOAD_DIARIES_REQUEST,
  payload: {}
})

export const loadDiariesSuccess = diaries => ({
  type: LOAD_DIARIES_SUCCESS,
  payload: {
    diaries
  }
})

export const loadDiariesFailure = error => ({
  type: LOAD_DIARIES_FAILURE,
  payload: {
    error
  }
})

export const loadEntriesRequest = ({ diaryId, name = '' }) => ({
  type: LOAD_ENTRIES_REQUEST,
  payload: { diaryId, name } // name used for friendlier error handling
})

export const loadEntriesSuccess = ({ id, entries }) => ({
  type: LOAD_ENTRIES_SUCCESS,
  payload: { id, entries }
})

export const loadEntriesFailure = error => ({
  type: LOAD_ENTRIES_FAILURE,
  payload: { error }
})
