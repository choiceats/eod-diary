import React from 'react'
import { withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    flexGrow: 1
  }
}

export function Navbar(props) {
  const { classes, location, title } = props

  const backButton =
    props.history.length > 1 && location.pathname !== '/' ? (
      <IconButton onClick={() => props.history.goBack()} color="primary">
        <KeyboardArrowLeftIcon />
      </IconButton>
    ) : null

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            {backButton} {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(withStyles(styles)(Navbar))
