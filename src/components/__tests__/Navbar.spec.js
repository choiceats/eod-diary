import React from 'react'
import { shallow } from 'enzyme'
import Typography from 'material-ui/Typography'

import { Navbar } from '../Navbar'

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
      diaries: [
        {
          id: '1',
          description: 'Oh ya'
        }
      ]
    }
  })

  it('Render "My Diaries" for the title for the root route', () => {
    const wrapper = shallow(<Navbar {...props} />)
    const header = wrapper.find(Typography)

    expect(header.props().children).toBe('My Diaries')
  })

  it('should render the diary title for a route at the diary', () => {
    props.location.pathname = 'diary/1'
    const wrapper = shallow(<Navbar {...props} />)
    const header = wrapper.find(Typography)

    expect(header.props().children).toBe('Oh ya')
  })
})
