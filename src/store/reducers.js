import { combineReducers } from 'redux'

const LOAD_DIARIES = 'LOAD_DIARIES'
const LOAD_ENTRIES = 'LOAD_ENTRIES'

function diaries(state = [], action) {
  switch (action.type) {
    case LOAD_DIARIES:
      return action.diaries

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

export default combineReducers({ diaries })
