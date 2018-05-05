import React from 'react'
import Button from 'material-ui/Button'
import { shallow } from 'enzyme'

import { NewDiaryForm } from '../NewDiaryForm'

import { updateDiaryFields, saveNewDiaryRequest } from '../../store/actions'
jest.mock('../../store/actions')

describe('Routes: NewDiaryForm', () => {
  it('submit button is enabled when name and description fields have information', () => {
    const props = { name: 'has', description: 'has' }

    const wrapper = shallow(<NewDiaryForm {...props} />)

    expect(wrapper.find(Button).prop('disabled')).toBe(false)
  })

  it('submit button is disabled when name is empty', () => {
    const props = { name: '', description: 'has' }

    const wrapper = shallow(<NewDiaryForm {...props} />)

    expect(wrapper.find(Button).prop('disabled')).toBe(true)
  })

  it('submit button is disabled when name is empty', () => {
    const props = { name: 'has', description: '' }

    const wrapper = shallow(<NewDiaryForm {...props} />)

    expect(wrapper.find(Button).prop('disabled')).toBe(true)
  })

  it('updates name when name input is typed in', () => {
    const props = {
      name: '',
      description: '',
      dispatch: jest.fn()
    }
    const updateCalls = updateDiaryFields.mock.calls

    const wrapper = shallow(<NewDiaryForm {...props} />)
    const nameInput = wrapper.find('#new-diary-name')
    nameInput.simulate('change', { target: { value: 'has name' } })

    const lastCall = updateCalls[updateCalls.length - 1]
    expect(lastCall[0].name).toBe('has name')
  })

  it('updates description when description input is typed in', () => {
    const props = {
      name: '',
      description: '',
      dispatch: jest.fn()
    }
    const updateCalls = updateDiaryFields.mock.calls

    const wrapper = shallow(<NewDiaryForm {...props} />)
    const nameInput = wrapper.find('#new-diary-description')
    nameInput.simulate('change', { target: { value: 'has description' } })

    const lastCall = updateCalls[updateCalls.length - 1]
    expect(lastCall[0].description).toBe('has description')
  })
})
