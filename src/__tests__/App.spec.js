import React from 'react'
import { shallow } from 'enzyme'

import { App, seedDiaries } from '../App'

import { setItem, fetchDiaries } from '../services/diaryApi'

jest.mock('../services/diaryApi')
jest.mock('../services/firebase')

describe('Root: App', () => {
  it('shows not logged in message when user is not logged in.', () => {
    const wrapper = shallow(<App />)
    expect(
      wrapper
        .html()
        .toLowerCase()
        .includes('not logged in')
    ).toBe(true)
  })

  it('renders app when user is logged in', () => {
    const wrapper = shallow(<App />)
    wrapper.setState(() => ({ user: 'has user' }))
    expect(wrapper.find('.App').length).toBe(1)
  })
})

describe('Root: App: seedDiaries', () => {
  it('seeds when there are no diaries', () => {
    fetchDiaries.mockClear()
    setItem.mockClear()
    fetchDiaries.mockImplementation(() => [])

    seedDiaries()

    expect(setItem.mock.calls.length).toBe(1)
  })

  it('does not seed when there are diaries', () => {
    fetchDiaries.mockClear()
    setItem.mockClear()
    fetchDiaries.mockImplementation(() => ['has', 'diaries'])

    seedDiaries()

    expect(setItem.mock.calls.length).toBe(0)
  })
})
