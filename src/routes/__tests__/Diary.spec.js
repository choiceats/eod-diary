import React from 'react'
import { shallow } from 'enzyme'

import { Diary } from '../Diary'

describe('Routes: Diary', () => {
  it('renders a summary of each diary entry', () => {
    const mockDispatch = jest.fn()
    const props = {
      entries: ['a', 'b', 'c', 'd'],
      match: {
        params: {
          diaryId: '1'
        }
      },
      dispatch: mockDispatch
    }

    const wrapper = shallow(<Diary {...props} />)

    expect(wrapper.find('p').length).toBe(4)
  })
})
