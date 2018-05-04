import { combineReducers } from 'redux'
import { LOAD_DIARIES, LOAD_ENTRIES, UPDATE_NEW_DIARY_FIELDS } from './actions'

export function diaries(state = [], action) {
  switch (action.type) {
    case LOAD_DIARIES:
      return action.payload.diaries

    case LOAD_ENTRIES:
      const idToUpdate = state.findIndex(
        entry => entry.id === action.payload.diaryId
      )
      const updatedDiary = {
        ...state[idToUpdate],
        entries: action.payload.entries
      }

      return [
        ...state.slice(0, idToUpdate),
        updatedDiary,
        ...state.slice(idToUpdate + 1)
      ]

    default:
      return state
  }
}

export function newDiary(state = { name: '', description: '' }, action) {
  switch (action.type) {
    case UPDATE_NEW_DIARY_FIELDS:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export default combineReducers({
  diaries,
  newDiary
})
