import React from 'react'
import { shallow } from 'enzyme'

import { Diary } from '../Diary'
import { loadEntriesRequest, loadDiariesRequest } from '../../store/actions'
jest.mock('../../store/actions')

describe('Routes: Diary', () => {
  let props
  beforeEach(() => {
    props = {
      match: {
        params: {
          diaryId: '1'
        }
      },
      dispatch: jest.fn()
    }
  })

  it('renders a summary of each diary entry when there is data', () => {
    props.entries = ['a', 'b', 'c', 'd']

    const wrapper = shallow(<Diary {...props} />)

    expect(wrapper.find('p').length).toBe(4)
  })

  it('renders a no entries found message when there is no data', () => {
    const wrapper = shallow(<Diary {...props} />)

    expect(
      wrapper
        .text()
        .toLowerCase()
        .includes('no entries')
    ).toBe(true)
  })

  it('loads entries when the diary exists but is missing entries', () => {
    loadEntriesRequest.mockReset()
    loadDiariesRequest.mockReset()
    props.name = 'has'

    shallow(<Diary {...props} />)

    expect(loadEntriesRequest.mock.calls.length).toBe(1)
    expect(loadDiariesRequest.mock.calls.length).toBe(0)
  })

  it('loads diaries when there are none', () => {
    loadEntriesRequest.mockReset()
    loadDiariesRequest.mockReset()

    shallow(<Diary {...props} />)

    expect(loadEntriesRequest.mock.calls.length).toBe(0)
    expect(loadDiariesRequest.mock.calls.length).toBe(1)
  })
})
