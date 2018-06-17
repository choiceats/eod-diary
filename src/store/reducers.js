/* @flow */
import { combineReducers } from 'redux'
import {
  LOAD_DIARIES_SUCCESS,
  LOAD_ENTRIES_SUCCESS,
  UPDATE_NEW_DIARY_FIELDS,
  SAVE_NEW_DIARY_SUCCESS,
  SAVE_NEW_ENTRY_SUCCESS
} from './actions'

export function diaries(state: DiaryState = [], action) {
  // TODO: Add error handling
  switch (action.type) {
    case LOAD_DIARIES_SUCCESS:
      return action.payload.diaries

    case LOAD_ENTRIES_SUCCESS:
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

    case SAVE_NEW_ENTRY_SUCCESS: {
      break
    }

    default:
      return state
  }
}

export function entries(state = {}, action) {
  switch (action.type) {
    case SAVE_NEW_ENTRY_SUCCESS: {
      const { entry } = action.payload
      return {
        ...state,
        [entry.id]: entry
      }
    }

    default:
      return state
  }
}
export function newDiary(state = { name: '', description: '' }, action) {
  // TODO: Add error handling
  switch (action.type) {
    case UPDATE_NEW_DIARY_FIELDS:
      return {
        ...state,
        ...action.payload
      }

    case SAVE_NEW_DIARY_SUCCESS:
      return {
        name: '',
        description: ''
      }

    default:
      return state
  }
}

export default combineReducers({
  diaries,
  newDiary,
  entries
})
