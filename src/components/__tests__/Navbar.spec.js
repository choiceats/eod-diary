import React from 'react'
import { shallow } from 'enzyme'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'

import { Navbar } from '../Navbar'
import { jssPreset } from 'material-ui'

describe('Components: Navbar', () => {
  let props

  beforeEach(() => {
    props = {
      classes: {
        root: 'blah'
      },
      location: {
        pathname: '/'
      },
      history: {
        length: 1,
        goBack: jest.fn()
      },
      diaries: [
        {
          id: '1a-afe-afe',
          description: 'Oh ya'
        }
      ]
    }
  })

  it('Render "My Diaries" for the title for the root route', () => {
    const wrapper = shallow(<Navbar {...props} />)
    const header = wrapper.find(Typography)

    expect(header.props().children).toContain('My Diaries')
  })

  it('should render the diary title for a route at the diary', () => {
    props.location.pathname = 'diary/1a-afe-afe'
    const wrapper = shallow(<Navbar {...props} />)
    const header = wrapper.find(Typography)

    expect(header.props().children).toContain('Oh ya')
  })

  it('should show a back button if we are not on the root element and have a history greater than 1', () => {
    props.location.pathname = 'diary/1'
    props.history.length = 2
    const wrapper = shallow(<Navbar {...props} />)
    const button = wrapper.find(IconButton)

    expect(button.length).toBe(1)
  })

  it('should not show a back button if we are not on the root element', () => {
    props.history.length = 2
    const wrapper = shallow(<Navbar {...props} />)
    const button = wrapper.find(IconButton)

    expect(button.length).toBe(0)
  })

  it('should go back if the back button is clicked', () => {
    props.location.pathname = 'diary/1'
    props.history.length = 2
    const wrapper = shallow(<Navbar {...props} />)
    const button = wrapper.find(IconButton)

    button.simulate('click')

    expect(props.history.goBack).toBeCalled()
  })
})
