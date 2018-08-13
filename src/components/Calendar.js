import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './Calendar.css'

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

    let currentDate = firstDayOfMonth.clone()
    while (currentDate.month() === m.month()) {
      weekDays.push(currentDate.clone())
      currentDate.add(1, 'day')
    }

    return (
      <div className="calendar-container">
        {weekDays.map(day => {
          return (
            <div className="calendar-container__days">{day && day.date()}</div>
          )
        })}
      </div>
    )
  }
}

Calendar.propTypes = {
  // month: PropTypes.number.isRequired,
  // year: PropTypes.number.isRequired,
  dateRender: PropTypes.node.isRequired
}

export default Calendar
