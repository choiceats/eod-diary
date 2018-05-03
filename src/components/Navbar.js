import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    flexGrow: 1
  }
}

export function Navbar(props) {
  const { classes, location, diaries } = props

  const locationToTitle = () => {
    const { pathname } = location
    if (pathname === '/') {
      return 'My Diaries'
    }

    const matches = pathname.match(/diary\/(\d+)/)
    if (matches) {
      const diaryId = matches[1]
      const diary = diaries.find(d => d.id === diaryId)
      if (diary) {
        return diary.description
      }
    }

    return 'EoDiaries'
  }

  const title = locationToTitle(location)

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(
  connect(({ diaries }) => ({ diaries }))(withStyles(styles)(Navbar))
)
