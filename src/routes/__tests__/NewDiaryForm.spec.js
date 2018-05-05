import React from 'react'
import Button from 'material-ui/Button'
import { shallow } from 'enzyme'

import { NewDiaryForm } from '../NewDiaryForm'

describe('Routes: NewDiaryForm', () => {
  it('submit button is enabled when name and description fields have information', () => {
    const props = {
      name: '',
      description: ''
    }

    const wrapper = shallow(<NewDiaryForm {...props} />)

    expect(wrapper.find(Button).prop('disabled')).toBe(true)

    wrapper.setProps({ name: 'has name', description: '' })

    expect(wrapper.find(Button).prop('disabled')).toBe(true)

    wrapper.setProps({ name: '', description: 'has description' })

    expect(wrapper.find(Button).prop('disabled')).toBe(true)

    wrapper.setProps({ name: 'has name', description: 'has description' })

    expect(wrapper.find(Button).prop('disabled')).toBe(false)
  })
})
