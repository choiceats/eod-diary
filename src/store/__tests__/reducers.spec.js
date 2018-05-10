import { diaries, newDiary } from '../reducers'
import {
  LOAD_DIARIES_SUCCESS,
  LOAD_ENTRIES_SUCCESS,
  UPDATE_NEW_DIARY_FIELDS,
  SAVE_NEW_DIARY_SUCCESS
} from '../actions'
jest.mock('../../services/diaryApi')

const haskellRulz = 'λaskell rulz'

describe(`${diaries.name} reducer`, () => {
  test('default case returns state', () => {
    const mockState = ['goats', 'hamsters']
    const mockAction = {
      type: 'nonsense action name',
      payload: {
        entries: haskellRulz
      }
    }

    expect(diaries(mockState, mockAction)).toEqual(mockState)
  })

  test(`${LOAD_DIARIES_SUCCESS} replaces state with its payload.diaries`, () => {
    const mockState = [
      { id: '1', name: '', description: '', entries: [] },
      { id: '2', name: '', description: '', entries: [] },
      { id: '3', name: '', description: '', entries: [] }
    ]

    const mockAction = {
      type: LOAD_DIARIES_SUCCESS,
      payload: {
        diaries: [{ id: '4', name: '', description: '', entries: [] }]
      }
    }

    expect(diaries(mockState, mockAction)).toEqual(mockAction.payload.diaries)
  })

  test(`${LOAD_ENTRIES_SUCCESS} preserves unmatched diaries`, () => {
    const mockState = [
      {
        id: '1',
        name: 'goats1',
        description: 'hamsters1',
        entries: ['iguanas1a', 'iguanas1b']
      },
      {
        id: '2',
        name: 'goats2',
        description: 'hamsters2',
        entries: ['iguanas2a', 'iguanas2b']
      },
      {
        id: '3',
        name: 'goats3',
        description: 'hamsters3',
        entries: ['iguanas3a', 'iguanas3b']
      }
    ]
    const firstEntry = { ...mockState[0] }
    const lastEntry = { ...mockState[mockState.length - 1] }

    const mockAction = {
      type: LOAD_ENTRIES_SUCCESS,
      payload: {
        diaryId: '2',
        entries: ['λaskell', 'rulz']
      }
    }

    const newState = diaries(mockState, mockAction)

    expect(newState[0]).toEqual(firstEntry)
    expect(newState[newState.length - 1]).toEqual(lastEntry)
  })

  test(`${LOAD_ENTRIES_SUCCESS} replaces entries`, () => {
    const mockState = [
      {
        id: '1',
        name: 'goats1',
        description: 'hamsters1',
        entries: ['iguanas1a', 'iguanas1b']
      },
      {
        id: '2',
        name: 'goats2',
        description: 'hamsters2',
        entries: ['iguanas2a', 'iguanas2b']
      },
      {
        id: '3',
        name: 'goats3',
        description: 'hamsters3',
        entries: ['iguanas3a', 'iguanas3b']
      }
    ]

    const mockAction = {
      type: LOAD_ENTRIES_SUCCESS,
      payload: {
        diaryId: '2',
        entries: ['λaskell', 'rulz']
      }
    }

    const newState = diaries(mockState, mockAction)

    expect(newState[1].entries).toEqual(mockAction.payload.entries)
  })
})

describe(`${newDiary.name} reducer`, () => {
  test('default case returns state', () => {
    const mockState = {
      name: 'goats',
      description: 'hamsters'
    }
    const mockAction = {
      type: 'nonsense action name',
      payload: {
        name: haskellRulz
      }
    }

    expect(diaries(mockState, mockAction)).toEqual(mockState)
  })

  test(`${UPDATE_NEW_DIARY_FIELDS} preserves fields not passed in the payload`, () => {
    const mockState = {
      name: 'goats',
      description: 'hamsters'
    }

    const mockAction = {
      type: UPDATE_NEW_DIARY_FIELDS,
      payload: {
        name: haskellRulz
      }
    }

    expect(newDiary(mockState, mockAction).description).toBe('hamsters')
  })

  test(`${UPDATE_NEW_DIARY_FIELDS} updates fields passed in the payload`, () => {
    const mockState = {
      name: 'goats',
      description: 'hamsters'
    }

    const mockAction = {
      type: UPDATE_NEW_DIARY_FIELDS,
      payload: {
        name: haskellRulz,
        description: haskellRulz
      }
    }

    const newState = newDiary(mockState, mockAction)

    expect(newState.name).toEqual(haskellRulz)
    expect(newState.description).toEqual(haskellRulz)
  })

  test(`${SAVE_NEW_DIARY_SUCCESS} clears form state`, () => {
    const mockState = {
      name: 'goats',
      description: 'hamsters'
    }

    const mockAction = {
      type: SAVE_NEW_DIARY_SUCCESS,
      payload: {
        id: haskellRulz,
        name: haskellRulz,
        description: haskellRulz,
        entries: []
      }
    }

    const newState = newDiary(mockState, mockAction)

    expect(newState.name).toEqual('')
    expect(newState.description).toEqual('')
  })
})
