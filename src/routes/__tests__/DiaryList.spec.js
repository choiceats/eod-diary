import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import { DiaryList, SimpleList } from '../DiaryList'
import { loadDiariesRequest } from '../../store/actions'
jest.mock('../../store/actions')

describe('Routes: DiaryList', () => {
  it('requests loading of diaries', () => {
    const mockDispatch = jest.fn()

    const props = {
      diaries: [],
      dispatch: mockDispatch
    }

    const preRenderLoadDiariesCount = loadDiariesRequest.mock.calls.length

    const wrapper = shallow(<DiaryList {...props} />)

    const postRenderLoadDiariesCount = loadDiariesRequest.mock.calls.length

    expect(postRenderLoadDiariesCount - preRenderLoadDiariesCount > 0).toBe(
      true
    )
  })

  it('SimpleList renders one Link per diary', () => {
    const wrapper = shallow(
      <SimpleList {...{ diaries: ['1', '2'], classes: {} }} />
    )

    const diaryLinks = wrapper.find(Link)

    expect(diaryLinks.length).toBe(2)
  })
})
