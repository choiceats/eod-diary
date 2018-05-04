import React from 'react'
import { shallow } from 'enzyme'

import { App } from '../App'

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
})
