import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './calendar.css'

class Calendar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const m = moment()
    const firstDayOfMonth = m.date(1)
    const monthWeekDayStart = firstDayOfMonth.day()

    let weekDays = []
    weekDays = weekDays.fill(monthWeekDayStart - 1)
  }
}

Calendar.propTypes = {
  // month: PropTypes.number.isRequired,
  // year: PropTypes.number.isRequired,
  dateRender: PropTypes.node.isRequired
}

export default Calendar
